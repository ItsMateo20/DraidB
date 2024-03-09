module.exports = {
    name: `buy`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Buy items from the shop.',
    helpUsage: '**buy** [item ID]',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'

        const amount = userS.inventory[0]["currency"];

        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogłem znaleźć tego przedmiotu, wróć do sklepu i sprawdź, czy wpisałeś właściwy id`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{
                        title: `Could not find that item in the shop, go to the shop and check if you typed the right id`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0]) {
            //buy command id:2
            if (args[0] == '1' || args[0] == 'laptop') {
                if (userS.inventory[1]["laptop"] == 1) {
                    if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie możesz kupić więcej tego itemu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{
                                title: `You can't buy more of this item!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                } else {
                    if (amount > 150 || amount == 150) {
                        if (userS.settings[0]["lang"] == 'polish') {
                            message.channel.send({
                                embeds: [{ author: { text: `${message.author.username}, Udany zakup` }, title: `Kupiłeś 1 laptop i zapłaciłeś 150${coin}!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == 'english') {
                            message.channel.send({
                                embeds: [{ author: { text: `${message.author.username}, Successful purchase` }, title: `You bought 1 laptop and paid 150${coin}!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                        userS.inventory.set(0, { currency: userS.inventory[0]["currency"] - 150 });
                        userS.inventory.set(1, { laptop: 1, draidplush: userS.inventory[1]["draidplush"] });
                        userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: 12, buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                    } else {
                        return message.channel.send({
                            embeds: [{ description: `Twoje konto: \n > Money: ${userS.inventory[0]["currency"]}${coin} \n\nNie masz tyle kasy żeby to kupić!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
            } else if (args[0] == '2' || args[0] == 'dplush') {
                if (amount > 4000 || amount == 4000) {
                    if (userS.settings[0]["lang"] == 'polish') {
                        message.channel.send({
                            embeds: [{ author: { text: `${message.author.username}, Udany zakup` }, title: `Kupiłeś 1 Draid plush i zapłaciłeś 4000${coin}!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } },]
                        });
                    } else if (userS.settings[0]["lang"] == 'english') {
                        message.channel.send({
                            embeds: [{ author: { text: `${message.author.username}, Successful purchase` }, title: `You bought 1 Draid plush and paid 4000${coin}!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } },]
                        });
                    }
                    userS.inventory.set(0, { currency: userS.inventory[0]["currency"] - 4000 });
                    userS.inventory.set(1, { laptop: userS.inventory[1]["laptop"], draidplush: userS.inventory[1]["draidplush"] + 1 });
                    userS.save().catch((err) => client.outputsend("Error", err));
                } else {
                    if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({ embeds: [{ description: `Twoje konto: \n > Money: ${userS.inventory[0]["currency"]}${coin} \n\nNie masz tyle kasy żeby to kupić!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{ description: `Your account: \n > Money: ${userS.inventory[0]["currency"]}${coin} \n\nYou do not have enough money to buy that!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
            }
        }
    }

};