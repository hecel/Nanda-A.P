const { Client, Message, MessageEmbed } = require('discord.js');
const premium = require("../../schema/premium");
const { owner } = require("../../botconfig/config.json");
const day = require("dayjs");

module.exports = {
    name: "add-premium",
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
            // if(data) return message.channel.send("This user already gained to premium features");

            // new premium({ User: user.id }).save();
            // message.channel.send(`Added ${user.username} to premium features!`);
            if(data) data.delete();

            if(args[2]) {
                const time = day(args[2]).valueOf();
                
                new premium({
                    User: user.id,
                    Expire: time,
                    Permanent: false
                }).save();
            } else {
                new premium({
                    User: user.id,
                    Expire: 0,
                    Permanent: true
                }).save();
            }
            message.channel.send(`Added ${user.username} to premium features!`);
        });
    }
}