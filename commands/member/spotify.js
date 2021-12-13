const { Client, Message, MessageEmbed } = require('discord.js');
const bar = require("string-progressbar");

module.exports = {
    name: 'spotify',
    aliases: [],
    description: 'Spotify Track Stats',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        message.channel.startTyping(true);

        let user;
        if(message.mentions.users.first()) {
            user = message.mentions.users.first();
        } else {
            user = message.author;
        }

        let status;
        if(user.presence.activities.length === 1) status = user.presence.activities[0];
        else if(user.presence.activities.length > 1) status = user.presence.activities[1];

        if(user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") return message.channel.send("This user isn't listening to spotify.");
        if(status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
            let img = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`;
            let url = `https://open.spotify.com/track/${status.syncID}`;
            let name = status.details;
            let author = status.state;
            let album = status.assets.largeText;
            let timeStart = status.timestamps.start;
            let timeEnd = status.timestamps.end;
            let timeConvert = parseMilliseconds(timeEnd - timeStart);
            let seek = (timeStart - timeEnd) / 1000;
            // let timeConver = parseMilliseconds(timeStart / timeStart);

            let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
            let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
            // let minute = timeConver.minutes < 10 ? `0${timeConver.minutes}` : timeConver.minutes;
            // let second = timeConver.seconds < 10 ? `0${timeConver.seconds}` : timeConver.seconds;
            let time = `${minutes}:${seconds}`;
            // let timeStamp = `${minute}:${second} - ${time}`;
            // let time = `${ms(timeEnd - timeStart)}`;

            const embed = new MessageEmbed()
            .setAuthor("Spotify Track Information", "https://cdn.discordapp.com/attachments/886817608693862421/917552524586786868/unnamed.png")
            .setColor(0x1ED768)
            .setThumbnail(img)
            .addField("Name:", name, true)
            .addField("Album:", album, true)
            .addField("Author:", author, true)
            .addField("Duration:", time, true)
            .addField("\u200b", new Date(seek * 1000).toISOString().substr(11, 8) + "[" + bar(time == 0 ? seek : time, seek, 20)[0] + "]", false)
            .addField("Listen now on spotify!", `[\`${author} - ${name}\`](${url})`, false)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

            message.channel.stopTyping(true);
            message.channel.send(embed);
        }
    }
}

function parseMilliseconds(milliseconds) {
    return {
        days: Math.trunc(milliseconds / 86400000),
        hours: Math.trunc(milliseconds / 3600000) % 24,
        minutes: Math.trunc(milliseconds / 60000) % 60,
        seconds: Math.trunc(milliseconds / 1000) % 60,
        milliseconds: Math.trunc(milliseconds) % 1000,
        microseconds: Math.trunc(milliseconds * 1000) % 1000,
        nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
    }
}