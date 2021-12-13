const Discord = require("discord.js");
const { bot } = require("../../index");
const { prefix } = require("../../botconfig/config.json");

bot.on("guildCreate", (guild) => {
    let ch;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !ch && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) ch = channel;
    });
    if(!ch) return;

    const embed = new Discord.MessageEmbed()
    .setAuthor(`Hello!, Thank you for inviting me to ${guild.name}`)
    .setColor("#00fdfd")
    .setDescription(`My prefix is **${prefix}**`)
    .addField("need help?", "You can type N!help")
    //.addField("join my developer's existing server!", "[join](https://discord.gg/zuVYHJfaHC)")
    .setTimestamp();
    ch.send(embed).catch(e => {
        if(e) return;
    });
});