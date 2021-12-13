const { Client, Collection } = require("discord.js");
const { GiveawaysManager } = require("discord-giveaways");
const bot = new Client({ disableEveryone: true, partials: ["MESSAGE", "REACTION"], ws: { properties: { $browser: "Discord Android" } } });
const express = require("express");
const app = express();

const { prefix, TOKEN, developer } = require("./util/main");

app.get("/", (req, res) => {
  console.log("ping");
  res.sendStatus(200);
});
app.listen(2000);

bot.on("warn", console.warn);
bot.on("error", console.error);

bot.snipes = new Map();
bot.edits = new Collection();
bot.commands = new Collection();
bot.events = new Collection();
bot.aliases = new Collection();
bot.hatebin = new Map();
bot.developers = developer;
bot.giveaways = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  embedColor: "GOLD",
  reaction: "🎉"
});
bot.antijoins = new Collection();
bot.antialts = new Collection();
bot.args = new Collection();
bot.blacklist = new Collection();
bot.queue = new Map();

module.exports.bot = bot;
require("./handler/mongoose");

["module", "events"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.login(TOKEN);