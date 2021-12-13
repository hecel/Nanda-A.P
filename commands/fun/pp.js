const Discord = require("discord.js");

module.exports = {
    name: "pp",
    aliases: [],
    run: async(bot , message, args) => {
        let user = message.mentions.users.first() || message.author;
        let pp = [")=D", ")====D", ")======D", ")===========D", ")==============D", ")====================D"];
        let rm = `${Math.floor(Math.random() * pp.length)}`;

        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .addField(`${user.tag} pp:`, pp[rm])
        .setColor("RANDOM")
        .setTimestamp();
        message.channel.send(embed);
    }
}