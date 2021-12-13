const { Client, Message, MessageEmbed } = require('discord.js');
const PrefixSchema = require("../../schema/PrefixSchema");
const { permis } = require("../../server/permission.json");

module.exports = {
    name: 'resetprefix',
    aliases: ["reset"],
    description: 'reset the prefix to default',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const mod = permis.moderator;
        if(!message.member.permissions.has(mod)) return;

        await PrefixSchema.findOneAndDelete({ Guild: message.guild.id });
        message.channel.send({ embed: { color: "GREEN", description: "Sucessfully reset the prefix to default" } });
    }
}