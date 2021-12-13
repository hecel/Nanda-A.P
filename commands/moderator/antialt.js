//const ID = require("../../server/premium.json");

module.exports = {
    name: "antialt",
    aliases: ["alt"],
    //cooldown: 4,
    run: async(bot, message, args) => {
        // let id = ID.serverID;
        // if(!id.includes(message.guild.id)) return message.channel.send("Sorry this command is premium, you can buy it with owocash and send proof photos to wolvies#8620 along with the server id!");
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this command!");
        
        let query = args[1];
        if(!query) return message.channel.send("Please specify a query!");

        const getCollection = bot.antialts.get(message.guild.id);
        if(query === "on") {
            let time = args[2];
            let timeSpan = bot.args.set(message.guild.id, time);

            if(!time) return message.channel.send("Please provide a valid time!, Example: **1s, 1d, 1y**");
            if(getCollection) return message.channel.send("Antialt is already enabled!");
            
            bot.antialts.set(message.guild.id, timeSpan);
            message.channel.send("Turned on antialt sytem.");
        } else if(query === "off") {
            if(!getCollection) return message.channel.send("Antialt is already disabled!");

            bot.antialts.delete(message.guild.id);
            message.channel.send("Turned off antialt sytem.");
            bot.args.delete(message.guild.id);
        } else if(query === "list") {
            if(!getCollection) return message.channel.send("Antialt is disabled!");
            message.channel.send(`Kicked member: ${getCollection.map(value => { return `${value.tag} (${value.id})`})}`);
        } else {
            message.channel.send(`Invalid type: **${query}**, Example: **on/off**`);
        }
    }
}