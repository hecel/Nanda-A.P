const Discord = require("discord.js");

module.exports = {
    name: "howgay",
    aliases: [],
    run: async(bot, message, args) => {
        try {
            const user = message.mentions.users.first() || message.author;

            const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField(`${user.tag} is ${Math.floor(Math.random() * 100) + 0}% gay 🏳️‍🌈`, true)
            .setTimestamp()
            .setFooter("Scrip by: BlueWolf#0371\n");
            message.channel.send(embed);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}