const ms = require("ms");

module.exports = {
    name: "gedit",
    aliases: ["edit"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANGE_MESSAGES")) return message.channel.send("You dont have permission to run this command!");

        if(!args[1]) return message.channel.send("Please specify a message id");

        const messageID = args[1]; 
        if(!messageID) return message.channel.send("No Message ID Provided.");

        const duration = args[2];
        if(!duration) return message.channel.send("Please enter a valid duration.");

        const winner = args[3];
        if(!winner) return message.channel.send("Please enter a valid winners.");

        const prize = args.slice(4).join(" ");
        if(!prize) return message.channel.send("Please enter a valid prize.");

        bot.giveaways.edit(messageID, {
            newWinnerCount: winner,
            newPrize: prize,
            addTime: ms(duration)
        }).then(() => {
            message.channel.send(`Giveaways wil edit in less than ${bot.giveaways.options.updateCountdownEvery / 1000} sconds`);
        }).catch(err => {
            console.log(err);
            message.channel.send("An error occured");
        });
    }
}