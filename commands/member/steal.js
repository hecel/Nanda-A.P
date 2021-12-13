const { MessageEmbed, Util } = require("discord.js");

module.exports = {
    name: "emoji",
    aliases: ["emo"],
    run: async(bot, message, args) => {
        if(!args.length) return message.channel.send("Please specify some emojis!");

        for(const rawEmoji of args) {
            const parsedEmoji = Util.parseEmoji(rawEmoji);

            if(parsedEmoji.id) {
                const extension = parsedEmoji.animated ? ".gif" : ".png";
                const url =  `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

                const embed = new MessageEmbed()
                .setTitle(`${parsedEmoji.name}, ${parsedEmoji.id}`)
                .setColor("GOLD")
                .setAuthor("Enlarged Emojis!", message.author.displayAvatarURL({ dynamic: true }))
                .setImage(url)
                .setTimestamp();
                message.channel.send(embed);

                // message.guild.emojis.create(url, parsedEmoji.name).then(() => {
                //     const embed = new MessageEmbed()
                //     .setTitle(parsedEmoji.name, parsedEmoji.id)
                //     .setColor("GOLD")
                //     .setAuthor(`Enlarged Emojis!`, message.author.displayAvatarURL({ dynamic: true }))
                //     .setImage(url)
                //     .setTimestamp();
                //     message.channel.send(`Added: **${parsedEmoji.name}**`, embed);
                // });
            }
        }
    }
}