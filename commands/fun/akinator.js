const Discord = require("discord.js");
let config;
try {
    config = require("../../botconfig/config.json");
} catch(err) {
    config = null;
}

const prefix = config ? config.prefix : null;

module.exports = {
    name: "akinator",
    aliases: ["aki"],
    run: async(bot, message, args) => {
        const { Aki } = require("aki-api");
        const {list, verify} = require("../../util/function");
        const regions = ["person", "object", "animal"];

        if(!message.channel.permissionsFor(bot.user).has("EMBED_LINKS")) return message.channel.send("Missing Permissions: [EMBED_LINKS]");
        if(!args[1]) return message.channel.send(`Please provite the category!\nEither \`${list(regions, "ör")}\``);

        let stringAki = args[1].toLowerCase();
        let region;
        
        if(stringAki === "person".toLocaleLowerCase()) region = "en";
        if(stringAki === "object".toLocaleLowerCase()) region = "en_objects";
        if(stringAki === "animal".toLocaleLowerCase()) region = "en_animals";
        if(!regions.includes(stringAki)) return message.channel.send(`Please provite the category!\nEither \`${list(regions, "ör")}\``);

        message.channel.send("Please wait...").then(n => n.delete({ timeout: 4000 }));
        try{
            const aki = new Aki(region);
            let ans = null;
            let win = false;
            let timeGuessed = 0;
            let guessResetNum = 0;
            let mentBlack = false;
            let forceGuess = false;
            const guessBlackList = [];
            while(timeGuessed < 3) {
                if(guessResetNum > 0) guessResetNum--;
                if(ans === null) {
                    await aki.start();
                } else if(mentBlack) {
                    mentBlack === false;
                } else {
                    try{
                        await aki.step(ans);
                    } catch(err) {
                        console.log(err);
                        await aki.step(ans);
                    }
                }
                if(!aki.answers || aki.currentStep >= 79) forceGuess = true;
                const answers = aki.answers.map((answer) => answer.toLowerCase());
                answers.push("end");
                if(aki.currentStep > 0) answers.push("back");

                const embed = new Discord.MessageEmbed()
                .setAuthor(`Question Number ${aki.currentStep + 1}`, bot.user.avatarURL())
                .setDescription([
                    `${aki.question}`,
                    "Available Answers:",
                    `**${aki.answers.join(" | ")}${aki.currentStep > 0 ? " | Back" : ""} | End**`
                ])
                .setColor("RANDOM")
                .setTimestamp();
                message.channel.send(embed);
                const filter = (res) => res.author.id === message.author.id && answers.includes(res.content.toLowerCase());
                const messages = await message.channel.awaitMessages(filter, {
                    max: 10,
                    time: 10000
                });
                if(!messages.size) {
                    message.channel.send("Time Up!");
                    win = true;
                    break;
                }
                const choice = messages.first().content.toLowerCase();
                if(choice.toLowerCase() === "end".toLocaleLowerCase()) {
                    forceGuess = true;
                } else if(choice.toLowerCase() === "back".toLocaleLowerCase()) {
                    wentBack = true;
                    await aki.back();
                    continue;
                } else {
                    ans = answers.indexOf(choice);
                }
                if((aki.progress >= 90 && !guessResetNum) || forceGuess) {
                    timeGuessed++;
                    guessResetNum += 10;
                    await aki.win();
                    const guess = aki.answers.filter((g) => !guessBlackList.includes(g.id))[0];
                    if(!guess) {
                        message.channel.send("I cant think of ayone!");
                        win = true;
                        break;
                    }
                    guessBlackList.push(guess.id);
                    const embed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`I'm ${Math.round(guess.proba * 100)}% sure its`)
                    .setDescription(`${guess.name}${guess.description ? `\nProfession - ${guess.description}` : `\n**Ranking: ${guess.ranking}`}\nType yes/no to confirm or deny`)
                    .setImage(guess.absolute_picture_path || null)
                    .setTimestamp();
                    message.channel.send(embed);

                    const verification = await verify(message.channel, message.author);
                    if(verification === 0) {
                        win = "time";
                        break;
                    } else if(verification) {
                        win = false;
                        break;
                    } else {
                        const exmessage = timeGuessed >= 3 || forceGuess ? "I give up!" : "I keep going!";
                        const embed = new Discord.MessageEmbed()
                        .setDescription(`Is that so? ${exmessage}`)
                        .setColor("RANDOM")
                        .setTimestamp();
                        message.channel.send(embed);
                        if(timeGuessed >= 3 || forceGuess) {
                            win = true;
                            break;
                        }
                    }
                }
            }
            if(win === "time") return message.channel.send("I guess your silence means I won!");
            if(win) {
                const embed = new Discord.MessageEmbed()
                .setDescription("You Have defeated me this time!")
                .setColor("RANDOM")
                .setTimestamp();
                message.channel.send(embed);
            } else {
                return message.channel.send("Guessed it right once again!");
            }
        } catch(err) {
            console.error(err);
            return message.channel.send(`:x: oh no! An error occured: \`${err}\` try again later`);
        }
    }
} 
module.exports.help = {
    cooldown: 4
}