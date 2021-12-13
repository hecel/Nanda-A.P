const { Client, Message, MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const YouTubeAPI = require("simple-youtube-api");
const { YT_API, DEVAULT_VOLUME } = require("../../botconfig/config.json");
const YouTube = new YouTubeAPI(YT_API);
const choice = ["⏭️", "⏯️", "🔇", "🔉", "🔊", "🔁", "🔀",  "⏹️"];

module.exports = {
    name: "music",
    aliases: ["m"],
    description: "play a music(BETA)",
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        const type = args[1];

        if(!type) return message.channel.send("Please specify a type, Example: **play, skip, stop, loop, volume**.");
        
        const server_queue = bot.queue.get(message.guild.id);

        if(type === "play") {
            const member = message.member.voice.channel;
            if(!member) return message.channel.send("You must be in a voice channel to play the music!");

            const link = args[2];
            if(!link) return message.channel.send("Please provide a link!");
        
            let song = {};
            if(ytdl.validateURL(link)) {
                const song_info = await ytdl.getInfo(link);
                song = { title: song_info.videoDetails.title, url: song_info.videoDetails.video_url, thumbnail: song_info.videoDetails.thumbnail };
            } 
            else {
                const video_finder = async(query) => {
                const videoResult = await ytSearch(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }
            const video = await video_finder(args.slice(2).join(" "));
            if(video) {
                song = { title: video.title, url: video.url, thumbnail: video.thumbnail };
            } else {
                message.channel.send("Error finding video.");
            }
        }

        if(!server_queue) {
            const queue_constructor = {
                voice_channel: member,
                text_channel: message.channel,
                bot: bot.user,
                author: message,
                connection: null,
                songs: [],
                loop: false,
                volume: DEVAULT_VOLUME || 100,
                playing: true
            }

            bot.queue.set(message.guild.id, queue_constructor);
            queue_constructor.songs.push(song);

            try{
                const connection = await member.join();
                queue_constructor.connection = connection;
                queue_constructor.connection.voice.setSelfDeaf(true);
                video_player(message.guild, queue_constructor.songs[0]);
            } catch(err) {
                bot.queue.delete(message.guild.id);
                message.channel.send("There was error connecting.");
                member.leave();
                bot.queue.loop = false;
                throw err;
            }
        } else {
            server_queue.songs.push(song);
            const embed = new MessageEmbed()
            .setTitle("➕ Added to queue")
            .setColor("ffdd4d")
            .setDescription(`[${song.title}](${song.url})`)
            .setThumbnail(song.thumbnail);
            return message.channel.send(embed);
        }
      } else if(type === "skip") {
          skip(message, server_queue);
      } else if(type === "stop") {
          stop(message, server_queue);
      } else if(type === "loop") {
          loop(message, server_queue);
      } else if(type === "volume") {
        if(!message.member.voice.channel) return message.channel.send("You must be in the same voice channel!");
        if(!server_queue) return message.channel.send("There are no songs in queue.");

        if(!args[1]) return message.channel.send(`The current volume is: ${queue.volume}`);
        if(isNaN(args[2])) return message.channel.send("Please use a number to set volume.");
        if(Number(args[2] > 100 || Number(args[1]) < 0)) return message.channel.send("Please use a number between 0 - 100");

        server_queue.connection.dispatcher.setVolumeLogarithmic(args[2] / 100);

        message.channel.send(`Volume set to: ${args[2]}`);
        } else {
          message.channel.send(`Invalid type **${type}**, Exaple: **play, skip, stop, loop, volume**`);
      }
    }
}

const video_player = async(guild, song) => {
    const song_queue = bot.queue.get(guild.id);

    if(!song) {
        song_queue.voice_channel.leave();
        bot.queue.delete(guild.id);
        song_queue.text_channel.send("Leave the voice channel...");
        if(bot.queue.loop === true) {
            !bot.queue.loop;
        } else return;
    }
    const stream = ytdl(song.url, { filter: "audioonly" });
    const dispatcher = song_queue.connection.play(stream, { seek: 0 }).on("finish", () => {
        // song_queue.songs.shift();
        // video_player(guild, song_queue.songs[0]);
        if(collector && !collector.ended) collector.stop();
        if(bot.queue.loop) {
            const lastSong = song_queue.songs.shift();
            song_queue.songs.push(lastSong);
            video_player(guild, song_queue.songs[0]);
        } else {
            song_queue.songs.shift();
            video_player(guild, song_queue.songs[0]);
        }
    });
    dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
    const embed = new MessageEmbed()
    .setTitle("🎶 Now playing")
    .setColor("ffdd4d")
    .setDescription(`[${song.title}](${song.url})`)
    .setThumbnail(song.thumbnail)
    .setTimestamp();
    const m = await song_queue.text_channel.send(embed);

    for (const chot of choice) {
        await m.react(chot);
      }
        const filter = (rect, usr) => usr.id !== song_queue.bot.id;
        var collector = m.createReactionCollector(filter, { time: 600000, max: 1000 });
          collector.on("collect", (reaction, user) => {
          switch(reaction.emoji.name) {
            
            case "⏭️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
              song_queue.connection.dispatcher.end();
              song_queue.text_channel.send("⏭️ Skipped the song.");
              break;

            case "⏯️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");

              if(song_queue.playing) {
                  song_queue.playing = false;
                  song_queue.connection.dispatcher.pause(true);
                  song_queue.text_channel.send(`${song_queue.author.author} ⏸️ Paused the music.`);
                } else {
                    song_queue.playing = true;
                    song_queue.connection.dispatcher.resume();
                    song_queue.text_channel.send(`${song_queue.author.author} ▶️ resumed the music.`);
                }
              break;

            case "🔇":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");

              if(song_queue.volume <= 0) {
                  song_queue.volume = 100;
                  song_queue.connection.dispatcher.setVolumeLogarithmic(100 / 100);
                  song_queue.text_channel.send(`${song_queue.author.author} unmuted the music.`);
              } else {
                  song_queue.volume = 0;
                  song_queue.connection.dispatcher.setVolumeLogarithmic(0);
                  song_queue.text_channel.send(`${song_queue.author.author} muted the music.`);
              }
              break;

              case "🔉":
                reaction.users.remove(user).catch(console.error);
                if(song_queue.volume === 0) return;
                if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
                if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
  
                if(song_queue.volume - 10 <= 0) song_queue.volume = 0;
                else song_queue.volume = song_queue.volume - 10;
                song_queue.connection.dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
                song_queue.text_channel.send(`${song_queue.author.author} 🔉 decreased the volume, the volume is now ${song_queue.volume}`);
                break;

            case "🔊":
              reaction.users.remove(user).catch(console.error);
              if(song_queue.volume === 100) return;
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
      
              if(song_queue.volume + 10 >= 100) song_queue.volume = 100;
              else song_queue.volume = song_queue.volume + 10;
              song_queue.connection.dispatcher.setVolumeLogarithmic(song_queue.volume / 100);
              song_queue.text_channel.send(`${song_queue.author.author} 🔊 increased the volume, the volume is now ${song_queue.volume}`);
              break;

            case "🔁":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
  
              bot.queue.loop = !bot.queue.loop;
  
              song_queue.text_channel.send(`Loop is now ${bot.queue.loop}`);
              break;

            case "🔀":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");

              let randomSongs = song_queue.songs[Math.floor(Math.random() * song_queue.songs.length)];
              song_queue.songs.push(randomSongs);

              song_queue.text_channel.send(`${song_queue.author.author} 🔀 shuffle is now on`);
              break;
            
            case "⏹️":
              reaction.users.remove(user).catch(console.error);
              if(!song_queue.voice_channel) return song_queue.text_channel.send("You must be in the same voice channel!");
              if(!song_queue) return song_queue.text_channel.send("There are no songs in queue.");
              song_queue.songs = [];
              song_queue.connection.dispatcher.end();
              song_queue.text_channel.send("⏹️ Stop the music and leave the voice channel.");
              break;
              
            default:
              reaction.users.remove(user).catch(console.error);
              break;
          }
        });
        collector.on("end", () => {
            m.reactions.removeAll().catch(console.error);
            if(m && !m.deleted) {
                m.delete({ timeout: 2000 }).catch(console.error);
            }
        });
}

const skip = async(message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in the same voice channel!");
    if(!server_queue) return message.channel.send("There are no songs in queue.");
    server_queue.connection.dispatcher.end();
    message.channel.send("⏭️ Skipped the song.");
}

const stop = async(message, server_queue) => {
    if(!message.member.voice.channel) return message.channel.send("You must be in the same voice channel!");
    if(!server_queue) return message.channel.send("There are no songs in queue.");
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
    message.channel.send("⏹️ Stop the music and leave the voice channel.");
}

const loop = async(message, server_queue) => {
    //const queue = bot.queue.get(message.guild.id);
    if(!server_queue.voice_channel) return message.channel.send("You must be in the same voice channel!");
    if(!server_queue) return message.channel.send("There are no songs in queue.");

    bot.queue.loop = !bot.queue.loop;

    message.channel.send(`Loop is now ${bot.queue.loop}`);
}