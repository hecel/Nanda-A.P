
module.exports = {
    name: "reminder",
    aliases: ["remind"],
    run: async(bot, message, args) => {
        let set = message.content.split(" | ");
        let time = 0;
        if(set[1]) {
            if(set[1].includes("s")) {
                time = 1000 * parseInt(set[1].replace("s", ""));
            } else if(set[1].includes("m")) {
                time = 1000 * 60 * parseInt(set[1].replace("m", ""));
            }else if(set[1].includes("h")) {
                time = 1000 * 60 * 60 * parseInt(set[1].replace("h", ""));
            } else {
                message.channel.send(`${message.author} please specify a time\nExample: v.remind | 10s | school`);
            }
        }
        if(set[2]) {
            message.channel.send(`${message.author} set the reminder for you`);
            setTimeout(() => {
                message.channel.send(`${message.author}, ${set[2]}`);
            }, time);
        } else {
            message.channel.send(`${message.author} please specify a word\nExample: v.remind | 10s | school`);
        }
    }
}