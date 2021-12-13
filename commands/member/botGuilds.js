const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'bot-guilds',
    aliases: ["guilds"],
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const guilds = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).first(100);

        const description = guilds.map((guild, index) => {
            return `${index + 1}) ${guild.name} -> ${guild.memberCount} members`;
        }).join("\n");

        const embed = new MessageEmbed()
        .setTitle("Top Guilds")
        .setColor("GOLD")
        .setDescription(description)
        .setTimestamp();

        message.channel.send(embed);
    }
}