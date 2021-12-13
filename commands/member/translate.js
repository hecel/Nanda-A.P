const translate = require("@iamtraction/google-translate");
const Discord = require("discord.js");

module.exports = {
    name: "translate",
    aliases: ["tr"],
    run: async(bot, message, args) => {
        let text = args.slice(2).join(" ");
        let lang = args[1];
        if(!text) return message.channel.send("Please provide a text to translate").then(m => m.delete({ timeout: 400 }));
        if(!lang) return message.channel.send("Please provide a ISO code of the language").then(m => m.delete({ timeout: 400 }));

        translate(text, { to: lang }).then(res => {
            const embed = new Discord.MessageEmbed()
            .setTitle("**Translate command**")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("GREEN")
            .setDescription(res.text)
            .setTimestamp();
            message.channel.send(embed);
        }).catch(err => {
            return message.channel.send("Please provide a ISO code of the language").then(m => m.delete({ timeout: 400 }));
        });
    }
}