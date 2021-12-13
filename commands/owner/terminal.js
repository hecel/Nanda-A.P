const { owner } = require("../../botconfig/config.json");
const child = require("child_process");

module.exports = {
    name: "terminal",
    aliases: [],
    run: async(bot, message, args) => {
        if(!owner.includes(message.author.id)) return;

        const command = args.slice(1).join(" ");
        if(!command) return message.channel.send("Please specify a command to execute!");

        child.exec(command, (err, res) => {
            if(err) {
                message.channel.send("UPS, FIND A SOME ERROR!");
                console.log(err);
            }
            message.channel.send(res.slice(0, 2000), { code: "js" });
        });
    }
}