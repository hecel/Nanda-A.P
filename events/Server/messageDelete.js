const Discord = require("discord.js");
const { bot } = require("../../index");

bot.on("messageDelete", async(message, channel) => {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });

  //ghost pings
  if(message.mentions.users.first()) {
    let channel = bot.channels.cache.get("864049509306335243");

    if(!channel) return;

    const embed = new Discord.MessageEmbed()
    .setTitle("Ghost ping")
    .setColor("RED")
    .setDescription(`${message.author} ghost pings: ${message.mentions.users.first()}\nmessage ini dari: ${message.guild}`)
    .setTimestamp();
    return channel.send(embed);
  }
});