const glob = require("glob");
let config = require("../../botconfig/config.json");

module.exports = {
  name: "reload",
  description: "reload for all file",
  aliases: ["rl"],
  run: async(bot, message, args) => {
    
    const owner = config.owner;
    if(!owner.includes(message.author.id)) return message.channel.send('You Are Not My Developper.').then(m => {
      m.delete({ timeout: 4000 });
    });
    
    if(!args[1]) return message.channel.send("please input a category.").then(m => {
      m.delete({ timeout: 4000 });
    });
    if(!args[2]) return message.channel.send("please input a command name.").then(m => {
      m.delete({ timeout: 4000 });
    });
    let category = args[1].toLowerCase();
    let command = args[2].toLowerCase();
    
    try {
      delete require.cache[require.resolve(`../${category}/${command}.js`)];
      bot.commands.delete(command);
      
      const pull = require(`../${category}/${command}.js`);
      bot.commands.set(command, pull);
      
      message.channel.send(`Done reloading **${command}.js**`);
    } catch(error) {
      message.channel.send(`Error reloading **${command}.js**: \`${error.message}\``);
    }
  }
}