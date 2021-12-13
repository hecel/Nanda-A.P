const { Client, Message, MessageEmbed } = require('discord.js');
const premium = require("../../schema/premium");
const { owner } = require("../../botconfig/config.json");

module.exports = {
    name: "del-premium",
    aliases: [],
    description: 'add user to premium',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        if(!owner.includes(message.author.id)) return;

        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please specify a valid user to add to premium features!");

        premium.findOne({ User: user.id }, async(err, data) => {
            if(!data) return message.channel.send("This user already removed from premium features");

            data.delete();
            message.channel.send(`Removed ${user.username} from premium features!`);
        });
    }
}