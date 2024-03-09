

module.exports = {
    name: `kick`,
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'KickMembers',
    botpermission: ['SendMessages', 'EmbedLinks', 'KickMembers'],

    helpDescription: 'Kicks a member from the server.',
    helpUsage: '**kick** {@user} [reason]',
    helpGroup: 'Moderation',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const reasonMSG = args.slice(1).join(' ') || "No reason set.";
        let kickingUserID

        if (args[0]) {
            if (!targett) {
                kickingUserID = args[0]
            } else if (targett) {
                kickingUserID = targett.id
            }
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `There is no such user with that ID, or the user is not in the server!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie ma takiego użytkownika z takim ID, lub użytkownik nie jest na serwerze!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        const kickingUserFind = await message.guild.members.cache.get(kickingUserID)

        if (kickingUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't kick this user because he has Administrator permission`, thumbnail: { url: `${kickingUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${kickingUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (kickingUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't kick this user because he has a higher role than me`, thumbnail: { url: `${kickingUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${kickingUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (!kickingUserFind.user.bot) {
            const userSS = await user.findOne({ userID: kickingUserFind.id });
            if (userSS) {
                if (userSS.settings[0]["lang"] == `english`) {
                    await kickingUserFind.send({
                        embeds: [{
                            title: `You have been kicked from **\`${message.guild.name}\`**`, description: `Reason: \`${reasonMSG}\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await kickingUserFind.send({
                        embeds: [{
                            title: `Zostałeś(aś) wyrzucony z **\`${message.guild.name}\`**`, description: `Powód: \`${reasonMSG}\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
            }
        }
        kickingUserFind.kick(reasonMSG).catch((err) => {
            if (err) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `There was an error kicking **\`${kickingUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wystąpił błąd podczas wyrzucania **\`${kickingUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
        })
        if (userS.settings[0]["lang"] == `english`) {
            return message.channel.send({
                embeds: [{
                    title: `You have kicked **\`${kickingUserFind.user.username}\`**`, description: `Reason: \`${reasonMSG}\``, thumbnail: { url: `${kickingUserFind.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        } else if (userS.settings[0]["lang"] == `polish`) {
            return message.channel.send({
                embeds: [{
                    title: `Wyrzuciłeś **\`${kickingUserFind.user.username}\`**`, description: `Powód: \`${reasonMSG}\``, thumbnail: { url: `${kickingUserFind.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        }
    }
};

