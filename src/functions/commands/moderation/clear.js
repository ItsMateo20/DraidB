module.exports = {
    name: `clear`,
    aliases: ['cl'],
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'ManageMessages',
    botpermission: ['SendMessages', 'EmbedLinks', 'ManageMessages'],

    helpDescription: 'Clears messages from the channel.',
    helpUsage: '**clear** {amount}',
    helpGroup: 'Moderation',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {


        if (args[0]) {
            if (!isNaN(args[0])) {
                let amount = 0;
                amount = args[0]
                if (amount == 0) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply({
                            embeds: [{
                                title: `you can't clear 0 messages.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply({
                            embeds: [{
                                title: `Nie możesz usunąć 0 wiadomości.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
                if (amount == 1) {
                    amount = 2
                }
                if (amount > 100) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply({
                            embeds: [{
                                title: `Amount cannot be more than 100`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply({
                            embeds: [{
                                title: `Ilość nie może być większa niż 100`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
                message.channel.bulkDelete(amount, true).catch((err) => client.outputsend("Error", err))
                setTimeout(() => {
                    if (userS.settings[0]["lang"] == "english") {
                        message.channel.send({
                            embeds: [{
                                title: `\`${amount}\` Messages deleted :broom:`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).then(msgdeleted => {
                            setTimeout(() => {
                                msgdeleted.delete().catch((err) => client.outputsend("Error", err));
                            }, 5000);
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        message.channel.send({
                            embeds: [{
                                title: `\`${amount}\` Wiadomości usunięte: broom: `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).then(msgdeleted => {
                            setTimeout(() => {
                                msgdeleted.delete().catch((err) => client.outputsend("Error", err));
                            }, 5000);
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }, 2000);
            } else if (isNaN(args[0])) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `The amount has to be a number!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Ilość musi być liczbą!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == "english") {
                return message.reply({
                    embeds: [{
                        title: `You didn't specify the amount of messages to delete!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.reply({
                    embeds: [{
                        title: `Nie podano ilości wiadomości do usunięcia!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }
    }
};