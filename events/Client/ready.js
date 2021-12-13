const timezone = require("moment-timezone");
const bot = require("../../index").bot;
const { prefix, developer } = require("../../botconfig/config.json");

bot.on("ready", () => {
    console.log("bot sudah online");
    
    bot.user.setStatus("online");

    function randomStatus() {
        let s = [
          `My prefix ${prefix}`,
          `creator: ${developer}`,
          `Time: ${timezone().tz("Asia/Jakarta").format("⏰ HH:mm [WIB]") + " "}`,
          `${bot.users.cache.size} User!`,
          `${bot.guilds.cache.size} Server!`,
          `${bot.channels.cache.size} Channel!`
        ];
        bot.user.setActivity({
          url: "https://www.youtube.com/watch?v=iydD0OxoaH0",
          name: s[Math.floor(Math.random() * s.length)],
          type: "WATCHING"
        });
      }
      setInterval(randomStatus, 8000);
    
        // function time() {
        //   let waktu = bot.channels.cache.get("878427894332936203");
        //   waktu.setName(`${timezone().tz("Asia/Jakarta").format("⏰ HH:mm [WIB]") + " "}`);
        //   let waktu1 = bot.channels.cache.get("878430437884723210");
        //   waktu1.setName(`${timezone().tz("Asia/Irkutsk").format("⏰ HH:mm [WIT]") + " "}`);
        //   let waktu2 = bot.channels.cache.get("878430913548124270");
        //   waktu2.setName(`${timezone().tz("Asia/Jayapura").format("⏰ HH:mm [WITA]") + " "}`);
        // }
        // setInterval(time, 10000);
});