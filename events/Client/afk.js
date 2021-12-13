const { bot } = require("../../index");
const schema = require("../../schema/afk");

bot.on("message", async(message) => {
    if(message.author.bot) return;

    let data2;
    try {
        data2 = await schema.findOne({
            Guild: message.guild.id,
            Users: message.author.id
        });
        if(!data2) {
            data2 = await schema.create({
                Guild: message.guild.id,
                Users: message.author.id
            });
        }
    } catch (error) {
        // console.log(error);
    }
    if(data2.Afk === true) {
        data2.Afk_reason = null;
        data2.Afk = false;

        message.channel.send(`Welcome back ${message.author}, I removed your AFK`).then(m => m.delete({ timeout: 4000 }));
        data2.save();
    }
    if(message.mentions.members.first()) {
        let data3;
        try {
            data3 = await schema.findOne({
                Guild: message.guild.id,
                Users: message.mentions.members.first().id
            });
            if(!data3) {
                data3 = await schema.create({
                    Guild: message.guild.id,
                    Users: message.mentions.members.first().id
                });
            }
        } catch (error) {
            // console.log(error);
        }
        if(data3.Afk == true) {
            message.channel.send(`${message.mentions.members.first().user.tag} is AFK: **${data3.Afk_reason}**`).then(m => m.delete({ timeout: 4000 }));
        }
    }
});