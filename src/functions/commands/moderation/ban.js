

module.exports = {
    name: `ban`,
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'BanMembers',
    botpermission: ['SendMessages', 'EmbedLinks', 'BanMembers'],

    helpDescription: 'Bans a member from the server.',
    helpUsage: '**ban** {@user} [reason]',
    helpGroup: 'Moderation',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const reasonMSG = args.slice(1).join(' ') || "No reason set.";
        let banningUserID

        if (args[0]) {
            if (!targett) {
                banningUserID = args[0]
            } else if (targett) {
                banningUserID = targett.id
            }
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `There is no such user with that ID, or the user is already banned!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie ma takiego użytkownika z takim ID, lub użytkownik jest już zbanowany!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        const banningUserFind = await message.guild.members.cache.get(banningUserID)

        if (banningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't kick this user because he has Administrator permission`, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (banningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't ban this user because he has a higher role than me`, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę zbanować tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (!banningUserFind.user.bot) {
            const userSS = await user.findOne({ userID: banningUserFind.id });
            if (userSS) {
                if (userSS.settings[0]["lang"] == `english`) {
                    await banningUserFind.send({
                        embeds: [{
                            title: `You have been banned from **\`${message.guild.name}\`**`, description: `Reason: \`${reasonMSG}\` | By: \`${message.author.username}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await banningUserFind.send({
                        embeds: [{
                            title: `Zostałeś zbanowany z **\`${message.guild.name}\`**`, description: `Powód: \`${reasonMSG}\` | Przez: \`${message.author.username}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
            }
        }
        banningUserFind.ban({ reason: reasonMSG }).catch((err) => {
            if (err) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `There was an error banning **\`${banningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wystąpił błąd podczas zbanowania **\`${banningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
        })
        if (userS.settings[0]["lang"] == `english`) {
            return message.channel.send({
                embeds: [{
                    title: `You have banned **\`${banningUserFind.user.username}\`**`, description: `Reason: ${reasonMSG}\``, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        } else if (userS.settings[0]["lang"] == `polish`) {
            return message.channel.send({
                embeds: [{
                    title: `Zbanowałeś **\`${banningUserFind.user.username}\`**`, description: `Powód: \`${reasonMSG}\``, thumbnail: { url: `${banningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        }
    }
};