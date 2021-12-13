const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "editsnipe",
  aliases: ["esp"],
  run: async (bot, message, args) => {
    let msg = bot.edits.get(message.channel.id);
    if (!msg) return message.channel.send({ embed: { description: `There's nothing to editsnipe!`, color: "RED" }}).then((m) => { m.delete({ timeout: 4000 })});

    let user = message.author;

    const embed = new MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setColor("GOLD")
    .setTimestamp();
    if(msg.image) embed.setImage(msg.image);
    message.channel.send(embed).catch((err) => {
        message.channel.send("sorry no message has been changed, maybe the message has been changed a long time");
    });
  }
}