const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require("../../schema/anti-nuke");
const { permis } = require("../../server/permission.json");

module.exports = {
    name: 'antinuke',
    aliases: [],
    description: "idk i don't have idea to set description",
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(permis.moderator)) return;

        const type = args[1];
        if(!type) return message.channel.send("Please specify a type!");

        if(type === "add") {
            const name = args.slice(2).join(" ");
            if(!name) return message.channel.send("Please specify a valid channel name to active the system antinuke!");

            schema.findOne({ Guild: message.guild.id, Channel: name }, async(err, data) => {
                if(data) return message.channel.send("This channel name already add before.");

                new schema({
                    Guild: message.guild.id,
                    Channel: name
                }).save();
                message.channel.send("Saved the data!");
            });
        } else if(type === "remove") {
            const name = args.slice(2).join(" ");
            if(!name) return message.channel.send("Please specify a valid channel name to active the system antinuke!");

            schema.findOne({ Guild: message.guild.id, Channel: name }, async(err, data) => {
                if(!data) return message.channel.send("This channel name not found in the database!");

                data.delete();
                message.channel.send("Saved the data!");
            });
        }
    }
}