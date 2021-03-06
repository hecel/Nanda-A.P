const { Client, Message, MessageEmbed } = require('discord.js');
const { loadImage, createCanvas } = require("canvas");
const request = require("node-superfetch");

module.exports = {
    name: 'fish-eye',
    aliases: ["eye"],
    description: 'idk what i say',
    /**
    * @param {Client} bot
    * @param {Message} message
    * @param {String[]} args
    */
    run: async(bot, message, args) => {
        let attachments = message.attachments.array();
        if(attachments.length === 0) return message.channel.send("Please upload some image!");
        if(attachments.length > 1) return message.channel.send("I only can process one image at one time!");
        
        let level = args[1] || 50;
        //  if(!level) return message.channel.send("Please input the level to fish-eye image!, Example: **1, 25, 40, 100, or etc**");

        try {
            message.channel.startTyping(true);

            const { body } = await request.get(attachments[0].url);
            const data = await loadImage(body);
            const canvas = createCanvas(data.width, data.height);
            const ctx = canvas.getContext("2d");

            await ctx.drawImage(data, 0, 0);
            await fishEye(ctx, level, 0, 0, data.width, data.height);
            const attachment = canvas.toBuffer();
            await message.channel.stopTyping(true);

            if(Buffer.byteLength(attachment) > 8e+6) return message.channel.send("This file is way too big for me to upload it.");
            return message.channel.send({ files: [{attachment, name: "fish-eye.png"}]});
        } catch (error) {
            await message.channel.stopTyping(true);
            await message.channel.send(`An error occured: **${error}**`);
            throw error;
        }
    }
}

async function fishEye(ctx, level, x, y, width, height) {
    const frame = ctx.getImageData(x, y, width, height);
    const source = new Uint8Array(frame.data);

    for (let i = 0; i < frame.data.length; i += 4) {
        const sx = (i / 4) % frame.width;
        const sy = Math.floor(i / 4 / frame.width);

        const dx = Math.floor(frame.width / 2) - sx;
        const dy = Math.floor(frame.height / 2) - sy;

        const dist = Math.sqrt((dx * dx) + (dy * dy));

        const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)));
        const y2 = Math.round((frame.height / 2) - (dy * Math.sin(dist / (level * Math.PI) / 2)));
        const i2 = ((y2 * frame.width) + x2) * 4;

        frame.data[i] = source[i2];
        frame.data[i + 1] = source[i2 + 1];
        frame.data[i + 2] = source[i2 + 2];
        frame.data[i + 3] = source[i2 + 3];
    }

    ctx.putImageData(frame, x, y);
    return ctx;
}