const { Client, Message, MessageEmbed } = require('discord.js');
const schema = require("../../schema/globalChat");
const { permis } = require("../../server/permission.json");
const choice = ["✅", "❌"];

module.exports = {
    name: 'set',
    aliases: [],
    description: 'set the global chat',
    premium: true,
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        const mod = permis.moderator;
        if(!message.member.hasPermission(mod)) return message.channel.send("You don't have permission to use this command");

        let ch = message.mentions.channels.first() || message.channel;
        schema.findOne({ Guild: message.guild.id, Channel: ch.id, Author: message.author.id, Activated: true }, async(err, data) => {
            if(data) return message.channel.send("Channel has already been listed as an internasional chat channel");

            data = new schema({
                Guild: message.guild.id,
                Channel: ch.id,
                Author: message.author.id,
                Activated: true
            });
            
            const m = await message.channel.send("Are you sure you want to add public chat on your server?");
            for(const chot of choice) {
                m.react(chot);
            }
            const filter = (rect, usr) => usr.id !== message.client.user.id;
            var collector = m.createReactionCollector(filter, { time: 60000, max: 1000 });

            collector.on("collect", (reaction, user) => {
                switch(reaction.emoji.name) {
                    case "✅":
                      reaction.users.remove(user).catch(console.error);
                      data.save();
                      message.channel.send(`${ch} has been add to the internasional chat`);
                      collector.stop();
                      break;

                    case "❌":
                      reaction.users.remove(user).catch(console.error);
                      message.channel.send("Set up public chat canseled");
                      collector.stop();
                      break;
                }
            });

            collector.on("end", () => {
                m.reactions.removeAll().catch(console.error);
                if(m && !m.deleted) {
                    m.delete({ timeout: 2000 });
                }
            });
        });
    }
}