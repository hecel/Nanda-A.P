const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'sayembed',
    aliases: ["sd"],
    description: 'send a message with embed',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        await message.delete();

        const kata = args.slice(1).join(" ");
        if(!kata) return message.channel.send("Please provied a word").then(m => m.delete({ timeout: 4000 }));

        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        .setColor("BLUE")
        .setDescription(kata)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send(embed);
    }
}