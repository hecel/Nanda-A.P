const { Client, Message, MessageEmbed } = require('discord.js');
const PrefixSchema = require("../../schema/PrefixSchema");
const { permis } = require("../../server/permission.json");

module.exports = {
    name: 'setprefix',
    aliases: ["prefix"],
    description: 'set a prefix for guild',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const mod = permis.moderator;
        if(!message.member.hasPermission(mod)) return;

        const newprefix = args[1];
        if(!newprefix) return message.channel.send("Please provide a new prefix");
        if(newprefix.length > 5) return message.channel.send("This prefix is too long, you have max 5 caracters");

        let data;
        try{
            data = await PrefixSchema.findOne({
                Guild: message.guild.id
            });
            if(!data) {
                let newdata = await PrefixSchema.create({
                    Guild: message.guild.id,
                    prefix: newprefix
                });
                newdata.save();
            } else {
                await PrefixSchema.findOneAndUpdate({
                    Guild: message.guild.id,
                    prefix: newprefix
                });
            }
            message.channel.send({ embed: { color: "GREEN", description: `The prefix has Been set to ${newprefix}` } });
        } catch(err) {
            console.log(err);
        }
    }
}