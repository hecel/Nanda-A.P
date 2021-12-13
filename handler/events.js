const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii('events');
table.setHeading('Events', 'Load status');

module.exports = (bot, Discord) => {
  
    readdirSync(`${process.cwd()}/events/`).forEach(dir => {
      
        const events = readdirSync(`${process.cwd()}/events/${dir}/`).filter(file => file.endsWith(".js"));
        
        for (let file of events) {
            let pull = require(`${process.cwd()}/events/${dir}/${file}`);

            if (pull.name) {
                bot.events.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name.`);
                continue;
            }
        }
    });

    console.log(table.toString());
}