

module.exports = {
    name: `unban`,
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'BanMembers',
    botpermission: ['SendMessages', 'EmbedLinks', 'BanMembers'],

    helpDescription: 'Unbans a member from the server.',
    helpUsage: '**unban** {userID} [reason]',
    helpGroup: 'Moderation',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const reasonMSG = args.slice(1).join(' ') || "No reason set.";
        let unbanningUserID

        if (args[0]) {
            unbanningUserID = args[0]
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `There is no such user with that ID or that user is not banned!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie ma takiego użytkownika z takim ID lub użytkownik nie jest zbanowany!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        const banFetch = await message.guild.bans.fetch()
        if (!banFetch.find(user => user.user.id === unbanningUserID)) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `There is no such user banned with that ID`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie ma takiego zbanowanego użytkownika z tym ID`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }
        message.guild.members.unban(unbanningUserID, reasonMSG).catch((err) => {
            if (err) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `There was an error unbanning **\`${unbanningUserID}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wystąpił błąd podczas unbanowania **\`${unbanningUserID}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
        })
        if (userS.settings[0]["lang"] == `english`) {
            return message.channel.send({
                embeds: [{
                    title: `You have unbanned **\`${unbanningUserID}\`**`, description: `Reason: \`${reasonMSG}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        } else if (userS.settings[0]["lang"] == `polish`) {
            return message.channel.send({
                embeds: [{
                    title: `Odbanowałeś **\`${unbanningUserID}\`**`, description: `Powód: \`${reasonMSG}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        }
    }
};