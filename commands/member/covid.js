const Discord = require("discord.js")
const api = require("novelcovid");
const bot = new Discord.Client();
const { MessageButton } = require("discord-buttons");

module.exports = {
  name: "corona",
  category: "info",
  //description: ":emoji_117~1: **GET THE STATUS OF COUNTRY COVID** :emoji_117~1:",
  usage: "corona all or corona <country>",
  aliases: ["cr"],
  run: async (bot, message, args) => {
    
    api.settings({
        baseUrl: 'https://disease.sh'
    })
    let input = args.slice(1).join(" ");
    if(!input) {
      
      const corona = await api.all();
      console.log(corona);
      
      //let button = new MessageButton()
      //.setStyle("url")
      //.setURL(api) 
      //.setLabel("click here for see all covid cases")
      
      let embed = new Discord.MessageEmbed()
      .setTitle("Global Cases")
      .setColor("#ff2050")
      .setDescription("**SOMETIME CASES MAY DIFFER**")
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setTimestamp();
      return message.channel.send(embed);
      
      //const m = await message.channel.send("here the link:", { buttons: button });
      
      //const collect = m.createButtonCollector((button) => {
        //button.clicker.user.id === message.author.id, { time: 600000, max: 1000 }
      //});
      //collect.on("collect", (c) => {
        
        //console.log(c.id);
        
        //c.defer();
        
        //collect.stop();
      //});
      
    } else {

      let corona = await api.countries({country: args.slice(1).join(" ")}) 
      if(corona == null) return message.channel.send("Couldn't find data about this country")
      let embed = new Discord.MessageEmbed()
      .setTitle(`${corona.country}`)
      .setColor("#ff2050")
      .setDescription("SOMETIME CASES MAY DIFFER")
      .setThumbnail(corona.countryInfo.flag)
      .addField("Total Cases", corona.cases, true)
      .addField("Total Deaths", corona.deaths, true)
      .addField("Total Recovered", corona.recovered, true)
      .addField("Today's Cases", corona.todayCases, true)
      .addField("Today's Deaths", corona.todayDeaths, true)
      .addField("Active Cases", corona.active, true)
      .setTimestamp();
      return message.channel.send(embed)
    }    
  }
}