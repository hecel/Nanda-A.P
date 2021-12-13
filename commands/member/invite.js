const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    aliases: ["in"],
    description: 'link invite for the bot',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        let link = `https://discordapp.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=bot`;

        const embed = new MessageEmbed()
        .setTitle(`Link invite ${bot.user.tag}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(bot.user.avatarURL({ dynamic: true }))
        .setDescription(`[invite](${link})`)
        .setColor("GOLD")
        .setTimestamp();
        message.channel.send(embed);
    }
}