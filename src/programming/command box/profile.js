module.exports = {
    name: `profile`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'AttachFiles'],
    dev: true,

    helpDescription: `Shows the users profile`,
    helpUsage: `**profile**`,
    helpGroup: `Fun`,
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const userSS = await user.findOne({ userID: target.id });

        return
        message.channel.send({ content: `Loading profile...` }).then(async msg => {

            const Canvas = require('canvas');

            const applyText = (canvas, text) => {
                const ctx = canvas.getContext('2d');

                let fontSize = 40;
                let font
                do {
                    font = `${fontSize -= 15}`;
                } while (ctx.measureText(text).width > canvas.width - 300);
                return font;
            }

            // const roundedBox = (ctx, x, y, width, height, radius, color) => {
            //     ctx.beginPath();
            //     ctx.moveTo(x + radius, y);
            //     ctx.lineTo(x + width - radius, y);
            //     ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            //     ctx.lineTo(x + width, y + height - radius);
            //     ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            //     ctx.lineTo(x + radius, y + height);
            //     ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            //     ctx.lineTo(x, y + radius);
            //     ctx.quadraticCurveTo(x, y, x + radius, y);
            //     ctx.closePath();

            //     ctx.strokeStyle = color;
            //     ctx.strokeRect(x, y, width, height)
            // }

            //roundedBox(context, 250, 140.5, 300, 400, 20, "#ffffff");

            const lang = () => {
                if (userS.settings[0]["lang"] == "english") {
                    if (userSS.settings[0]["lang"] == "english") {
                        return "English"
                    } else if (userSS.settings[0]["lang"] == "polish") {
                        return "Polish"
                    }
                }
            }

            const achievements = (ctx) => {
                let max = 21
                let y = 180
                let x = 270
                let count = 0
                for (let i = 1; i < userSS.achievements.length; i++) {
                    if (userSS.achievements[i]["finished"] == true) {
                        max -= 1
                        if (max !== 0) {
                            count += 1
                            if (count == 14 || count == 24) {
                                if (count == 14) {
                                    x = 430
                                    y = 180
                                } else if (count == 24) {
                                    x = 590
                                    y = 180
                                }
                            }

                            if (count < 14) {
                                if (count !== 1) {
                                    y += 30
                                }
                                ctx.font = `20px sans-serif`;
                                ctx.fillStyle = '#676b8f';
                                ctx.fillText(`${userSS.achievements[i]["name"]}`, x, y);
                                const tick = new Canvas.Image()
                                tick.src = "./src/assets/images/tickprofile.png"
                                tick.onLoad = function () {
                                    ctx.drawImage(tick, x - 20, y - 10, 20, 20)
                                }
                            } else if (count < 24) {
                                if (count !== 14) {
                                    y += 30
                                }
                                ctx.font = `20px sans-serif`;
                                ctx.fillStyle = '#676b8f';
                                ctx.fillText(`${userSS.achievements[i]["name"]}`, x, y);
                                const tick = new Canvas.Image()
                                tick.src = "./src/assets/images/tickprofile.png"
                                tick.onLoad = function () {
                                    ctx.drawImage(tick, x - 20, y - 10, 20, 20)
                                }
                            } else if (count < 34) {
                                if (count !== 24) {
                                    y += 30
                                }
                                ctx.font = `20px sans-serif`;
                                ctx.fillStyle = '#676b8f';
                                ctx.fillText(`${userSS.achievements[i]["name"]}`, x, y);
                                const tick = new Canvas.Image()
                                tick.src = "./src/assets/images/tickprofile.png"
                                tick.onLoad = function () {
                                    ctx.drawImage(tick, x - 20, y - 10, 20, 20)
                                }
                            }
                        }
                    }
                }
            }

            const canvas = Canvas.createCanvas(900, 590);
            const context = canvas.getContext('2d');

            const { readFile } = require('fs/promises');
            const background = await readFile('./src/assets/images/profile.png');
            const backgroundImage = new Canvas.Image();
            backgroundImage.src = background;
            context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            context.strokeStyle = '#221b29';
            context.strokeRect(0, 0, canvas.width, canvas.height);

            if (userS.settings[0]["lang"] == "english") {
                context.font = applyText(canvas, `${target.username}'s Profile`) + "px sans-serif"
                context.fillStyle = '#ffffff';
                context.fillText(`${target.username}'s Profile`, 130, 40.5);
                context.font = `20px sans-serif`;
                context.fillStyle = '#ffffff';
                context.fillText(`Acc created: ${target.createdAt.toLocaleString()}`, 130, 60.5);
                context.font = `20px sans-serif`;
                context.fillStyle = '#ffffff';
                context.fillText(`Speaks: ${lang()}`, 130, 80.5);

                context.font = `25px sans-serif`;
                context.fillStyle = '#676b8f';
                context.fillText(`Commands: ${userSS.profile[0]["commandsused"]}`, 10, 240.5);

                context.font = `25px sans-serif`;
                context.fillStyle = '#676b8f';
                context.fillText(`Messages: ${userSS.profile[0]["messagessent"]}`, 10, 270.5);

                context.font = `25px sans-serif`;
                context.fillStyle = '#676b8f';
                context.fillText(`Currency: ${userSS.inventory[0]["currency"]}`, 10, 210.5);



                achievements(context)
            }
            // else if (userS.settings[0]["lang"] == "polish") {
            //     context.font = applyText(canvas, `Profil ${message.author.username}`);
            //     context.fillStyle = '#ffffff';
            //     context.fillText(`Profil ${message.author.username}`, 130, 62.5);
            // }



            context.beginPath();
            context.arc(62.5, 62.5, 50, 0, Math.PI * 2, true);
            context.closePath();
            context.clip();

            const { request } = require('undici')
            const { body } = await request(target.displayAvatarURL({ format: 'jpg' }));
            const avatar = new Canvas.Image();
            avatar.src = Buffer.from(await body.arrayBuffer());
            context.drawImage(avatar, 10, 10, 104, 104);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer('image/png'), 'profile-image.png');

            await msg.edit({ files: [attachment] });
        })
    }
};