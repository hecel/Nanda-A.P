const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require("../../schema/globalChat");

module.exports = {
    name: 'list',
    aliases: [],
    description: 'show all global chat channel',
    premium: true,
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        schema.find({ Activited: true }, async(err, data) => {
            if(!data) return;
            const map = data.map(({ Guild, Channel, Author }) => {
                return `${bot.channels.cache.get(Channel)} in ${bot.guilds.cache.get(Guild).name} add by ${bot.users.cache.get(Author)}`;
            }).join("\n");

            const embed = new MessageEmbed()
            .setTitle("List of internasional chat")
            .setDescription(map)
            .setColor("BLUE")
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();
            message.channel.send(embed);
        });
    }
}