const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");

bot.on("messageReactionAdd", async(reaction, user) => {
    const starboard = async() => {
        const SBChannel = bot.channels.cache.find(c => c.name.toLowerCase() === "⭐・starboard");
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const sentMessage = msgs.find(msg => msg.embeds.length >= 1 ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(sentMessage) sentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor("YELLOW")
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(reaction.message.attachments.array().length >= 1) embed.setImage(reaction.message.attachments.array()[0].proxyURL);
            if(SBChannel) SBChannel.send("1 - ⭐", embed);
        }
    }
    if(reaction.emoji.name === "⭐") {
        if(reaction.message.channel.name.toLowerCase() === "⭐・starboard") return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            starboard();
        } else starboard();
    }
});