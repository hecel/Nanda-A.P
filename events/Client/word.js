// const { bot } = require('../../index');
// const word = require("../../schema/blacklist-word");

// bot.on("message", async(message) => {
//     if(message.author.bot) return;
    
//     const blw = word.findOne({ Guild: message.guild.id, Word: message.content });
//     if(message.content.startsWith(blw)) {
//         await message.delete();
//         message.channel.send("This word has blacklisted by moderator/admin, please contact the moderator/admin to get this problem solved!");
//     }
// });