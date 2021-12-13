const Discord = require("discord.js");

module.exports = {
    name: "react",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission **ADMINISTRATOR**");

        let roles = message.mentions.roles.first();
        let emoji = args[2];
        if(!roles) return message.channel.send("Please mentions a roles to get added");
        if(!emoji) return message.channel.send("Please specify a emoji");

        //✅
        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("#00fdfd")
        .setDescription(`React with ${emoji} to get the role ${roles}`)
        .setTimestamp();
        let msg = await message.channel.send(embed);

        await msg.react(emoji);

        const filter = (reaction, user) => [emoji].includes(reaction.emoji.name);
        const collector = msg.createReactionCollector(filter, { dispose: true });

        collector.on("remove", (reaction, user) => {
            if(user.bot) return;

            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

            member.roles.remove(roles.id);
        });
        collector.on("collect", (reaction, user) => {
            if(user.bot) return;

            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

            member.roles.add(roles.id);
        });
    }
}