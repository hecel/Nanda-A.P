module.exports = {
    name: "unlock",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permissions to usage this command!");

        let channel = message.mentions.channels.first() ? message.mentions.channels.first() : message.channel;
        if(!channel) return message.channel.send("Please specify a channel...");

        try {
            channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: true
            });
            message.channel.send(`Successfully unlocked ${channel}`);
        } catch(err) {
            console.log(err);
            return message.channel.send(`I couldn't unlock ${channel}`);
        }
    }
}