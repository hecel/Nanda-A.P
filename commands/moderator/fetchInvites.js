const { Client, Message, MessageEmbed } = require('discord.js');
const { permis } = require("../../server/permission.json");

module.exports = {
    name: 'fetch-invites',
    aliases: ["invites"],
    description: 'show all invites for members',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const perm = permis.moderator;
        if(!message.member.hasPermission(perm)) return message.channel.send("Sorry you don't have permission to use this command.");

        const fetchInvites = message.guild.fetchInvites();
        const inviteMembers = (await fetchInvites).map((invite) => `${invite.code}(${invite.uses} - ${invite.maxUses}) -> ${invite.inviter.tag})`).join("\n");
        const noInvites = inviteMembers ? inviteMembers : "there are no member made an invite link!";

        message.channel.send("```" + noInvites + "```");
    }
}