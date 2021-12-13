const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roleinfo',
    aliases: [],
    description: 'show role info',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        let role;
        if(args[1] && isNaN(args[1]) && message.mentions.roles.first()) {
            role = message.mentions.roles.first();
        }
        if(args[1] && isNaN(args[1]) && !message.mentions.roles.first()) {
            role = message.guild.roles.cache.find(r => r.name.toLowerCase() == args.slice(1).join(" "));

            if(!message.guild.roles.cache.find(r => r.name.toLowerCase() == args.slice(1).join(" "))) return message.reply(":x: Role not found");
        }
        if(args[1] && !isNaN(args[1])) {
            role = message.guild.roles.cache.find(r => r.id == args[1]);
            if(!message.guild.roles.cache.has(args[1])) return message.reply(":x: Role not found");
        }
        if(!role) return message.reply("You must mention role");

        let roleMembers;
        let rolePermissions = role.permissions.toArray().join(", ");

        if(role.members.size > 20) roleMembers = role.members.map(m => `<@${m.id}>`).slice(0, 20).join(", ") + ` and ${role.members.size - 20} more members...`;
        if(role.members.size < 20) roleMembers = role.members.map(m => `<@${m.id}>`).join(", ");

        const embed = new MessageEmbed()
        .setTitle("Role info")
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor(role.color)
        .addField("**Role Name:**", role.name)
        .addField("**Role ID:**", role.id)
        .addField("**Role Members:**", roleMembers || "No Members Found")
        .addField("**Role Permissions:**", rolePermissions || "No Permissins Found")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        message.channel.send(embed);
    }
}