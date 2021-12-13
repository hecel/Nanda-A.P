const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require("../../schema/afk");

module.exports = {
    name: 'afk',
    aliases: [],
    description: 'let me know if you are afk',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        let data;
        try{
            data = await schema.findOne({
                Guild: message.guild.id,
                Users: message.author.id
            });
            if(!data) {
                data = await schema.create({
                    Guild: message.guild.id,
                    Users: message.author.id
                });
            }
        } catch (err) {
            console.log(err);
        }

        data.Afk = true;
        data.Afk_reason = args.slice(1).join(" ") || "AFK";
        await data.save();

        // const embed = new MessageEmbed()
        // .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
        // .setDescription(`I set your AFK: **${data.Afk_reason}**`)
        // .setColor("GOLD")
        // .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        // .setTimestamp();
        message.channel.send(`${message.author} I set your AFK: **${data.Afk_reason}**`);
    }
}