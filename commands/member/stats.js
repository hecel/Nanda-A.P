const { MessageEmbed, version: djsversion } = require("discord.js");
const { version } = require("../../package.json");
const osutils = require('os-utils');
const os = require('os');

module.exports = {
  name: "stats",
  aliases: ["st"],
  run: async (bot, message, args) => {
    
    let author = ["wulvies#7514", "Wolfrad#0371"];
    
    let seconds = Math.floor(message.client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    
    let detik = Math.floor(message.client.shard / 1000);
    let menit = Math.floor(detik / 60);
    let jam = Math.floor(menit / 60);
    let hari = Math.floor(jam / 24);
    
    detik %= 60;
    menit %= 60;
    jam %= 24;

    
    osutils.cpuUsage(function(v) {
      
      const core = os.cpus()[0];
      
      let embed = new MessageEmbed()
      .setColor('BBDEFB')
      .setAuthor(`${bot.user.username} Statistics`, bot.user.displayAvatarURL())
      .addField('🛡️・Developers', '```' + `• ${author}` + '```')
      .addField('⌚・Uptime Statistic', '```' + `
• Days        :: ${days}
• Hours       :: ${hours}
• Minutes     :: ${minutes}
• Seconds     :: ${seconds}` + '```')
      .addField("⚠️•Shard Statistic", "```" + `
• Days        :: ${hari}
• Hours       :: ${jam}
• Minutes     :: ${menit}
• Seconds     :: ${detik}` + "```")
      .addField('📁・Client Statistic', '```' + `
• Users       :: ${bot.users.cache.size}
• Servers     :: ${bot.guilds.cache.size}
• Channels    :: ${bot.channels.cache.size}
• Commands    :: ${bot.commands.size}
• ID          :: ${bot.user.id}` + '```')
      .addField('📦・Package Information', '```' + `
• Version     :: v${version}
• Node.js     :: ${process.version}
• Discord.js  :: v${djsversion}` + '```')
      .addField('📋・OS Information', '```' + `
• Platform    :: ${process.platform}
• Arch        :: ${os.arch()}
• Cores       :: ${os.cpus().length}
• Model       :: ${core.model}
• Mem Usage   :: ${(process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2) + " MB"}
• CPU Usage   :: ${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%` + '```')
      .addField('🏓・API Latency', '```' + `
• WS Latency  :: ${Date.now() - message.createdTimestamp} ms
• Bot Latency :: ${Math.round(bot.ws.ping)} ms` + '```');
      
      message.channel.send(embed);
    });
  }
}