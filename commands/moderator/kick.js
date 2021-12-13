const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: ["k"],
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission to run this command!");

        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        let rs = args.slice(2).join(" ");

        if(!member) return message.channel.send("Please specify a member");
        if(!rs) return message.channel.send("Please specify a reason");
        if(member === `<@${bot.user.id}>`) return message.member.send("You can't kicked me!");

        memberTarget.kick(rs);
        
        message.channel.send(`Successfully kicked ${member} with reason: ${rs}`);
        member.send(`You has been kicked for reason: ${rs}`).catch((err) => {
            message.channel.send("I Can't dm this user...");
        });
    }
}