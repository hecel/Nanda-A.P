const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

bot.on("guildMemberRemove", member => {
    let guild = member.guild;
    let server = guild.name;
    let total = guild.memberCount;
    let channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    const embed = new MessageEmbed()
    .setColor("RED")
    .setTitle("Good bye!")
    .setDescription(`yah ${member} left, sekarang member sisa: ${total} member`)
    .setTimestamp()
    .setFooter("script by: BlueWolf#0371");
    channel.send(embed);
});