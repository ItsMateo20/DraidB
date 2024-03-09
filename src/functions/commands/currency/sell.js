module.exports = {
    name: `sell`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Sells the user\'s items.',
    helpUsage: '**sell** {@user} {item}',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'



        if (userS.settings[0]["lang"] == 'polish') {
            if (!args[0]) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogłem znaleźć tego przedmiotu, wróć do sklepu i sprawdź, czy wpisałeś właściwy id`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
            if (args[0] == '1' || args[0] == 'laptop') {
                return message.channel.send({
                    embeds: [{
                        title: `Ten item nie jest sprzedawalny!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (args[0] == '2' || args[0] == 'dplush') {
                if (userS.inventory[1]["draidplush"] == 1 || userS.inventory[1]["draidplush"] > 1) {
                    message.channel.send({
                        embeds: [{ author: { text: `${message.author.username}, Udany sprzedasz` }, title: `Sprzedałeś 1 Draid plush i dostałeś 3600${coin}(10 % tax)!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } },]
                    });
                    userS.inventory[0]["currency"] += 3600
                    userS.inventory[1]["draidplush"] -= 1
                    userS.save().catch((err) => client.outputsend("Error", err));
                } else {
                    return message.channel.send({
                        embeds: [{
                            title: `Nie masz Draid miśka żeby sprzedać!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }

            }
        } else if (userS.settings[0]["lang"] == 'english') {
            if (!args[0]) {
                return message.channel.send({
                    embeds: [{
                        title: `Could not find that item, go back to the shop and check that you wrote the right id!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
            if (args[0] == '1' || args[0] == 'laptop') {
                return message.channel.send({
                    embeds: [{
                        title: `This item is not sellable!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (args[0] == '2' || args[0] == 'dplush') {
                if (userS.inventory[1]["draidplush"] == 1 || userS.inventory[1]["draidplush"] > 1) {
                    message.channel.send({
                        embeds: [{ author: { text: `${message.author.username}, Sold successfully` }, title: `You have sold 1 Draid plush and got 3600${coin}(10 % tax)!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                    userS.inventory[0]["currency"] += 3600
                    userS.inventory[1]["draidplush"] -= 1
                    userS.save().catch((err) => client.outputsend("Error", err));
                } else {
                    return message.channel.send({
                        embeds: [{
                            title: `You don't have a Draid plush to sell!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }

            }
        }
    }

};