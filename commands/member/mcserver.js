const Discord = require("discord.js");
const util = require("minecraft-server-util");

module.exports = {
    name: "mcserver",
    aliases: ["mc"],
    run: async(bot, message, args) => {
        let ip = args[1];
        if(!ip) return message.channel.send("Please specify a ip server");
        let port = args[2];
        if(!port) return message.channel.send("Please specify a port server");

        util.status(ip, { port: parseInt(port) }).then((response) => {
            const embed = new Discord.MessageEmbed()
            .setTitle("Mc server status")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setColor("#BFCDEB")
            .addFields(
                { name: "Server IP", value: response.host },
                { name: "Online Players", value: response.onlinePlayers },
                { name: "Max Player", value: response.maxPlayers },
                { name: "Version", value: response.version }
            )
            .setFooter("Mc server util by wolvies")
            .setTimestamp();
            message.channel.send(embed);
        }).catch((error) => {
            message.channel.send("There was an error finding this server");
            throw error;
        });
    }
}