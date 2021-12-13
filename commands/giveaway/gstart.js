const ms = require("ms");
const { MessageEmbed } = require("discord.js");
let config;
try {
    config = require("../botconfig/config.json");
} catch(err) {
    config = null;
}

module.exports = {
    name: "gstart",
    aliases: ["start"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANGE_MESSAGES")) return message.channel.send("You dont have permission to run this command!");

        const channel = message.mentions.channels.first();
        if(!channel) return message.channel.send("Please enter a valid channel.");

        const duration = args[2];
        if(!duration) return message.channel.send("Please enter a valid duration.");

        const winners = args[3];
        if(!winners) return message.channel.send("Please enter a valid winners.");

        const prize = args.slice(4).join(" ");
        if(!prize) return message.channel.send("Please enter a valid prize.");

        bot.giveaways.start(channel, {
            time: ms(duration),
            prize: prize,
            winnerCount: winners,
            hostedBy: message.author.tag,
            messages: {
                giveaway: "🎉🎉**Giveaways Time!**🎉🎉",
                giveawayEnded: "**Giveaways Ended**",
                timeRemaining: "Time Remaining: **{duration}**",
                inviteToParticipate: "React with 🎉 to join giveaways.",
                winMessage: "Congrast {winners}, you have won the giveaways",
                embedFooter: "Giveaways Time!",
                noWinner: "Could not determine a winner",
                hostedBy: "Hosted by {user}",
                winners: "winners",
                endedAt: "Ends At",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    plurals: false
                }
            }
        });
        message.channel.send(`Giveaways is starting in ${channel}`);
    }
}