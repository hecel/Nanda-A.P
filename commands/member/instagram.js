const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags"); //npm i common-tags
const instagram = require("instagram-api.js") //npm i instagram-api.js

module.exports = {
    name: "instagram",
    aliases: ["ig"],
    //description: "Find out some nice instagram statistics, I just rewrote the code from {TheSourceCode}, Galaxy ANV͇̿I͇̿P͇̿#9664",
    run: async (bot, message, args) => {
      
        const name = args.slice(1).join(" ");

        if (!name) return message.channel.send("Please provide your instagram name")
        let id = '3757770496%3AnYfpA1yNAvh2LB%3A11'
        const account = await instagram.user(name, id)
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(`https://instagram.com/${name}`)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`
            \`•》Username: ${account.username}\`
            \`•》Full name: ${account.full_name}\`
            \`•》Bio: ${account.biography ? account.biography : "No Bio"}\`
            \`•》Posts: ${account.edge_owner_to_timeline_media.count}\`
            \`•》Followers: ${account.edge_followed_by.count}\`
            \`•》Following: ${account.edge_follow.count}\`
            \`•》Private: ${account.is_private ? "Yes" : "No"}\``)
        message.channel.send(embed);
    }
}