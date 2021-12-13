const { MessageEmbed } = require("discord.js");
const superagent = require("superagent");

module.exports = {
  name: "npm-package",
  aliases: ["npm"],
  run: async(bot, message, args) => {

    let query = args.slice(1).join(" ");
    if(!query) return message.channel.send("Please provide a valid package name!");

    let response;

    try {
     response = await superagent.get("https://api.npms.io/v2/search?q=" + query)
    } catch(err) {
      return message.channel.send("An error occurred, please try again later!");
      throw err;
    }

    try {
    let res = response.body.results[0].package;

    let embed = new MessageEmbed()
    .setColor("#cb0000")
    .setTitle(`${res.name} - npm`)
    .setURL(res.links.npm)
    .setThumbnail("https://www.petanikode.com/img/nodejs/npm/npm-sqr.png")
    .setDescription(res.description)
    .addField("Repository", res.links.repository ? res.links.repository : "None")
    .addField("Homepage", res.links.homepage ? res.links.homepage : "None")
    .addField("Author", res.author ? res.author.name : "None", true)
    .addField("Version", res.version, true)
    .addField("Keywords", res.keywords ? res.keywords.join(", ") : "None")
    .addField("Maintainers", res.maintainers ? res.maintainers.map(e => e.username).join(", ") : "None")
    .setFooter(`${message.author.tag} | !${module.exports.name}`)
    .setTimestamp();

    message.channel.send(embed);
    } catch(err) {
      return message.channel.send("No result were found!");
      throw err;
    }
  }
}