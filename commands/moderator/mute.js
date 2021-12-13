const { Client, Message, MessageEmbed } = require("discord.js");
const schema = require("../../schema/mute");

module.exports = {
    name: "mute",
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
        
        member.roles.add(role.id);
        schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) {
                new schema({
                    Guild: message.guild.id,
                    Users: user.id
                }).save();
            } else {
                data.Users.push(user.id);
                data.save();
            }
        });
        message.channel.send(`Successfully mute ${user} with role: **${role}**`);
    }
}