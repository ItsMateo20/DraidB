module.exports = {
    name: `warn`,
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'ManageGuild',
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Warns a user.',
    helpUsage: '**warn**',
    helpGroup: 'Moderation',
    helpSubcommands: ['**{@user}** list/clear/[reason]'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        let warningUserID

        if (args[0]) {
            if (!targett) {
                warningUserID = args[0]
            } else if (targett) {
                warningUserID = targett.id
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

        let serveruserSS = await serveruser.findOne({ guildID: message.guild.id, userID: warningUserID });
        let userSS = await user.findOne({ userID: warningUserID });
        let warningUserFind = await message.guild.members.cache.get(warningUserID)

        if (warningUserFind && warningUserFind.user.bot) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `You can't warn bots!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie możesz ostrzec botów!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }


        if (!serveruserSS) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `This user has no warns!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Ta osoba nie ma ostrzeżeń!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }
        if (warningUserID == message.author.id) {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `You can't warn your self!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie możesz siebie ostrzec!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }
        if (args[1] == "list") {
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{ title: `List of warns for **\`${warningUserFind.user.username}\`**`, description: `Warns: \`${serveruserSS.warns[0]["warns"]}\` | Last Reason: \`${serveruserSS.warns[0]["reason"]}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{ title: `Lista ostrzeżeń dla **\`${warningUserFind.user.username}\`**`, description: `Ostrzeżeńia: \`${serveruserSS.warns[0]["warns"]}\` | Powód: \`${serveruserSS.warns[0]["reason"]}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[1] == "clear" || args[1] == "remove") {
            serveruserSS.warns.set(0, { warns: 0, reason: "None" });
            await serveruserSS.save().catch((err) => client.outputsend("Error", err))
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({
                    embeds: [{
                        title: `Warns cleared for **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Ostrzeżenia wyczyszczone dla** \`${warningUserFind.user.username}\`** `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        } else {
            const reasonMSG = args.slice(1).join(' ') || "No reason set"
            serveruserSS.warns.set(0, { warns: serveruserSS.warns[0]["warns"] + 1, reason: reasonMSG });
            serveruserSS.save().catch((err) => client.outputsend("Error", err))
            //warn command id:6
            if (userS.settings[0]["lang"] == `english`) {
                message.channel.send({ embeds: [{ title: `You have warned **\`${warningUserFind.user.username}\`**`, description: `Reason: \`${reasonMSG}\` | Server: \`${message.guild.name}\` | By: \`${message.author.username}\``, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] })
            } else if (userS.settings[0]["lang"] == `polish`) {
                message.channel.send({ embeds: [{ title: `Ostrzegłeś **\`${warningUserFind.user.username}\`**`, description: `Powód: \`${reasonMSG}\` | Serwer: \`${message.guild.name}\` | Przez: \`${message.author.username}\``, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] })
            }
            if (userSS.settings[0]["lang"] == "english") {
                warningUserFind.user.send({ embeds: [{ title: `You have been Warned`, description: `Reason: \`${reasonMSG}\` | Warns: \`${serveruserSS.warns[0]["warns"]}\` | Server: \`${message.guild.name}\` | By: \`${message.author.username}\``, color: 0x3498DB }] }).catch((err) => { })
            } else if (userSS.settings[0]["lang"] == "polish") {
                warningUserFind.user.send({ embeds: [{ title: `Otrzymałeś ostrzeżenie`, description: `Powód: \`${reasonMSG}\` | Ostrzeżeń: \`${serveruserSS.warns[0]["warns"]}\` | Serwer: \`${message.guild.name}\` | Przez: \`${message.author.username}\``, color: 0x3498DB }] }).catch((err) => { })
            }
        }

        if (serveruserSS.warns[0]["warns"] == serverS.warns[0]["warnsamounttier1"]) {
            if (serverS.warns[1]["warnsactiontier1"] == "ban") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }


                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been banned from **\`${message.guild.name}\`** `, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś zbanowany z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.ban({ reason: `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns` }).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error banning **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas banowania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Banned **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Zbanowano **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier1"] == "kick") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been kicked from **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś wyrzucony z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.kick(`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Can't kick **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę wyrzucić **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Kicked **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyrzucono **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier1"] == "mute") {
                const ms = require('ms');
                let timeInMs = ms("10d");
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }


                warningUserFind.timeout(timeInMs, `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error putting **\`${warningUserFind.user.username}\`** in timeout`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas wyciszania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `I have put **\`${warningUserFind.user.username}\`** in timeout`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyciszyłem **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
                if (userSS) {
                    if (userSS.settings[0]["lang"] == `english`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `You have been put in timeout in **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestrap: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    } else if (userSS.settings[0]["lang"] == `polish`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `Zostałeś wyciszony w **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    }
                }
            } else if (serverS.warns[1]["warnsactiontier1"] == "none") return;
        } else if (serveruserSS.warns[0]["warns"] == serverS.warns[0]["warnsamounttier2"]) {
            if (serverS.warns[1]["warnsactiontier2"] == "ban") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been banned from **\`${message.guild.name}\`** `, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś zbanowany z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.ban({ reason: `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns` }).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error banning **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas banowania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Banned **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Zbanowano **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier2"] == "kick") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been kicked from **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś wyrzucony z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.kick(`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Can't kick **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę wyrzucić **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Kicked **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyrzucono **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier2"] == "mute") {
                const ms = require('ms');
                let timeInMs = ms("10d");
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }


                warningUserFind.timeout(timeInMs, `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error putting **\`${warningUserFind.user.username}\`** in timeout`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas wyciszania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `I have put **\`${warningUserFind.user.username}\`** in timeout`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyciszyłem **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
                if (userSS) {
                    if (userSS.settings[0]["lang"] == `english`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `You have been put in timeout in **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestrap: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    } else if (userSS.settings[0]["lang"] == `polish`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `Zostałeś wyciszony w **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    }
                }
            } else if (serverS.warns[1]["warnsactiontier2"] == "none") return;
        } else if (serveruserSS.warns[0]["warns"] == serverS.warns[0]["warnsamounttier3"]) {
            if (serverS.warns[1]["warnsactiontier3"] == "ban") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't ban this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę zbanować tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been banned from **\`${message.guild.name}\`** `, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś zbanowany z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.ban({ reason: `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns` }).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error banning **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas banowania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Banned **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Zbanowano **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Ban za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier3"] == "kick") {
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't kick this user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyrzucić tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (userSS.settings[0]["lang"] == `english`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `You have been kicked from **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                } else if (userSS.settings[0]["lang"] == `polish`) {
                    await warningUserFind.send({
                        embeds: [{
                            title: `Zostałeś wyrzucony z **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => { })
                }
                warningUserFind.kick(`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Can't kick **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę wyrzucić **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Kicked **\`${warningUserFind.user.username}\`**`, description: `Reason: \`Auto-Kick for having ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyrzucono **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Kick za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            } else if (serverS.warns[1]["warnsactiontier3"] == "mute") {
                const ms = require('ms');
                let timeInMs = ms("10d");
                if (warningUserFind.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has Administrator permission`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on uprawnienie Administrator`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }

                if (warningUserFind.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `I can't timeout that user because he has a higher role than me`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie mogę wyciszyć tego użytkownika, ponieważ ma on wyższą rolę niż ja`, thumbnail: { url: `${warningUserFind.user.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }


                warningUserFind.timeout(timeInMs, `Auto-Ban for having ${serveruserSS.warns[0]["warns"]} warns`).catch((err) => {
                    if (err) {
                        if (userS.settings[0]["lang"] == `english`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `There was an error putting **\`${warningUserFind.user.username}\`** in timeout`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == `polish`) {
                            return message.channel.send({
                                embeds: [{
                                    title: `Wystąpił błąd podczas wyciszania **\`${warningUserFind.user.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                })
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `I have put **\`${warningUserFind.user.username}\`** in timeout`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Wyciszyłem **\`${warningUserFind.user.username}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
                if (userSS) {
                    if (userSS.settings[0]["lang"] == `english`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `You have been put in timeout in **\`${message.guild.name}\`**`, description: `Reason: \`Auto-Mute for having  ${serveruserSS.warns[0]["warns"]} warns\` | By: \`${message.author.username}\``, timestrap: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    } else if (userSS.settings[0]["lang"] == `polish`) {
                        await warningUserFind.user.send({
                            embeds: [{
                                title: `Zostałeś wyciszony w **\`${message.guild.name}\`**`, description: `Powód: \`Auto-Mute za posiadanie ${serveruserSS.warns[0]["warns"]} ostrzeżeń\` | Przez: \`${message.author.username}\``, timestamp: new Date(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => { })
                    }
                }
            } else if (serverS.warns[1]["warnsactiontier3"] == "none") return;
        }
    }
}