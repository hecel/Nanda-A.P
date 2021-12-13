const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  aliases: ["sp"],
  run: async (bot, message, args) => {
    let msg = bot.snipes.get(message.channel.id);
    if (!msg) return message.channel.send({ embed: { description: `There's nothing to snipe!`, color: "RED" }}).then((m) => { m.delete({ timeout: 4000 })});

    let user = message.author;

    const embed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setDescription(msg.content)
      .setColor("GOLD")
      .setImage(msg.image)
      .setTimestamp();
    message.channel.send(embed);
  }
}