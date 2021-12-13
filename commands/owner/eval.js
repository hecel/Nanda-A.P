const { MessageEmbed } = require("discord.js");
const { post } = require("node-superfetch");
const Discord = require("discord.js");
const client = new Discord.Client();
//const { MessageButton } = require("discord-buttons");
const choice = ["🚫", "🗿"];
let config = require("../../botconfig/config.json");

module.exports = {
  name: "eval",
  aliases: ["e", "ev"],
  cooldown: 5,
  run: async(bot, message, Util) => {
  
    const msg = message;
    
     const { args, flags } = parseQuery(Util);
  try {
    const owner = config.owner;
    if(!owner.includes(message.author.id)) return message.channel.send('You Are Not My Developper.').then(m => {
      m.delete({ timeout: 4000 });
    });
    
    if (!args.length) {
      throw new TypeError(`Try ${module.exports.usage}`);
    }
    let code = args.slice(1).join(" ");
    if(!code) return message.channel.send("Please input the code.").then(m => {
      m.delete({ timeout : 4000 });
    });
    
    let depth = 0;

    if (flags.includes("async")) {
      code = `(async() => { ${code} })()`;
    }
    if (flags.some(x => x.includes("depth"))) {
      depth = flags.find(x => x.includes("depth")).split("=")[1];
      depth = parseInt(depth, 10);
    }
    let { evaled, type } = await parseEval(eval(code)); /* eslint-disable-line */
    if (flags.includes("silent")) return;
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth });
    evaled = evaled.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
    
    let output = clean(evaled);
    
    if (code.includes(`SECRET`) || code.includes(`TOKEN`) || code.includes("bot.token") || code.includes("bot.login")) {
      evaled = "No, shut up, what will you do it with the code?";
    } else {
      evaled;
    }
    
    const {body} = await post("https://bin-clientdev.glitch.me/documents").send(evaled);       
      let hatebin = `https://bin-clientdev.glitch.me/${body.key}.js`;
      
    // let button = new MessageButton()
    // .setStyle("url")
    // .setURL(hatebin) 
    // .setLabel("click here to see the link");
    
    if(output.length > 2048) {
          
      const embed = new MessageEmbed()
      .setAuthor("Evaled success")
      .setColor("GREEN")
      .setDescription(hatebin)
      .addField("Type", `\`\`\`${type}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
      const filter = (rect, usr) => usr.id !== message.client.user.id;
      var collector = m.createReactionCollector(filter, { time: 600000, max: 1000 });
        collector.on("collect", (reaction, user) => {
        switch(reaction.emoji.name) {
          
          case "🚫":
            reaction.users.remove(user).catch(console.error);
            m.delete();
            break;
          
          case "🗿":
            reaction.users.remove(user).catch(console.error);
            msg.channel.send("thanks bro.").then(me => {
            me.delete({ timeout: 4000 });
            });
            break;
            
            collector.stop();
            break;
            
          default:
            reaction.users.remove(user).catch(console.error);
            break;
        }
      });
      
    } else {
      
    evaled = `\`\`\`${evaled}\`\`\``;
    const embed = new MessageEmbed()
      .setAuthor("Evaled success")
      .setColor("GREEN")
      .setDescription(evaled)
      .addField("Type", `\`\`\`${type}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector2 = m.createReactionCollector(filter, { time: 600000, max: 1000 });
    collector2.on("collect", (reaction, user) => {
      switch(reaction.emoji.name) {
          
        case "🚫":
          reaction.users.remove(user).catch(console.error);
          m.delete();
          break;
          
          
        case "🗿":
          reaction.users.remove(user).catch(console.error);
          msg.channel.send("thanks bro.").then(me => {
            me.delete({ timeout: 4000 });
          });
          break;
          
          collector2.stop();
          break;
          
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    }); 
    }
  } catch (e) {
    const embed = new MessageEmbed()
      .setColor("RED")
      .setAuthor("Evaled error")
      .setDescription(`\`\`\`${e}\`\`\``)
      .setFooter(`React to delete message.`);
    const m = await message.channel.send(embed);
    for (const chot of choice) {
      await m.react(chot);
    }
    const filter = (reaction, user) => user.id !== message.client.user.id;
    var collector3 = m.createReactionCollector(filter, { time: 600000, max: 1000 });
    collector3.on("collect", (reaction, user) => {
      switch(reaction.emoji.name) {
          
        case "🚫":
          reaction.users.remove(user).catch(console.error);
          m.delete();
          break;
        
        case "🗿":
          reaction.users.remove(user).catch(console.error);
          msg.channel.send("thanks bro.").then(me => {
            me.delete({ timeout: 4000 });
          });
          break;
          
          collector3.stop();
          break;
          
        default:
          reaction.users.remove(user).catch(console.error);
          break;
      }
    });
  }
 }
}

async function parseEval(input) {
  const isPromise =
    input instanceof Promise &&
    typeof input.then === "function" &&
    typeof input.catch === "function";
  if (isPromise) {
    input = await input;
    return {
      evaled: input,
      type: `Promise<${parseType(input)}>`
    };
  }
  return {
    evaled: input,
    type: parseType(input)
  };
}

function clean(string) {
    if (typeof text === "string") {
      return string.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
      return string;
    }
}

function parseType(input) {
  if (input instanceof Buffer) {
    let length = Math.round(input.length / 1024 / 1024);
    let ic = "MB";
    if (!length) {
      length = Math.round(input.length / 1024);
      ic = "KB";
    }
    if (!length) {
      length = Math.round(input.length);
      ic = "Bytes";
    }
    return `Buffer (${length} ${ic})`;
  }
  return input === null || input === undefined ? "Void" : input.constructor.name;
}

function parseQuery(queries) {
  const args = [];
  const flags = [];
  for (const query of queries) {
    if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  return { args, flags };
}