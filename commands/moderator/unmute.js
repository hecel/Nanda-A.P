const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../schema/mute");

module.exports = {
    name: "unmute",
    /**
     * @param {Client} bot
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this commands!");
        const user = message.mentions.users.first();

        if(!user) return message.channel.send("Please specify a user");
        const member = message.guild.members.cache.get(user.id);

        var role = message.guild.roles.cache.find(r => r.name === "mute");
        if(!role) return message.channel.send(`I can't find the role **mute**`);

        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.channel.send("Member was not muted");
            const users = data.Users.findIndex((prop) => prop === user.id);

            if(users == -1) return message.channel.send("Member is not muted");
            data.Users.splice(users, 1);
            data.save();

            member.roles.remove(role.id);
            message.channel.send(`Successfully unmute ${user.displayName}`);
        });
    }
}