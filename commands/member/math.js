const { Client, Message, MessageEmbed } = require('discord.js');
const math = require("mathjs");

module.exports = {
    name: 'math',
    aliases: [],
    description: 'simpile command math',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const question = args.slice(1).join(" ");
        const answer = math.evaluate(question);
        
        const embed = new MessageEmbed()
        .setTitle("simpile command math")
        .setColor("GREEN")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .addField("Question:", question)
        .addField("Answer:", answer)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send(embed);
    }
}