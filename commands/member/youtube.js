const { MessageEmbed } = require("discord.js");
const ytsr = require("ytsr");
const ID = require("../../server/premium.json");

module.exports = {
  name: "youtube",
  aliases: ["yt"],
  run:async(bot, message, args) => {

    let id = ID.serverID;
    if(!id.includes(message.guild.id)) return message.channel.send("sorry this command is premium, you can buy it with owocash and send proof photos to wolvies#8620 along with the server id!");

    try {

    const query = args.slice(1).join(" ");
    if(!query) return message.channel.send("Please provide a search query!");

    const res = await ytsr(query, {limit: 10}).catch(err => {
      return message.channel.send("No result were found!");
    });

    const video = res.items.filter(i => i.type == "video");
    if(!video) return message.channel.send("No result were found!");

    let array = [];
    let videos = [];
    
    video.map((x, i) => {
      array.push(`${i + 1} - ${x.title}  [${x.duration}]`);
      videos.push(`https://www.youtube.com/watch?v=${x.id}`);
    });

    const msg = await message.channel.send("\`\`\`css\n" + array.join("\n") + "\n\nCanceled in 90 seconds" + "\`\`\`");

    function filter(msg) {
      const pattern = /(^[1-9][0-9]{0,1}$)/g;
      return pattern.test(msg.content) && parseInt(msg.content.match(pattern)[0]) <= 10;
    }

    const response = await message.channel.awaitMessages(filter, { max: 1, time: 90000, errors: ["time"] }).catch(() => msg.delete());
    const choice = videos[parseInt(response.first()) - 1];

    message.channel.send(choice).then(() => msg.delete());

    } catch(error) {
        
    }
  }
}