const { bot } = require("../../index");
const { MessageEmbed } = require("discord.js");
const schema = require("../../schema/globalChat");

bot.on("message", async(message) => {
    if(message.author.bot) return;
    schema.findOne({ Channel: message.channel.id, Activited: true }, async(err, data) => {
        if(data) {
            schema.find({ Activited: true }, async(err, data) => {
                data.map(({ Channel }) => {
                    if(Channel === message.channel.id) return;

                    const embed = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(message.content)
                    .setColor("RANDOM")
                    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
                    .setTimestamp();
                    bot.channels.cache.get(Channel).send(embed);
                });
            });
        }
    });
});