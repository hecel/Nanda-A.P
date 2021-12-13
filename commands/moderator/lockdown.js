module.exports = {
    name: "lockdown",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("You dont have permissions to usage this command!");

        message.guild.channels.cache.forEach(channel => {
            try {
                channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                    SEND_MESSAGES: false
                   // VIEW_CHANNEL: false
                });
            } catch (e) {
                console.log(e);
                return message.channel.send(`I couldn't lockdown ${channel}`);
            }
        });
        message.channel.send("Successfully locked all the channel");
    }
}