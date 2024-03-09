module.exports = {
    name: `user`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],

    helpDescription: 'Displays the user settings.',
    helpUsage: '**user**',
    helpGroup: 'Settings',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const onswitch = '<:tick:987617258018844712>'
        const offswitch = '<:x_:987617259377786911>'

        if (!args[0]) {
            if (userS.settings[0]["lang"] === "english") {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle(`**User Settings** - pg. 1/1  - Personalization`)
                    .addFields(
                        { name: "**__Default Settings:__**", value: "\`Here are your normal settings\`" },
                        { name: "Language ||ID: lang||", value: `${userS.settings[0]["lang"]}`, inline: true },
                        { name: "Beta Mode ||ID: betamode||", value: `${userS.settings[0]["betamode"] ? onswitch : offswitch}`, inline: true },
                        { name: "Notifications ||ID: notifications||", value: `${userS.settings[0]["notifications"] ? onswitch : offswitch}`, inline: true },
                    )
                    .setFooter({ text: `Use the command "${serverS.settings[3]["prefix"]}user (Setting ID)" to change a value` })
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
            } else if (userS.settings[0]["lang"] === "polish") {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle(`**Ustawienia użytkownika** - pg. 1/1  - Personalizacja`)
                    .addFields(
                        { name: "**__Domyślne ustawienia:__**", value: "\`Tutaj są Twoje ustawienia normalne\`" },
                        { name: "Język ||ID: lang||", value: `${userS.settings[0]["lang"]}`, inline: true },
                        { name: "Tryb beta ||ID: betamode||", value: `${userS.settings[0]["betamode"] ? onswitch : offswitch}`, inline: true },
                        { name: "Powiadomienia ||ID: notifications||", value: `${userS.settings[0]["notifications"] ? onswitch : offswitch}`, inline: true },
                    )
                    .setFooter({ text: `Użyj komendy "${serverS.settings[3]["prefix"]}user (ID ustawienia)" aby zmienić wartość` })
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
            }
        } else if (args[0]) {
            if (args[0] === "lang") {
                if (args[1] === "english" || args[1] === "angielski" || args[1] === "en") {
                    userS.settings.set(0, { lang: "english", betamode: userS.settings[0]["betamode"] });
                    userS.save().catch((err) => client.outputsend("Error", err));
                    return message.channel.send(`Language set to english.`);
                } else if (args[1] === "polish" || args[1] === "polski" || args[1] === "pl") {
                    userS.settings.set(0, { lang: "polish", betamode: userS.settings[0]["betamode"] });
                    userS.save().catch((err) => client.outputsend("Error", err));
                    return message.channel.send(`Język ustawiony na polski.`);
                } else {
                    return message.channel.send(`Invalid language.`);
                }
            } else if (args[0] == 'betamode') {
                if (args[1] == 'on') {
                    userS.settings.set(0, { lang: userS.settings[0]["lang"], betamode: true });
                    userS.save().catch((err) => client.outputsend("Error", err))
                    if (userS.settings[0]["lang"] === "english") {
                        return message.channel.send({
                            embeds: [{ title: `**Beta Mode** has been turned on!`, color: 0x3498DB }]
                        });
                    } else if (userS.settings[0]["lang"] === "polish") {
                        return message.channel.send({
                            embeds: [{ title: `**Beta Mode** jest włączone!`, color: 0x3498DB }]
                        });
                    }
                } else if (args[1] == 'off') {
                    userS.settings.set(0, { lang: userS.settings[0]["lang"], betamode: false });
                    userS.save().catch((err) => client.outputsend("Error", err))
                    if (userS.settings[0]["lang"] === "english") {
                        return message.channel.send({
                            embeds: [{ title: `**Beta Mode** has been turned off!`, color: 0x3498DB }]
                        });
                    } else if (userS.settings[0]["lang"] === "polish") {
                        return message.channel.send({
                            embeds: [{ title: `**Beta Mode** jest wyłączone!`, color: 0x3498DB }]
                        });
                    }
                }
            } else if (args[0] == 'notifications') {
                if (args[1] == 'on') {
                    userS.settings.set(0, { lang: userS.settings[0]["lang"], betamode: userS.settings[0]["betamode"], notifications: true });
                    userS.save().catch((err) => client.outputsend("Error", err))
                    if (userS.settings[0]["lang"] === "english") {
                        return message.channel.send({
                            embeds: [{ title: `**Notifications** has been turned on!`, color: 0x3498DB }]
                        });
                    } else if (userS.settings[0]["lang"] === "polish") {
                        return message.channel.send({
                            embeds: [{ title: `**Powiadomienia** są włączone!`, color: 0x3498DB }]
                        });
                    }
                } else if (args[1] == 'off') {
                    userS.settings.set(0, { lang: userS.settings[0]["lang"], betamode: userS.settings[0]["betamode"], notifications: false });
                    userS.save().catch((err) => client.outputsend("Error", err))
                    if (userS.settings[0]["lang"] === "english") {
                        return message.channel.send({
                            embeds: [{ title: `**Notifications** has been turned off!`, color: 0x3498DB }]
                        });
                    } else if (userS.settings[0]["lang"] === "polish") {
                        return message.channel.send({
                            embeds: [{ title: `**Powiadomienia** są wyłączone!`, color: 0x3498DB }]
                        });
                    }
                }
            }
        }
    }
};