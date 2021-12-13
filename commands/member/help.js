const { Client, Message, MessageEmbed } = require('discord.js');
const { prefix } = require("../../botconfig/config.json");
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    aliases: ["h"],
    description: 'see a list command',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        message.channel.startTyping(true);
        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

    if (!args[1]) {
      let categories = [];

      const dirEmojis = {
          fun: "🎳",
          giveaway: "🎉",
          globalChat: "🌐",
          member: "🔰",
          moderator: "️️️️️️️️️️️️️️️️️️️️️️️️️️️🔧",
          music: "🎶",
          owner: "👑"
      }

      readdirSync(`${process.cwd()}/commands/`).forEach((dir) => {
        const commands = readdirSync(`${process.cwd()}/commands/${dir}/`).filter((file) => file.endsWith(".js"));
        const editName = `${dirEmojis[dir]} ${dir.toUpperCase()}`;

        const cmds = commands.map((command) => {
          let file = require(`${process.cwd()}/commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: editName,
          value: cmds.length === 0 ? "In progress." : cmds.join(", "),
        };

        categories.push(data);
      });

      message.channel.stopTyping(true);
      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help eval\`.`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("BLUE");
      return message.channel.send(embed);
    } else {
        message.channel.stopTyping(true);
      const command = bot.commands.get(args[1].toLowerCase()) || bot.commands.find((c) => c.aliases && c.aliases.includes(args[1].toLowerCase()));

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("BLUE");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .addField("PREFIX:", `\`${prefix}\``)
        .addField("COMMAND:", command.name ? `\`${command.name}\`` : "No name for this command.")   
        .addField("ALIASES:", command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases for this command.")
        .addField("USAGE:", command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``)
        .addField("DESCRIPTION:", command.description ? command.description : "No description for this command.")
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("GOLD");
      return message.channel.send(embed);
    }
    }
}