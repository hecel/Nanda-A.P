const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    aliases: ["av"],
    run: async(bot, message, args) => {
        const input = args.slice(1).join("+");
    const user =
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input) ||
      message.mentions.users.first() ||
      message.author;

    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true }),
      png = user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" }),
      jpg = user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" }),
      gif = user.displayAvatarURL({ size: 4096, dynamic: true, format: "gif" });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag} avatar`)
      .setDescription(`[PNG](${png}), [JPG](${jpg}), [WEBP](${avatar}), [GIF]( ${gif})`)
      .setColor("#5FB404")
      .setImage(avatar)
      .setTimestamp()
      .setFooter("Scrip by: BlueWolf#0371\n");
    return message.channel.send(embed);
    }
}