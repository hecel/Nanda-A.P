const ms = require("ms");

module.exports = {
    name: "gend",
    aliases: ["end"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANGE_MESSAGES")) return message.channel.send("You dont have permission to run this command!");

        if(!args[1]) return message.channel.send("Please specify a message id");

        const giveaway = bot.giveaways.giveaways.find((g) => g.messageID === args[1]);
        if(!giveaway) return message.channel.send("Giveaways not found");

        bot.giveaways.end(giveaway.messageID, {
            setTimestamp: Date.now()
        }).then(() => {
            message.channel.send(`Giveaways wil end in less than ${bot.giveaways.options.updateCountdownEvery / 1000} sconds`);
        }).catch(err => {
            console.log(err);
            message.channel.send("An error occured");
        });
    }
}