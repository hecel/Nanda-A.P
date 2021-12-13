const Discord = require("discord.js");
//const db = require("quick.db");
const discord = require("discord.js");
const emoji = ["🚫"];

module.exports = {
    name: "nuke",
    run: async(bot, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You Dont Have Permission!")

message.channel.clone().then(c => {
   message.channel.delete();
    c.send("This channel has been nuked!\nhttps://imgur.com/LIyGeCR").then(m => {
  
    for (const chot of emoji) {
       m.react(chot);
    }
  const filter = (rect, usr) => emoji.includes(rect.emoji.name) && usr.id === message.author.id;
    m.createReactionCollector(filter, { time: 600000, max: 1 }).on("collect", async col => {
      if (col.emoji.name === "🚫") return m.delete();
     });
    });
  });
 }
}