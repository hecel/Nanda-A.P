const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const { prefix, developer } = require("../../botconfig/config.json");
const prefixSchema = require("../../schema/PrefixSchema");
const server = require("../../schema/blacklist-servers");
const user = require("../../schema/blacklist-user");
const premiumSchema = require("../../schema/premium");

bot.on("message", async(message) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") {
        const ch = bot.channels.cache.get("910458092750266379");
        if(!ch) return;

        const dmEmbed = new MessageEmbed()
        .setTitle("New Dm!")
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .addField("User:", message.author, true)
        .addField("User ID:", message.author.id, true)
        .addField("Content:", message.content)
        .setFooter(`Reqeuested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        ch.send(dmEmbed);
    }
  
    let PREFIX;
    try{
        let data = await prefixSchema.findOne({ Guild: message.guild.id });
        if(!data) {
            PREFIX = prefix;
        } else {
            PREFIX = data.prefix;
        }
    } catch(err) {

    }
  
    if(message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) return message.channel.send(`${message.author} My Prefix is ${PREFIX}`).then(m => { m.delete({ timeout: 10000 }) });

    if(!message.content.startsWith(PREFIX)) return;
    //sistem args
    const args = message.content.split(" ");
    
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(PREFIX.length);
    message.prefix = PREFIX;
    //sytem cooldown
    let { cooldown } = require("../../cooldown.js");
    let commandcooldown = cooldown;
  
    if(commandcooldown.has(message.author.id)) {
        await message.delete();
        return message.channel.send("Hi use the bot again within 5 seconds").then(m => { m.delete({ timeout: 5000 }) });
    }
  
    commandcooldown.add(message.author.id);
    setTimeout(() => {
        commandcooldown.delete(message.author.id);
      }, 5000);
    //main system
    const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    //const cmds = bot.premiums.get(command) || bot.premiums.find(cmds => cmds.premiums && cmds.premiums.includes(command));
    //cmd = cmds;
    if(cmd) {
        const blacklist = await server.findOne({ Guild: message.guild.id });
        if(blacklist) return message.channel.send("This server has been blacklist by the owner, please contact the owner to get this problem solved!");

        const userblacklist = await user.findOne({ Users: message.author.id });
        if(userblacklist) return message.channel.send("You has been blacklist by the owner, please contact the owner to get this problem solved!");

        if(cmd.premium) {
            premiumSchema.findOne({ User: message.author.id }, async(err, data) => {
                if(!data) return message.channel.send(`You need upgrade to premium to use this command!, please contact ${developer} to upgrade to premium features`).then(m => m.delete({ timeout: 10000 }));
                if(!data.Permanent && Date.now() > data.Expire) {
                    data.delete();
                    message.channel.send("You premium features is expired, please contact the owner to solved you problem").then(m => m.delete({ timeout: 10000 }));
                }
                cmd.run(bot, message, args);
            });
        } else {
            cmd.run(bot, message, args);
        }
      } else {
          message.channel.send("command not found!").then(m => m.delete({ timeout: 4000 }));
      }
    console.log(`${message.author.tag} menggunakan command ${PREFIX}${command}`, `message ini dari: ${message.guild.name}`);
  
    message.flags = [];
    while(args[1] && args[1][1] === "-") {
        message.flags.push(args.shift().slice(0));
    }
  
  //   try {
  //     const commandFile = require(`./commands/owner/${cmd}.js`);
  //     commandFile.run(bot, message, args);
  //   } catch(error) {
      
  //   }
  //   try {
  //     const commandFile = require(`./commands/moderator/${cmd}.js`);
  //     commandFile.run(bot, message, args);
  //   } catch(error) {
      
  //   }
  //   try {
  //     const commandFile = require(`./commands/member/${cmd}.js`);
  //     commandFile.run(bot, message, args);
  //   } catch(error) {
      
  //   }
  //   try {
  //     const commandFile = require(`./commands/giveaway/${cmd}.js`);
  //     commandFile.run(bot, message, args);
  //   } catch(error) {
      
  //   }
  });