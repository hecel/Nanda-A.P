const { Client, Message, MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "whois",
    aliases: ["who"],
    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (bot, message, args) => {
        let user = message.mentions.users.first() || message.author;
        if (!isNaN(args[1])) user = message.guild.members.cache.get(args[1]).user;
        
        let member = message.guild.members.cache.get(user.id);
        
        let stat = {
            online: "https://emoji.gg/assets/emoji/9166_online.png | Online",
            idle: "https://emoji.gg/assets/emoji/3929_idle.png | Idle",
            dnd: "https://emoji.gg/assets/emoji/2531_dnd.png | DND",
            offline: "https://emoji.gg/assets/emoji/7445_status_offline.png | Offline",
        };
        
        let pre = stat[user.presence.status];
        let image = pre.split(" | ")[0];
        let status = pre.split(" | ")[1];

        let nickname = member.nickname ? member.nickname : "None";
        let role = "";
        
        member._roles.forEach((id) => {
            role += `${message.guild.roles.cache.get(id)}`;
        });
        let roles = role ? role : "None";

        // let owner = message.guild.owner.user;
        // let owners = owner ? owner: "Server Admin";
        // let members = owners ? owners : "Server Member";
        
        let d = Date.now() - user.createdAt;
        let jm = Math.floor(d / 86400000);
        if (jm < 1) jm = 0;

        let c = Date.now() - message.guild.member(user.id).joinedAt;
        let jc = Math.floor(c / 86400000);
        if (jc < 1) jc = 0;
        
        let buat = moment.utc(user.createdAt).format("lll");
        let join = moment.utc(message.guild.member(user.id).joinedAt).format("lll");
        let Bot = user.bot ? "Bot" : "Human";

        let permissions = member.permissions.toArray().join(", ");
        let permission = permissions ? permissions : "None";

        const embed = new MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .setColor("#00fdfd")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField("Username", user.username)
        .addField("Nickname", nickname)
        .addField("User ID", user.id)
        .addField("User Role", roles)
        .addField("Account Type", Bot)
        .addField("Account Created", `${buat} Since (${jm} Day's Ago)`)
        .addField("User Joined", `${join} Since (${jc} Day's Ago)`)
        .addField("User Permission", permission)
        //.addField("Acknowledgements", members)
        .addField("User Status", status)
        .setFooter(`${user.tag} Status: ${status}`, image);
        message.channel.send(embed);
    }
}