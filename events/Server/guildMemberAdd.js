const { MessageEmbed } = require("discord.js");
const { bot } = require("../../index");
const schema = require("../../schema/blacklist");

bot.on("guildMemberAdd", async(member, message) => {
    //blacklist system
    const getBlacklist = await schema.findOne({ Guild: member.guild.id, Users: member.id });
    if(!getBlacklist) return;
    if(getBlacklist) {
        if(!member.guild.me.permissions.has("KICK_MEMBERS")) return;
        try {
            await member.user.send("You have been kicked with reason: **You have been blacklisted!**");
        } catch(err) {
    
        }
        await member.kick("This users has been add to blacklist");
    }
    //antialt system
    const timeSpan = bot.args.get(member.guild.id);
    const getCollect = bot.antialts.has(member.guild.id);
    if(!getCollect) return;
    const createdAt = new Date(member.user.createdAt).getTime();
        const difference = Date.now() - createdAt;
    if(difference < timeSpan) {
        if(bot.antialts.get(member.guild.id)) {
            if(!member.guild.me.permissions.has("KICK_MEMBERS")) return;
            try {
                await member.user.send("You have been kicked with reason: **You are an Alt account!**");
            } catch(err) {
    
            }
            await member.kick("This is an alt account");
        }
    }
    //antijoin system
    const getCollection = bot.antijoins.has(member.guild.id);
    if(!getCollection) return;
    if(bot.antijoins.get(member.guild.id)) {
        if(!member.guild.me.permissions.has("KICK_MEMBERS")) return;
        try {
            await member.user.send(`You have been kicked with reason: **Antijoin was enabled**`);
        } catch {

        }
        await member.kick("Antijoin was enabled");
    }

    // system guild
    let guild = member.guild;
    let server = guild.name;
    let total = guild.memberCount;
    let channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    let role = member.guild.roles.cache.find(r => r.name === "member");
    if (!channel) return;
    if (!role) return;
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Welcome!")
      .setDescription(`Asik ${member} join, sekarang member ada: ${total} member`)
      .setTimestamp()
      .setFooter("script by: BuleWolf#0371\n");
    channel.send(embed).then(member.roles.add(role.id));
  });