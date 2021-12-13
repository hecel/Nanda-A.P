module.exports = {
    name: "unlockdown",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permissions to usage this command!");

        message.guild.channels.cache.forEach(channel => {
            try {
                channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                    SEND_MESSAGES: true
                   // VIEW_CHANNEL: true
                });
            } catch (e) {
                console.log(e);
                return message.channel.send(`I couldn't unlockdown ${channel}`);
            }
        });
        message.channel.send("Successfully unlocked all the channel");
    }
}