const { Client, Message, MessageEmbed } = require('discord.js');
const { owner } = require("../../botconfig/config.json");
const schema = require("../../schema/blacklist-user");
const server = require("../../schema/blacklist-servers");

module.exports = {
    name: 'blacklist',
    aliases: ["bl"],
    description: 'blacklist user & server',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!owner.includes(message.author.id)) return;

        const query = args[1];

        if(query === "user") {
            const type = args[2];
            if(!type) return message.channel.send("Please specify a type!");

            if(type === "add") {
                const id = args[3];
                if(!id) return message.channel.send("Pleae provide a id!");
                if(id === message.author.id) return message.channel.send("You can not enter your own  id!");

                schema.findOne({ Users: id }, async(err, data) => {
                    if(data) return message.channel.send("This user already in database before!");

                    new schema({ Users: id }).save();
                    message.channel.send("Blacklisted a new user!");
                });
            }
            if(type === "remove") {
                const id = args[3];
                if(!id) return message.channel.send("Please provide a id!");

                schema.findOne({ Users: id }, async(err, data) => {
                    if(!data) return message.channel.send("That user id does exits in the database!");
                   
                    data.delete();
                    message.channel.send("User was unblacklisted!");
                });
            }
        }
        if(query === "server") {
            const type = args[2];
            if(!type) return message.channel.send("Please specify a type!");

            if(type === "add") {
                const id = args[3];
                if(!id) return message.channel.send("Please provide a id!");

                server.findOne({ Guilds: id }, async(err, data) => {
                    if(data) return message.channel.send("This server already add before!");

                    new server({ Guilds: id }).save();
                    message.channel.send("Blacklisted a new server/guild!");
                });
            }
            if(type === "remove") {
                const id = args[3];
                if(!id) return message.channel.send("Please provide a id!");

                server.findOne({ Guilds: id }, async(err, data) => {
                    if(!data) return message.channel.send("That guild id does exits in the database!");

                    data.delete();
                    message.channel.send("Guild was unblacklisted!");
                });
            }
        }
    }
}