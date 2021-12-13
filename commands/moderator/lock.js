module.exports = {
    name: "lock",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permissions to usage this command!");

        let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel;
        if(!channel) return message.channel.send("Please specify a channel...");

        try {
            channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: false
            });
            message.channel.send(`Successfully locked ${channel}`);
        } catch(err) {
            console.log(err);
            return message.channel.send(`I couldn't lock ${channel}`);
        }
    }
}