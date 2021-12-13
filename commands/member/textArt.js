const { Client, Message, MessageEmbed } = require('discord.js');
const figlet = require("figlet");

module.exports = {
    name: "text-art",
    aliases: ["ascii"],
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const say = args.slice(1).join(" ");

        figlet.text(say, { font: "" }, async(err, data) => {
            message.channel.send("```" + data + "```");
        });
    }
}