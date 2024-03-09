module.exports = {
    name: `give`,
    cooldown: 20,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Gives a certain amount of currency or items.',
    helpUsage: '**give** {@user} [item/currency] [amount]',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'

        const userSS = await user.findOne({ userID: target.id });

        const target1 = message.mentions.users.first()
        if (!target1) {
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{
                        title: `Komu chcesz coś dać?`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{
                        title: `Who do you want to give something to?`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }
        if (!args[1]) {
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{
                        title: `Co chcesz tej osobie dać?`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{
                        title: `What do you want to give this person?`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }


        if (args[1] == '2' || args[1] == 'dplush' || args[1] == 'draidplush') {
            if (userS.inventory[1]["draidplush"] > 0) {
                if (userS.settings[0]["lang"] == 'polish') {
                    message.channel.send({
                        embeds: [{ author: { text: `${message.author.username}` }, title: `Dałeś 1 Draidmiśek **\`${target1.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == 'english') {
                    message.channel.send({
                        embeds: [{
                            author: { text: `${message.author.username}` }, title: `You gave 1 Draidplush to **\`${target1.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
                userSS.inventory.set(1, { laptop: userSS.inventory[1]["laptop"], draidplush: userSS.inventory[1]["draidplush"] + 1 });
                userSS.save().catch((err) => client.outputsend("Error", err))
                userS.inventory.set(1, { laptop: userS.inventory[1]["laptop"], draidplush: userS.inventory[1]["draidplush"] - 1 });
                userS.save().catch((err) => client.outputsend("Error", err));
            } else {
                if (userS.settings[0]["lang"] == 'polish') {
                    return message.channel.send({
                        embeds: [{
                            title: `Nie masz Draid miśka żeby dać!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == 'english') {
                    return message.channel.send({
                        embeds: [{
                            title: `You don't have Draidplush to give!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }

        }
    }
};