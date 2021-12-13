const Discord = require("discord.js");
const ms = require("ms");
const humanize = require("humanize");

module.exports = {
    name: "slowmode",
    aliases: ["slow"],
    //cooldown: 4,
    run: async(bot, message, args) => {
  
  // You can make a single array to detect the user permissions.
  if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) {
    return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}}).then(m => {
      m.delete({ timeout: 4000});
    });
  }
  let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel;
  
  let time = message.mentions.channels.first() ? args[2] : args[1];
  
  if(time === "reset" || time === "off") {
    await channel.setRateLimitPerUser(0);
    return message.channel.send(`<#${channel.id}> has been deactivated.`);
  }
  
  if(!time) return message.channel.send("Please insert a time. **(example: 1m, 90m, 105m)**");
  
  let toMS = ms(time);
  let result = Math.floor(toMS / 1000);
  
  if(!result) return message.channel.send("Please insert a **valid** time. **(example: 5s, 10s, 15s, 30s)**");
  
  if(result > 21600) return message.channel.send("Time should be less than or equal to 6 hours.");
  else if(result < 1) return message.channel.send("Time should be less than or equal to 1 sconds. (or, use **off** if nessary)");
  
  await channel.setRateLimitPerUser(result);
  return message.channel.send(`<#${channel.id}> is now in ***slow motion***.`);
  }
}