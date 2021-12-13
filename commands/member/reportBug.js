const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "bug",
    aliases: [],
    description: 'notify the developer if there is a bug',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const log = bot.channels.cache.get("883668517679927336");
        if(!log) return;

        const query = args.slice(1).join(" ");
        if(!query) return message.channel.send("Please specify a query!");

        message.channel.send("Good job, keep sending bugs later you will get premium feature!").then(m => m.delete({ timeout: 40000 }));

        const embed = new MessageEmbed()
        .setTitle("New Bugs!")
        .setColor("GREEN")
        .setDescription(`[Jump to the message](${message.url})`)
        .addField("Author:", message.author.toString())
        .addField("Bugs:", query)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        log.send(embed);

        message.channel.send({ embed: { color: "GREEN", description: "Your request has been sent!" } });
    }
}