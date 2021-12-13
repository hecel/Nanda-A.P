let config;

try {
  config = require("../botconfig/config.json");
} catch (error) {
  console.log(error);
}

exports.TOKEN = config ? config.TOKEN : process.env.TOKEN;
exports.prefix = config ? config.prefix : process.env.prefix;
exports.YT_API = config ? config.YT_API : process.env.YT_API;
exports.owner = config ? config.owner : process.env.owner;
exports.moderator = config ? config.moderator : process.env.moderator;
exports.developer = config ? config.developer : process.env.developer;
exports.hostedBy = config ? config.hostedBy : process.env.hostedBy;
exports.everyoneMentions = config ? config.everyoneMentions : process.env.everyoneMentions;
exports.DEVAULT_VOLUME = config ? config.DEVAULT_VOLUME : process.env.DEVAULT_VOLUME;