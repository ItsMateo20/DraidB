module.exports = {
    name: `changelog`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'To allow users the following changes added towards the bot and what has happened to it.',
    helpUsage: '**changelog**',
    helpGroup: 'Other',
    helpSubcommands: ['**set** title {title (text)} {{Devs only}}', '**set** desc/description {1-5 (line)} {description (text)} {{Devs only}}', '**confirm** {{Devs only}}', '**preview** {{Devs only}}'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const dateformat = require(`date-and-time`);

        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'english') {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Changelog - pg 1")
                    .setDescription("Check what changed about the bot")
                    .addFields(
                        { name: "Last update", value: `${draidS.changelog[0]["lastedited"]}` },
                        { name: `${draidS.changelog[1]["Title"]} ||ID: 1||`, value: `\`${draidS.changelog[1]["Description1"]}\n${draidS.changelog[1]["Description2"]}\n${draidS.changelog[1]["Description3"]}\n${draidS.changelog[1]["Description4"]}\n${draidS.changelog[1]["Description5"]}\`` },
                        { name: `${draidS.changelog[2]["Title"]} ||ID: 2||`, value: `\`${draidS.changelog[2]["Description1"]}\n${draidS.changelog[2]["Description2"]}\n${draidS.changelog[2]["Description3"]}\n${draidS.changelog[2]["Description4"]}\n${draidS.changelog[2]["Description5"]}\`` },
                        { name: `${draidS.changelog[3]["Title"]} ||ID: 3||`, value: `\`${draidS.changelog[3]["Description1"]}\n${draidS.changelog[3]["Description2"]}\n${draidS.changelog[3]["Description3"]}\n${draidS.changelog[3]["Description4"]}\n${draidS.changelog[3]["Description5"]}\`` },
                    )
                    .setFooter({ text: "Showing last 6 updates" })
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Changelog - pg 2")
                    .setDescription("Check what changed about the bot")
                    .addFields(
                        { name: "Last update", value: `${draidS.changelog[0]["lastedited"]}` },
                        { name: `${draidS.changelog[4]["Title"]} ||ID: 4||`, value: `\`${draidS.changelog[4]["Description1"]}\n${draidS.changelog[4]["Description2"]}\n${draidS.changelog[4]["Description3"]}\n${draidS.changelog[4]["Description4"]}\n${draidS.changelog[4]["Description5"]}\`` },
                        { name: `${draidS.changelog[5]["Title"]} ||ID: 5||`, value: `\`${draidS.changelog[5]["Description1"]}\n${draidS.changelog[5]["Description2"]}\n${draidS.changelog[5]["Description3"]}\n${draidS.changelog[5]["Description4"]}\n${draidS.changelog[5]["Description5"]}\`` },
                        { name: `${draidS.changelog[6]["Title"]} ||ID: 6||`, value: `\`${draidS.changelog[6]["Description1"]}\n${draidS.changelog[6]["Description2"]}\n${draidS.changelog[6]["Description3"]}\n${draidS.changelog[6]["Description4"]}\n${draidS.changelog[6]["Description5"]}\`` },
                    )
                    .setFooter({ text: "Showing last 6 updates" })
                    .setColor(0x3498DB))

                const getRow = (id) => {
                    const row = new Discord.ActionRowBuilder()
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('prev_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('◀')
                            .setDisabled(pages[id] === 0)
                    )
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('next_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('▶')
                            .setDisabled(pages[id] === embeds.length - 1)
                    )
                    return row
                }

                const id = message.author.id
                pages[id] = pages[id] || 0

                const embed = embeds[pages[id]]
                let reply = message | undefined
                let collector

                const filter = (i) => i.user.id === message.author.id
                const time = 1000 * 60 * 5

                reply = await message.reply({
                    embeds: [embed],
                    components: [getRow(id)]
                })

                collector = reply.createMessageComponentCollector({ filter, time })

                collector.on('collect', async (btnInt) => {
                    if (!btnInt) return;
                    btnInt.deferUpdate()
                    if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") return;

                    if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                        --pages[id]
                    } else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
                        ++pages[id]
                    }

                    reply.edit({
                        embeds: [embeds[pages[id]]],
                        components: [getRow(id)]
                    })

                })
            } else if (userS.settings[0]["lang"] == 'polish') {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Changelog - str 1")
                    .setDescription("Sprawdź co zmieniło się o botcie")
                    .addFields(
                        { name: "Ostatnia aktualizacja", value: `${draidS.changelog[0]["lastedited"]}` },
                        { name: `${draidS.changelog[1]["Title"]} ||ID: 1||`, value: `\`${draidS.changelog[1]["Description1"]}\n${draidS.changelog[1]["Description2"]}\n${draidS.changelog[1]["Description3"]}\n${draidS.changelog[1]["Description4"]}\n${draidS.changelog[1]["Description5"]}\`` },
                        { name: `${draidS.changelog[2]["Title"]} ||ID: 2||`, value: `\`${draidS.changelog[2]["Description1"]}\n${draidS.changelog[2]["Description2"]}\n${draidS.changelog[2]["Description3"]}\n${draidS.changelog[2]["Description4"]}\n${draidS.changelog[2]["Description5"]}\`` },
                        { name: `${draidS.changelog[3]["Title"]} ||ID: 3||`, value: `\`${draidS.changelog[3]["Description1"]}\n${draidS.changelog[3]["Description2"]}\n${draidS.changelog[3]["Description3"]}\n${draidS.changelog[3]["Description4"]}\n${draidS.changelog[3]["Description5"]}\`` },
                    )
                    .setFooter({ text: "Pokazuje ostatnie 6 aktualizacji" })
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Changelog - str 2")
                    .setDescription("Sprawdź co zmieniło się o botcie")
                    .addFields(
                        { name: "Ostatnia aktualizacja", value: `${draidS.changelog[0]["lastedited"]}` },
                        { name: `${draidS.changelog[4]["Title"]} ||ID: 4||`, value: `\`${draidS.changelog[4]["Description1"]}\n${draidS.changelog[4]["Description2"]}\n${draidS.changelog[4]["Description3"]}\n${draidS.changelog[4]["Description4"]}\n${draidS.changelog[4]["Description5"]}\`` },
                        { name: `${draidS.changelog[5]["Title"]} ||ID: 5||`, value: `\`${draidS.changelog[5]["Description1"]}\n${draidS.changelog[5]["Description2"]}\n${draidS.changelog[5]["Description3"]}\n${draidS.changelog[5]["Description4"]}\n${draidS.changelog[5]["Description5"]}\`` },
                        { name: `${draidS.changelog[6]["Title"]} ||ID: 6||`, value: `\`${draidS.changelog[6]["Description1"]}\n${draidS.changelog[6]["Description2"]}\n${draidS.changelog[6]["Description3"]}\n${draidS.changelog[6]["Description4"]}\n${draidS.changelog[6]["Description5"]}\`` },
                    )
                    .setFooter({ text: "Pokazuje ostatnie 6 aktualizacji" })
                    .setColor(0x3498DB))

                const getRow = (id) => {
                    const row = new Discord.ActionRowBuilder()
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('prev_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('◀')
                            .setDisabled(pages[id] === 0)
                    )
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('next_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('▶')
                            .setDisabled(pages[id] === embeds.length - 1)
                    )
                    return row
                }

                const id = message.author.id
                pages[id] = pages[id] || 0

                const embed = embeds[pages[id]]
                let reply = message | undefined
                let collector

                const filter = (i) => i.user.id === message.author.id
                const time = 1000 * 60 * 5

                reply = await message.reply({
                    embeds: [embed],
                    components: [getRow(id)]
                })

                collector = reply.createMessageComponentCollector({ filter, time })

                collector.on('collect', async (btnInt) => {
                    if (!btnInt) return;
                    btnInt.deferUpdate()
                    if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") return;

                    if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                        --pages[id]
                    } else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
                        ++pages[id]
                    }

                    reply.edit({
                        embeds: [embeds[pages[id]]],
                        components: [getRow(id)]
                    })

                })
            }
        } else if (args[0]) {
            if (userS.draiddevs[0]["developer"] == false) {
                if (userS.settings[0]["lang"] == 'english') {
                    return message.channel.send({
                        embeds: [{
                            title: `This subcommand is only for developers`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == 'polish') {
                    return message.channel.send({
                        embeds: [{
                            title: `Ta sub - komenda jest tylko dla developerów`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            if (args[0] == "set") {
                if (args[1] == "title") {
                    draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: args.slice(2).join(' '), settingDescription1: draidS.changelog[0]["settingDescription1"], settingDescription2: draidS.changelog[0]["settingDescription2"], settingDescription3: draidS.changelog[0]["settingDescription3"], settingDescription4: draidS.changelog[0]["settingDescription4"], settingDescription5: draidS.changelog[0]["settingDescription5"] })
                    await draidS.save().catch((err) => client.outputsend("Error", err))

                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{
                                title: `Set \`settingTitle\` to ${args.slice(2).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{
                                title: `Ustawiono \`settingTitle\` na ${args.slice(2).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                } else if (args[1] == "description" || args[1] == "desc") {
                    if (args[2] == 1) {
                        draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: draidS.changelog[0]["settingTitle"], settingDescription1: args.slice(3).join(' '), settingDescription2: draidS.changelog[0]["settingDescription2"], settingDescription3: draidS.changelog[0]["settingDescription3"], settingDescription4: draidS.changelog[0]["settingDescription4"], settingDescription5: draidS.changelog[0]["settingDescription5"] })
                        await draidS.save().catch((err) => client.outputsend("Error", err))

                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Set \`settingDescription1\` to ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ustawiono \`settingDescription1\` na ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else if (args[2] == 2) {
                        draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: draidS.changelog[0]["settingTitle"], settingDescription1: draidS.changelog[0]["settingDescription1"], settingDescription2: args.slice(3).join(' '), settingDescription3: draidS.changelog[0]["settingDescription3"], settingDescription4: draidS.changelog[0]["settingDescription4"], settingDescription5: draidS.changelog[0]["settingDescription5"] })
                        await draidS.save().catch((err) => client.outputsend("Error", err))

                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Set \`settingDescription2\` to ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ustawiono \`settingDescription2\` na ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else if (args[2] == 3) {
                        draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: draidS.changelog[0]["settingTitle"], settingDescription1: draidS.changelog[0]["settingDescription1"], settingDescription2: draidS.changelog[0]["settingDescription2"], settingDescription3: args.slice(3).join(' '), settingDescription4: draidS.changelog[0]["settingDescription4"], settingDescription5: draidS.changelog[0]["settingDescription5"] })
                        await draidS.save().catch((err) => client.outputsend("Error", err))

                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Set \`settingDescription3\` to ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ustawiono \`settingDescription3\` na ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else if (args[2] == 4) {
                        draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: draidS.changelog[0]["settingTitle"], settingDescription1: draidS.changelog[0]["settingDescription1"], settingDescription2: draidS.changelog[0]["settingDescription2"], settingDescription3: draidS.changelog[0]["settingDescription3"], settingDescription4: args.slice(3).join(' '), settingDescription5: draidS.changelog[0]["settingDescription5"] })
                        await draidS.save().catch((err) => client.outputsend("Error", err))

                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Set \`settingDescription4\` to ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ustawiono \`settingDescription4\` na ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else if (args[2] == 5) {
                        draidS.changelog.set(0, { editedby: message.author.username, lastedited: draidS.changelog[0]["lastedited"], settingTitle: draidS.changelog[0]["settingTitle"], settingDescription1: draidS.changelog[0]["settingDescription1"], settingDescription2: draidS.changelog[0]["settingDescription2"], settingDescription3: draidS.changelog[0]["settingDescription3"], settingDescription4: draidS.changelog[0]["settingDescription4"], settingDescription5: args.slice(3).join(' ') })
                        await draidS.save().catch((err) => client.outputsend("Error", err))

                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Set \`settingDescription5\` to ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ustawiono \`settingDescription5\` na ${args.slice(3).join(' ')}`, description: ``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
            } else if (args[0] == "preview") {
                return message.channel.send({ embeds: [{ title: `Changelog posted by: \`${message.author.username}\` | Update: \`${draidS.changelog[0]["lastedited"]}\``, description: `**${draidS.changelog[0]["settingTitle"]}**\n\`${draidS.changelog[0]["settingDescription1"]}\n${draidS.changelog[0]["settingDescription2"]}\n${draidS.changelog[0]["settingDescription3"]}\n${draidS.changelog[0]["settingDescription4"]}\n${draidS.changelog[0]["settingDescription5"]}\``, color: 0x3498DB, footer: { text: `Use the command ",changelog" to see the past 6 changes!`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] })
            } else if (args[0] == "confirm") {
                draidS.changelog.set(6, { Title: draidS.changelog[5]["Title"], Description1: draidS.changelog[5]["Description1"], Description2: draidS.changelog[5]["Description2"], Description3: draidS.changelog[5]["Description3"], Description4: draidS.changelog[5]["Description4"], Description5: draidS.changelog[5]["Description5"] })
                draidS.changelog.set(5, { Title: draidS.changelog[4]["Title"], Description1: draidS.changelog[4]["Description1"], Description2: draidS.changelog[4]["Description2"], Description3: draidS.changelog[4]["Description3"], Description4: draidS.changelog[4]["Description4"], Description5: draidS.changelog[4]["Description5"] })
                draidS.changelog.set(4, { Title: draidS.changelog[3]["Title"], Description1: draidS.changelog[3]["Description1"], Description2: draidS.changelog[3]["Description2"], Description3: draidS.changelog[3]["Description3"], Description4: draidS.changelog[3]["Description4"], Description5: draidS.changelog[3]["Description5"] })
                draidS.changelog.set(3, { Title: draidS.changelog[2]["Title"], Description1: draidS.changelog[2]["Description1"], Description2: draidS.changelog[2]["Description2"], Description3: draidS.changelog[2]["Description3"], Description4: draidS.changelog[2]["Description4"], Description5: draidS.changelog[2]["Description5"] })
                draidS.changelog.set(2, { Title: draidS.changelog[1]["Title"], Description1: draidS.changelog[1]["Description1"], Description2: draidS.changelog[1]["Description2"], Description3: draidS.changelog[1]["Description3"], Description4: draidS.changelog[1]["Description4"], Description5: draidS.changelog[1]["Description5"] })
                draidS.changelog.set(1, { Title: draidS.changelog[0]["settingTitle"], Description1: draidS.changelog[0]["settingDescription1"], Description2: draidS.changelog[0]["settingDescription2"], Description3: draidS.changelog[0]["settingDescription3"], Description4: draidS.changelog[0]["settingDescription4"], Description5: draidS.changelog[0]["settingDescription5"] })
                draidS.changelog.set(0, { editedby: "None", lastedited: dateformat.format(new Date(), 'YYYY/MM/DD HH:mm:ss'), settingTitle: "None", settingDescription1: "None", settingDescription2: "None", settingDescription3: "None", settingDescription4: "None", settingDescription5: "None" })
                await draidS.save().catch((err) => client.outputsend("Error", err))

                if (userS.settings[0]["lang"] == 'english') {
                    message.channel.send({
                        embeds: [{
                            title: `Confirmed`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == 'polish') {
                    message.channel.send({
                        embeds: [{
                            title: `Zatwierdzono`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }

                const channel = await client.channels.cache.get("985907392422240256")
                return channel.send({
                    embeds: [{ title: `Changelog posted by: \`${message.author.username}\` | Update: \`${draidS.changelog[0]["lastedited"]}\``, description: `**${draidS.changelog[1]["Title"]}**\n\`${draidS.changelog[1]["Description1"]}\n${draidS.changelog[1]["Description2"]}\n${draidS.changelog[1]["Description3"]}\n${draidS.changelog[1]["Description4"]}\n${draidS.changelog[1]["Description5"]}\``, color: 0x3498DB, footer: { text: `Use the command ",changelog" to see the past 6 changes!`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }
    }
};