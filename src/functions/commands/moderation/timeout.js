module.exports = {
    name: `timeout`,
    aliases: [`mute`],
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'ModerateMembers',
    botpermission: ['SendMessages', 'EmbedLinks', 'ModerateMembers'],

    helpDescription: 'Mutes a member in the server.',
    helpUsage: '**timeout** {@user} {time} [reason]',
    helpGroup: 'Moderation',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const ms = require('ms');
        const reasonMSG = args.slice(2).join(' ') || "No reason set.";
        let timingoutUserID


        if (args[0]) {
            if (!targett) {
                timingoutUserID = args[0]
            } else if (targett) {
                timingoutUserID = targett.id
            }
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `There is no such user with that ID`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie ma takiego użytkownika z tym ID`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        const timingoutUserFind = await message.guild.members.cache.get(timingoutUserID)

        if (timingoutUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't timeout that user because he has Administrator permission`, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (timingoutUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `I can't timeout that user because he has a higher role than me`, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (timingoutUserFind.communicationDisabledUntilTimestamp !== null && timingoutUserFind.communicationDisabledUntilTimestamp > new Date()) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `**\`${timingoutUserFind.user.username}\`** is already in timeout`, description: `Reason: \`${reasonMSG}\``, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `**\`${timingoutUserFind.user.username}\`** jest już wyciszony`, description: `Powód: \`${reasonMSG}\``, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        if (!args[1]) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `Invalid time format or you didn\'t put a time`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nieprawidłowy format czasu lub nie podałeś czasu`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }


        let timeInMs = ms(args[1])

        if (!timingoutUserFind.user.bot) {
            const userSS = await user.findOne({ userID: timingoutUserFind.id });
            if (userSS) {
                if (userSS.settings[0]["lang"] == `english`) {
                    await timingoutUserFind.send({
                        embeds: [{
                            title: `You have been put in timeout in **\`${message.guild.name}\`**`, description: `Reason: \`${reasonMSG}\` | By: \`${message.author.username}\``, timestrap: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await timingoutUserFind.send({
                        embeds: [{
                            title: `Zostałeś wyciszony w **\`${message.guild.name}\`**`, description: `Powód: \`${reasonMSG}\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
            }
        }
        timingoutUserFind.timeout(timeInMs, reasonMSG).catch((err) => {
            if (err) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `There was an error putting **\`${timingoutUserFind.user.username}\`** in timeout`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wystąpił błąd podczas wyciszania **\`${timingoutUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
        })
        if (userS.settings[0]["lang"] == `english`) {
            return message.channel.send({
                embeds: [{
                    title: `You have put **\`${timingoutUserFind.user.username}\`** in timeout`, description: `Reason: \`${reasonMSG}\``, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        } else if (userS.settings[0]["lang"] == `polish`) {
            return message.channel.send({
                embeds: [{
                    title: `Wyciszyłeś **\`${timingoutUserFind.user.username}\`**`, description: `Powód: \`${reasonMSG}\``, thumbnail: { url: `${timingoutUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err))
        }
    }
};

