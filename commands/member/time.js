const Discord = require("discord.js");
const timezone = require("moment-timezone");

module.exports = {
    name: "time",
    aliases: ["tm"],
    run: async(bot, message, args) => {
        try {
            const m = await message.channel.send("is setting the time...");
            setTimeout(() => {
              const embed = new Discord.MessageEmbed()
                .setColor("#FF8401")
                .addField(`:flag_id: Time Zone Indonesian:\n**${timezone().tz("Asia/Jakarta").format("⌚️ HH:mm [WIB]") + " "}**\n**${timezone().tz("Asia/Irkutsk").format("⌚️ HH:mm [WITA]") + " "}**\n**${timezone().tz("Asia/Jayapura").format("⌚️ HH:mm [WIT]") + " "}**`, true)
                .addField(`:flag_us: Time Zone America:\n**${timezone().tz("America/New_York").format("⌚️ HH:mm []") + " "}**\n**${timezone().tz("America/Los_Angeles").format("⌚️ HH:mm []") + " "}**`, true)
                .setTimestamp()
                .setFooter("Scrip by: BlueWolf#0371\n");
              m.edit(`⌚ time:`, embed);
            }, 4000);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}