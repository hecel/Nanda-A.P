const { bot } = require("../../index");
const PrefixSchema = require("../../schema/PrefixSchema");

bot.on("guildDelete", async(guild) => {
    const data = await PrefixSchema.findOne({ Guild: guild.id });
    if(!data) {
        await PrefixSchema.findOneAndDelete({ Guild: guild.id }).then(console.log(`Remove the data from ${guild.name}`));
    }
});