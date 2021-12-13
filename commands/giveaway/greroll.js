const ms = require("ms");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "greroll",
    aliases: ["reroll"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANGE_MESSAGES")) return message.channel.send("You dont have permission to run this command!");

        if(!args[1]) return message.channel.send("Please specify a message id");

        const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args[1]);
        if(!giveaway) return message.channel.send("Giveaways not found");

        bot.giveaways.reroll(giveaway.messageID).then(() => {
            message.channel.send("Giveaways rerolled");
        }).catch(err => {
            console.log(err);
        });
    }
}