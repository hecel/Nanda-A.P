const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'random-avatar',
    aliases: [],
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const user = bot.users.cache.random();
        let avatar = user.displayAvatarURL({ size: 4096, dynamic: true }), png = user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" }), jpg = user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" }), gif = user.displayAvatarURL({ size: 4096, dynamic: true, format: "gif" });

        const embed = new MessageEmbed()
        .setTitle(`${user.tag} avatar`)
        .setDescription(`[PNG](${png}), [JPG](${jpg}), [WEBP](${avatar}), [GIF]( ${gif})`)
        .setColor("#5FB404")
        .setImage(avatar)
        .setTimestamp();
        message.channel.send(embed);
    }
}