const { MessageEmbed } = require('discord.js');
const fetch = require('superagent');

module.exports = {
  name: 'meme',
  aliases: ["mem"],
  run: async(bot, message, args) => {
    
   let subreddits = [
     "meme",
     "animemes",
     "MemesOfAnime",
     "animememes",
     "AnimeFunny",
     "dankmemes",
     "dankmeme",
     "wholesomememes",
     "MemeEconomy",
     "techsupportanimals",
     "meirl",
     "me_irl",
     "2meirl4meirl",
     "AdviceAnimals",
     "furry"
    ]
   
  const { body } = await fetch.get(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`);
  const { data } = body;
		const meme = data[Math.floor(Math.random() * data.length)];
   
    try {
      
      let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(meme.title)
      .setDescription(`Score: **${meme.score}**\nViews: **${meme.views}**`)
      .setTitle(`${meme.subreddit}`)
      .setURL(`https://www.reddit.com${meme.reddit}`)
      .setImage(`http://imgur.com/${meme.hash}${meme.ext}`)
      .setTimestamp()
      .setFooter("Script by: 𝓦𝓞𝓵𝓕𝓡𝓐𝓓#0371\n");
      message.channel.send(embed);
      
    } catch (err) {
      let embed = new MessageEmbed()
      .setTitle(":x: Error!")
      .setDescription(err)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("GOLD")
      .setTimestamp()
      .setFooter("Script by: 𝓦𝓞𝓵𝓕𝓡𝓐𝓓#0371");
      message.channel.send(embed);
    }
       
   }
}