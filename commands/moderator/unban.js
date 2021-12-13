module.exports = {
    name: "unban",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission to run this command!");
        const member = args.slice(1).join(" ");
        if(!member) return message.channel.send("Please specify a member");

        message.guild.fetchBans().then(ban => {
            if(ban.size === 0) return message.channel.send("No one is banned in this server").then(m => m.delete({ timeout: 4000 }));
            let banUser = ban.find(bans => bans.user.id === member);
            if(!banUser) return message.channel.send("This user inst banned!");
            message.guild.members.unban(banUser.user);
        });
        message.channel.send(`Successfully unbaned ${member}`);
    }
}