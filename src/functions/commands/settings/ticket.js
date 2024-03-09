module.exports = {
    name: `ticket`,
    aliases: ['tic'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'AttachFiles', 'UseEmojis', 'ManageMessages', 'ManageChannels'],

    helpDescription: 'Creates a ticket channel.',
    helpUsage: '**ticket**',
    helpGroup: 'Settings',
    helpSubcommands: ['**set** {role/channel} {@role/#channel/id} (Manage Server)', '**claim/unclaim** (Manage Server)', '**close**', '**reset** (Manage Server)'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {


        if (args[0] == 'set') {
            if (args[1] == 'channel') {
                const channel = message.mentions.channels.first().id || args[2]
                if (!message.member.permissions.has("ManageGuild")) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{
                                title: `You do not have permission to use ticket!`, fields: [{ name: `Missing permissions:`, value: `Manage Server` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie masz uprawnień do używania ticket!`, fields: [{ name: `Brak uprawnień:`, value: `ManageGuild` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }
                if (!channel) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `There is no such channel with that ID!`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie ma takiego kanału z takim ID`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
                serverS.tickets.set(0, { channel: channel, channelTF: true, role: serverS.tickets[0]["role"], roleTF: serverS.tickets[0]["roleTF"] })
                serverS.save().catch((err) => client.outputsend("Error", err))
                if (userS.settings[0]["lang"] === "english") {
                    message.channel.send({
                        embeds: [{ description: `Support channel set to <#${serverS.tickets[0]["channel"]}>`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] === "polish") {
                    message.channel.send({ embeds: [{ description: `Support kanał ustawiony na < #${serverS.tickets[0]["channel"]} > `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
                }
            } else if (args[1] == 'role') {
                const role = message.mentions.roles.first().id || args[2]
                if (!message.member.permissions.has("ManageGuild")) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{
                                title: `You do not have permission to use ticket!`, fields: [{ name: `Missing permissions:`, value: `Manage Server` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie masz uprawnień do używania ticket!`, fields: [{ name: `Brak uprawnień:`, value: `Manage Server` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }
                if (!role) {
                    if (userS.settings[0]["lang"] == `english`) {
                        return message.channel.send({
                            embeds: [{
                                title: `There is no such role with that ID!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == `polish`) {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie ma takiej roli z tym ID!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                }
                serverS.tickets.set(0, { channel: serverS.tickets[0]["channel"], channelTF: serverS.tickets[0]["channelTF"], role: role, roleTF: true })
                serverS.save().catch((err) => client.outputsend("Error", err));
                if (userS.settings[0]["lang"] === "english") {
                    message.channel.send({
                        embeds: [{ description: `Support role set to <@&${serverS.tickets[0]["role"]}>`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] === "polish") {
                    message.channel.send({ embeds: [{ description: `Support rola ustawiona na <@& ${serverS.tickets[0]["role"]}> `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
                }
            }
        } else if (args[0] == 'claim') {
            const userSS = await user.findOne({ userID: message.channel.topic });
            if (!message.member.roles.cache.has(serverS.tickets[0]["role"])) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.channel.send({
                        embeds: [{
                            title: `Missing role`, description: `You are missing the role <@&${serverS.tickets[0]["role"]}>`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.channel.send({
                        embeds: [{
                            title: `Brakujące role`, description: `Brakuje Ci roli <@& ${serverS.tickets[0]["role"]}> `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            if (message.channel.topic !== userSS.userID) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `This is not a support ticket channel!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `To nie jest kanał supportu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            if (userSS.tickets[0]["claimed"] !== "None") {
                if (userS.settings[0]["lang"] == `english`) {
                    message.channel.send({
                        embeds: [{
                            title: `This ticket is already claimed!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                } else if (userS.settings[0]["lang"] == `polish`) {
                    message.channel.send({
                        embeds: [{
                            title: `Ten kanał jest zajęty!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                }
                setTimeout(() => {
                    message.delete().catch((err) => {
                        if (err) throw (err)
                    })
                }, 2500);
                return;
            }
            userSS.tickets.set(0, { channel: message.channel.id, ticketby: message.channel.topic, claimed: message.author.id, ticket: true })
            userSS.save().catch((err) => client.outputsend("Error", err));
            userS.tickets.set(0, { channel: message.channel.id, ticketby: message.channel.topic, claimed: message.author.id, ticket: true })
            userS.save().catch((err) => client.outputsend("Error", err))
            message.channel.setName(`claimed_ticket-${client.users.cache.get(userSS.userID).username}-${message.author.username}`)
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `This ticket is now claimed by **\`${message.author.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Ten kanal jest teraz zajęty przez **\`${message.author.username}\`**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0] == 'unclaim') {
            const userSS = await user.findOne({ userID: message.channel.topic });
            if (message.channel.topic !== userSS.userID) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `This is not a support ticket channel!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `To nie jest kanał supportu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }

                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            if (userSS.tickets[0]["claimed"] == "None") {
                if (userS.settings[0]["lang"] == `english`) {
                    message.channel.send({
                        embeds: [{
                            title: `This ticket is already unclaimed!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                } else if (userS.settings[0]["lang"] == `polish`) {
                    message.channel.send({
                        embeds: [{
                            title: `Ten kanał jest już wolny!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                }
                setTimeout(() => {
                    message.delete().catch((err) => {
                        if (err) throw (err)
                    })
                }, 2500);
                return;
            }
            userSS.tickets.set(0, { channel: message.channel.id, ticketby: message.channel.topic, claimed: "None", ticket: true })
            userSS.save().catch((err) => client.outputsend("Error", err));
            userS.tickets.set(0, { channel: message.channel.id, ticketby: message.channel.topic, claimed: "None", ticket: true })
            userS.save().catch((err) => client.outputsend("Error", err))
            message.channel.setName(`unclaimed_ticket-${client.users.cache.get(userSS.userID).username}`)
            if (userS.settings[0]["lang"] == `english`) {
                return message.channel.send({
                    embeds: [{
                        title: `This ticket is now unclaimed!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == `polish`) {
                return message.channel.send({
                    embeds: [{
                        title: `Ten kanał jest teraz wolny!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0] == 'close') {
            const userSS = await user.findOne({ userID: message.channel.topic });
            if (message.channel.topic !== userSS.userID) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `This is not a support ticket channel!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `To nie jest kanał supportu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            const userSSS = await user.findOne({ userID: userSS.tickets[0]["claimed"] });
            if (userSSS) {
                userSSS.tickets.set(0, { channel: "None", ticketby: "None", claimed: "None", ticket: false })
                userSSS.save().catch((err) => client.outputsend("Error", err));
            }
            userSS.tickets.set(0, { channel: "None", ticketby: "None", claimed: "None", ticket: false })
            userSS.save().catch((err) => client.outputsend("Error", err));


            if (userS.settings[0]["lang"] === "english") {
                message.channel.send("Ticket closing in 5s :alarm_clock:");
            } else if (userS.settings[0]["lang"] === "polish") {
                message.channel.send("Ticket zamknie sie w 5s :alarm_clock:");
            }
            setTimeout(function () {
                message.channel.delete().catch((error) => {
                    if (error) throw error;
                });
            }, 5000);
        } else if (args[0] == 'reset') {
            if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild)) {
                if (userS.settings[0]["lang"] == 'english') {
                    return message.channel.send({
                        embeds: [{
                            title: `You do not have permission to use ticket!`, fields: [{ name: `Missing permissions:`, value: `Manage Server` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == 'polish') {
                    return message.channel.send({
                        embeds: [{
                            title: `Nie masz uprawnień do używania ticket!`, fields: [{ name: `Brak uprawnień:`, value: `Manage Server` }], color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            serverS.tickets.set(0, { channel: "None", channelTF: false, role: "None", roleTF: false });
            serverS.save().catch((err) => client.outputsend("Error", err))

            return message.channel.send("Ticket setup reset!");
        } else {
            if (serverS.tickets[0]["channelTF"] == false) {
                if (userS.settings[0]["lang"] === "english") {
                    return message.channel.send({
                        embeds: [{
                            title: `Before you make a ticket you have to set the channel that people will be able to send this command`, description: `use ${serverS.settings[3]["prefix"]}ticket set channel [#support channel]`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] === "polish") {
                    return message.channel.send({
                        embeds: [{
                            title: `Zanim zrobisz ticket, musisz ustawić kanał, na który ludzie będą mogli wysyłać tą komęde`, description: `uzyj ${serverS.settings[3]["prefix"]}ticket set channel [#kanał supportu]`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            if (serverS.tickets[0]["roleTF"] == false) {
                if (userS.settings[0]["lang"] === "english") {
                    return message.channel.send({
                        embeds: [{
                            title: `Before you can make a ticket you have to set the role that the users that have the role will be able to see the support ticket`, description: `use ${serverS.settings[3]["prefix"]}ticket set role [@role]`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] === "polish") {
                    return message.channel.send({
                        embeds: [{
                            title: `Zanim będziesz mógł zrobić ticket, musisz ustawić rolę, aby użytkownicy, którzy mają tę rolę, mogli zobaczyć ten ticket`, description: `uzyj ${serverS.settings[3]["prefix"]}ticket set role [@rola]`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            }
            if (userS.tickets[0]["ticket"] == true) {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.channel.send({
                        embeds: [{
                            title: `You already have a ticket open`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.channel.send({
                        embeds: [{
                            title: `Masz już otwarty bilet`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                }
                setTimeout(() => {
                    message.delete().catch((err) => {
                        if (err) throw (err)
                    })
                }, 2500);
            }
            if (message.channel.id === `${serverS.tickets[0]["channel"]}`) {
                if (!args[0]) {
                    if (userS.settings[0]["lang"] === "english") {
                        return message.channel.send({
                            embeds: [{
                                title: `You didn't specify a description`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).then((msg) => {
                            setTimeout(() => {
                                msg.delete().catch((err) => client.outputsend("Error", err));
                            }, 10000);
                        })
                    } else if (userS.settings[0]["lang"] === "polish") {
                        return message.channel.send({
                            embeds: [{
                                title: `Nie podano opisu`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).then((msg) => {
                            setTimeout(() => {
                                msg.delete().catch((err) => client.outputsend("Error", err));
                            }, 10000);
                        })
                    }
                } else {
                    message.guild.channels.create({
                        name: `unclaimed_ticket-${message.author.username}`,
                        reason: `${message.author.username} has made a support ticket!`,
                        type: Discord.ChannelType.GuildText,
                        permissionOverwrites: [
                            {
                                id: message.author.id,
                                allow: [Discord.PermissionsBitField.Flags.ViewChannel, Discord.PermissionsBitField.Flags.SendMessages, Discord.PermissionsBitField.Flags.AttachFiles],
                            },
                            {
                                id: client.guilds.cache.get(message.guild.id).roles.everyone.id,
                                deny: [Discord.PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: `${serverS.tickets[0]["role"]}`,
                                allow: [Discord.PermissionsBitField.Flags.ViewChannel],
                            },
                        ],
                    }).then((channel) => {
                        if (!channel.topic) {
                            channel.setTopic(message.author.id)
                        }
                        userS.tickets.set(0, { channel: channel.id, ticketby: message.author.id, claimed: "None", ticket: true })
                        userS.save().catch((err) => client.outputsend("Error", err));
                        if (userS.settings[0]["lang"] === "english") {
                            channel.send({
                                content: `||<@&${serverS.tickets[0]["role"]}>|| ${message.author}`, embeds: [{ title: `Support will be here soon!\n\nProblem: \`${args.slice(0).join(" ")}\``, color: 0x3498DB, footer: { text: `If this support ticket was a mistake use the command ",ticket close"`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] === "polish") {
                            channel.send({
                                content: `||<@&${serverS.tickets[0]["role"]}>|| ${message.author}`, embeds: [{ title: `Pomoc wkrótce tutaj będzie!\n\nProblem: \`${args.slice(0).join(" ")}\``, color: 0x3498DB, footer: { text: `Jeśli ten bilet był błędnym zgłoszeniem, użyj komendy ",ticket close"`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    });
                }
            }
            if (message.channel.id !== `${serverS.tickets[0]["channel"]}`) {
                if (userS.settings[0]["lang"] === "english") {
                    message.channel.send({
                        embeds: [{ description: `You have to be in <#${serverS.tickets[0]["channel"]}> to use this command!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                } else if (userS.settings[0]["lang"] === "polish") {
                    message.channel.send({ embeds: [{ description: `Musisz być w <#${serverS.tickets[0]["channel"]}> aby uzyć tą komęde!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err)).then((message) => {
                        setTimeout(() => {
                            message.delete().catch((err) => {
                                if (err) throw (err)
                            })
                        }, 3000);
                    })
                }
                setTimeout(() => {
                    message.delete().catch((err) => {
                        if (err) throw (err)
                    })
                }, 2500);
            }
        }
    }
};