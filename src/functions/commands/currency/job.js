module.exports = {
    name: `job`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Choose you\'r job.',
    helpUsage: '**job** [job]',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'
        const tick = '<:tick:987617258018844712>'
        const x = '<:x_:987617259377786911>'



        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'english') {
                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.SelectMenuBuilder()
                            .setCustomId('select')
                            .setPlaceholder('Pick a job skill page')
                            .addOptions([
                                {
                                    label: 'Lvl 0',
                                    description: 'Jobs with skill 0',
                                    value: '0',
                                },
                                {
                                    label: 'Lvl 1',
                                    description: 'Jobs with skill 1-5',
                                    value: '1-5',
                                },
                                {
                                    label: 'Lvl 2',
                                    description: 'Jobs with skill 6-10',
                                    value: '6-10',
                                },
                            ]),
                    );
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Work list \`(Lvl 0)\`')
                    .setDescription('Here you can set what you want to work as!')
                    .addFields(
                        { name: `${tick}Builder`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Mechanic`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Office worker`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Programmer`, value: `Skill required: 0 | Salary: 5000${coin}` },
                    )
                    .setColor(0x3498DB)

                message.channel.send({ embeds: [embed], components: [row] })
            } else if (userS.settings[0]["lang"] == 'polish') {

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.SelectMenuBuilder()
                            .setCustomId('select')
                            .setPlaceholder('Wybierz strone pracy!')
                            .addOptions([
                                {
                                    label: 'Lvl 0',
                                    description: 'Prace z skillem 0',
                                    value: '0',
                                },
                                {
                                    label: 'Lvl 1',
                                    description: 'Prace z skillem 1-5',
                                    value: '1-5',
                                },
                                {
                                    label: 'Lvl 2',
                                    description: 'Prace z skillem 6-10',
                                    value: '6-10',
                                },
                            ]),
                    );
                const embed = new Discord.EmbedBuilder()
                    .setTitle('Lista prac \`(Lvl 0)\`')
                    .setDescription('Tutaj mozesz ustawic za kogo chcesz pracować!')
                    .addFields(
                        { name: `${tick}Builder`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Mechanic`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Office worker`, value: `Skill required: 0 | Salary: 5000${coin}` },
                        { name: `${tick}Programmer`, value: `Skill required: 0 | Salary: 5000${coin}` }
                    )
                    .setColor(0x3498DB)
                message.channel.send({ embeds: [embed], components: [row] })
            }

            const filter = i => i.customId === 'select' && i.user.id === message.author.id;

            const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 })

            setTimeout(() => {
                if (userS.settings[0]["lang"] == `english`) {
                    return message.reply({
                        embeds: [{ title: `This interaction has ended`, color: 0x3498DB }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == `polish`) {
                    return message.reply({
                        embeds: [{ title: `Ta interakcja zakończyła się`, color: 0x3498DB }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }, 30000);

            collector.on('collect', async i => {
                if (i.customId === 'select') {
                    if (i.values[0] === '0') {
                        if (userS.settings[0]["lang"] == 'english') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Work list \`(Lvl 0)\`')
                                .setDescription('Here you can set what you want to work as!')
                                .addFields(
                                    { name: `${tick}Builder`, value: `Skill required: 0 | Salary: 5000${coin}` },
                                    { name: `${tick}Mechanic`, value: `Skill required: 0 | Salary: 5000${coin}` },
                                    { name: `${tick}Office worker`, value: `Skill required: 0 | Salary: 5000${coin}` },
                                    { name: `${tick}Programmer`, value: `Skill required: 0 | Salary: 5000${coin}` }
                                )
                                .setColor(0x3498DB)
                            i.update({ embeds: [embed] })
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Lista prac \`(Lvl 0)\`')
                                .setDescription('Tutaj mozesz ustawic za kogo chcesz pracować!')
                                .addFields(
                                    { name: `${tick}Builder`, value: `Skill potrzebny: 0 | Zapłata: 5000${coin}` },
                                    { name: `${tick}Mechanic`, value: `Skill potrzebny: 0 | Zapłata: 5000${coin}` },
                                    { name: `${tick}Office worker`, value: `Skill potrzebny: 0 | Zapłata: 5000${coin}` },
                                    { name: `${tick}Programmer`, value: `Skill potrzebny: 0 | Zapłata: 5000${coin}` }
                                )
                                .setColor(0x3498DB)
                            i.update({ embeds: [embed] })
                        }
                    } else if (i.values[0] === '1-5') {
                        if (userS.settings[0]["lang"] == 'english') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Work list \`(Lvl 1)\`')
                                .setDescription('Here you can set what you want to work as!')
                                .setColor(0x3498DB)

                            if (userS.inventory[2]["buildskill"] == 2 || userS.inventory[2]["buildskill"] > 2) {
                                embed.addFields({ name: `${tick}Builder 1`, value: `Skill required: 2 | Salary: 6300${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 2 || userS.inventory[2]["buildskill"] < 2) {
                                embed.addFields({ name: `${x}Builder 1`, value: `Skill required: 2 | Salary: 6300${coin}` })
                            }

                            if (userS.inventory[2]["mechskill"] == 5 || userS.inventory[2]["mechskill"] > 5) {
                                embed.addFields({ name: `${tick}Mechanic 1`, value: `Skill required: 5 | Salary: 8500${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 5 || userS.inventory[2]["buildskill"] < 5) {
                                embed.addFields({ name: `${x}Mechanic 1`, value: `Skill required: 5 | Salary: 8500${coin}` })
                            }

                            if (userS.inventory[2]["workskill"] == 3 || userS.inventory[2]["workskill"] > 3) {
                                embed.addFields({ name: `${tick}Office worker 1`, value: `Skill required: 3 | Salary: 7100${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 3 || userS.inventory[2]["buildskill"] < 3) {
                                embed.addFields({ name: `${x}Office worker 1`, value: `Skill required: 3 | Salary: 7100${coin}` })
                            }

                            if (serverS.porgskill == 5 || userS.inventory[2]["progskill"] > 5) {
                                embed.addFields({ name: `${tick}Programmer 1`, value: `Skill required: 5 | Salary: 8500${coin}` })
                            }
                            if (userS.inventory[2]["progskill"] !== 5 || userS.inventory[2]["progskill"] < 5) {
                                embed.addFields({ name: `${x}Programmer 1`, value: `Skill required: 5 | Salary: 8500${coin}` })
                            }
                            i.update({ embeds: [embed] })
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Lista prac \`(Lvl 1)\`')
                                .setDescription('Tutaj mozesz ustawic za kogo chcesz pracować!')
                                .setColor(0x3498DB)

                            if (userS.inventory[2]["buildskill"] == 2 || userS.inventory[2]["buildskill"] > 2) {
                                embed.addFields({ name: `${tick}Builder 1`, value: `Skill potrzebny: 2 | Zapłata: 6300${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 2 || userS.inventory[2]["buildskill"] < 2) {
                                embed.addFields({ name: `${x}Builder 1`, value: `Skill potrzebny: 2 | Zapłata: 6300${coin}` })
                            }

                            if (userS.inventory[2]["mechskill"] == 5 || userS.inventory[2]["mechskill"] > 5) {
                                embed.addFields({ name: `${tick}Mechanic 1`, value: `Skill potrzebny: 5 | Zapłata: 8500${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 5 || userS.inventory[2]["buildskill"] < 5) {
                                embed.addFields({ name: `${x}Mechanic 1`, value: `Skill potrzebny: 5 | Zapłata: 8500${coin}` })
                            }

                            if (userS.inventory[2]["workskill"] == 3 || userS.inventory[2]["workskill"] > 3) {
                                embed.addFields({ name: `${tick}Office worker 1`, value: `Skill potrzebny: 3 | Zapłata: 7100${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 3 || userS.inventory[2]["buildskill"] < 3) {
                                embed.addFields({ name: `${x}Office worker 1`, value: `Skill potrzebny: 3 | Zapłata: 7100${coin}` })
                            }

                            if (serverS.porgskill == 5 || userS.inventory[2]["progskill"] > 5) {
                                embed.addFields({ name: `${tick}Programmer 1`, value: `Skill potrzebny: 5 | Zapłata: 8500${coin}` })
                            }
                            if (userS.inventory[2]["progskill"] !== 5 || userS.inventory[2]["progskill"] < 5) {
                                embed.addFields({ name: `${x}Programmer 1`, value: `Skill potrzebny: 5 | Zapłata: 8500${coin}` })
                            }
                            i.update({ embeds: [embed] })
                        }
                    } else if (i.values[0] === '6-10') {
                        if (userS.settings[0]["lang"] == 'english') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Work list \`(Lvl 2)\`')
                                .setDescription('Here you can set what you want to work as!')
                                .setColor(0x3498DB)

                            if (userS.inventory[2]["buildskill"] == 5 || userS.inventory[2]["buildskill"] > 5) {
                                embed.addFields({ name: `${tick}Builder 2`, value: `Skill required: 5 | Salary: 8200${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 5 || userS.inventory[2]["buildskill"] < 5) {
                                embed.addFields({ name: `${x}Builder 2`, value: `Skill required: 5 | Salary: 8200${coin}` })
                            }

                            if (userS.inventory[2]["mechskill"] == 10 || userS.inventory[2]["mechskill"] > 10) {
                                embed.addFields({ name: `${tick}Mechanic 2`, value: `Skill required: 10 | Salary: 10000${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 10 || userS.inventory[2]["buildskill"] < 10) {
                                embed.addFields({ name: `${x}Mechanic 2`, value: `Skill required: 10 | Salary: 10000${coin}` })
                            }

                            if (userS.inventory[2]["workskill"] == 6 || userS.inventory[2]["workskill"] > 6) {
                                embed.addFields({ name: `${tick}Office worker 2`, value: `Skill required: 6 | Salary: 8500${coin}` })
                            }
                            if (userS.inventory[2]["buildskill"] !== 6 || userS.inventory[2]["buildskill"] < 6) {
                                embed.addFields({ name: `${x}Office worker 2`, value: `Skill required: 6 | Salary: 8500${coin}` })
                            }

                            if (serverS.porgskill == 5 || userS.inventory[2]["progskill"] > 5) {
                                embed.addFields({ name: `${tick}Programmer 2`, value: `Skill required: 10 | Salary: 10000${coin}` })
                            }
                            if (userS.inventory[2]["progskill"] !== 10 || userS.inventory[2]["progskill"] < 10) {
                                embed.addFields({ name: `${x}Programmer 2`, value: `Skill required: 10 | Salary: 10000${coin}` })
                            }
                            i.update({ embeds: [embed] })
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            const embed = new Discord.EmbedBuilder()
                                .setTitle('Lista prac \`(Lvl 2)\`')
                                .setDescription('Tutaj mozesz ustawic za kogo chcesz pracować!')
                                .addFields(
                                    { name: 'Builder 2', value: `Skill potrzebny: 5 | Zapłata: 8200${coin}` },
                                    { name: 'Mechanic 2', value: `Skill potrzebny: 10 | Zapłata: 10000${coin}` },
                                    { name: 'Office worker 2', value: `Skill potrzebny: 6 | Zapłata: 8500${coin}` },
                                    { name: 'Programmer 2', value: `Skill potrzebny: 10 | Zapłata: 10000${coin}` }
                                )
                                .setColor(0x3498DB)
                            i.update({ embeds: [embed] })
                        }
                    }
                }
            });

            collector.on('end', async i => {
                return
            });

        } else if (args[0]) {
            //job command id:3
            if (args[0] == 'builder') {
                if (!args[1]) {
                    if (userS.inventory[2]["buildskill"] == 0 || userS.inventory[2]["buildskill"] > 0) {
                        userS.inventory.set(2, { job: "builder", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '1') {
                    if (userS.inventory[2]["buildskill"] == 5 || userS.inventory[2]["buildskill"] > 5) {
                        userS.inventory.set(2, { job: "builder 1", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '2') {
                    if (userS.inventory[2]["buildskill"] == 10 || userS.inventory[2]["buildskill"] > 10) {
                        userS.inventory.set(2, { job: "builder 2", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
            } else if (args[0] == 'mechanic') {
                if (!args[1]) {
                    if (userS.inventory[2]["mechskill"] == 0 || userS.inventory[2]["mechskill"] > 0) {
                        userS.inventory.set(2, { job: "mechanic", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '1') {
                    if (userS.inventory[2]["mechskill"] == 5 || userS.inventory[2]["mechskill"] > 5) {
                        userS.inventory.set(2, { job: 'mechanic 1', leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '2') {
                    if (userS.inventory[2]["mechskill"] == 10 || userS.inventory[2]["mechskill"] > 10) {
                        userS.inventory.set(2, { job: 'mechanic 2', leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
            } else if (args[0] == 'office') {
                if (args[1] == 'worker') {
                    if (!args[2]) {
                        if (userS.inventory[2]["workskill"] == 0 || userS.inventory[2]["workskill"] > 0) {
                            userS.inventory.set(2, { job: 'office worker', leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                            userS.save().catch((err) => client.outputsend("Error", err))
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        } else {
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        }
                    } else if (args[2] == '1') {
                        if (userS.inventory[2]["workskill"] == 5 || userS.inventory[2]["workskill"] > 5) {
                            userS.inventory.set(2, { job: 'office worker 1', leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                            userS.save().catch((err) => client.outputsend("Error", err))
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        } else {
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        }
                    } else if (args[2] == '2') {
                        if (userS.inventory[2]["workskill"] == 10 || userS.inventory[2]["workskill"] > 10) {
                            userS.inventory.set(2, { job: 'office worker 2', leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                            userS.save().catch((err) => client.outputsend("Error", err))
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        } else {
                            if (userS.settings[0]["lang"] == 'english') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            } else if (userS.settings[0]["lang"] == 'polish') {
                                return message.channel.send({
                                    embeds: [{
                                        title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                    }]
                                }).catch((err) => client.outputsend("Error", err))
                            }
                        }
                    }
                }
            } else if (args[0] == 'programmer') {
                if (!args[1]) {
                    if (userS.inventory[2]["progskill"] == 0 || userS.inventory[2]["progskill"] > 0) {
                        userS.inventory.set(2, { job: "programmer", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '1') {
                    if (userS.inventory[2]["progskill"] == 5 || userS.inventory[2]["progskill"] > 5) {
                        userS.inventory.set(2, { job: "programmer 1", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                } else if (args[1] == '2') {
                    if (userS.inventory[2]["progskill"] == 10 || userS.inventory[2]["progskill"] > 10) {
                        userS.inventory.set(2, { job: "programmer 2", leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        userS.save().catch((err) => client.outputsend("Error", err))
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `You are now working as ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Teraz pracujesz jako ${userS.inventory[2]["job"]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        if (userS.settings[0]["lang"] == 'english') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Your skill level is to small to work in this job!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == 'polish') {
                            return message.channel.send({
                                embeds: [{
                                    title: `Twój level skillu jest za mały żeby pracować w tej robocie!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
            }
        }
    }
}