const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  aliases: ["nick"],
  /**
   * @param {Client} bot
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args) => {
    try {
      // You can make a single array to detect the user permissions.
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({ embed: { color: "RED", description: "You can't use this command!" } });

      let nick = args.slice(2).join(" ");
      let user = message.mentions.users.first();

      if (!user) return message.channel.send({ embed: { color: "RED", description: "You need to input the user." } }).then((m) => { m.delete({ timeout: 4000 }) });
      if (!nick) return message.channel.send({ embed: { color: "RED", description: "You need to input the nickname or type **reset** to reset the nickname."} }).then((m) => { m.delete({ timeout: 4000 }) });

      let member = message.guild.members.cache.get(user.id);

      if(nick === "reset") {
        await member.setNickname(null);
        return message.channel.send({ embed: { color: "GREEN", description: `Successfully reset nick for **${user.tag}**`} });
      } else {
        await member.setNickname(nick);
        return message.channel.send({ embed: { color: "GREEN", description: `Successfully changed **${user.tag}** nickname to **${nick}**`} });
      }
    } catch (e) {
      return message.channel.send(e);
    }
  },
}