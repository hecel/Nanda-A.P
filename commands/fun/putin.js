const Discord = require("discord.js");
const DIG = require("discord-image-generation");

module.exports = {
    name: "putin",
    aliases: [],
    run: async(bot, message, args) => {
        let input = args.slice(1).join(" ");
    let user =
      message.mentions.users.first() ||
      message.author ||
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input);
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let img = await new DIG.Poutine().getImage(avatar);
    let attach = new Discord.MessageAttachment(img, "putin.png");
    message.channel.send(attach);
    }
}