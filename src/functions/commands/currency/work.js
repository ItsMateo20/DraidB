module.exports = {
    name: `work`,
    cooldown: 86400000,
    votedcooldown: 43200000,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Work to earn currency.',
    helpUsage: '**work**',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'
        const tick = '<:tick:987617258018844712>'
        const x = '<:x_:987617259377786911>'



        let money = 0

        if (userS.inventory[2]["job"] == 'Nobody') {
            if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{
                        title: `Please pick who you want to work as using the '${serverS.settings[3]["prefix"]}job' command!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{
                        title: `Proszę wybierz za kogo chcesz pracować, użyj komendy '${serverS.settings[3]["prefix"]}job' i wybierz!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }
        if (userS.inventory[2]["leftuses"] == 0 || userS.inventory[1]["laptop"] == 0) {
            userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: 0, buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
            userS.inventory.set(1, { laptop: 0, draidplush: userS.inventory[1]["draidplush"] })
            userS.save().catch((err) => client.outputsend("Error", err))
            if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{ title: `Looks like you dont have any laptops left, go to the shop and buy one`, color: 0x3498DB, footer: { text: `Working as a ${userS.inventory[2]["job"]}}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                })
            } else if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({ embeds: [{ title: `Nie możesz pracować bez laptopa, Idź do sklepu i kup laptop!`, color: 0x3498DB, footer: { text: `Pracujesz jako ${userS.inventory[2]["job"]}}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] })
            }
        } else if (userS.inventory[2]["leftuses"] > 0) {
            if (userS.inventory[2]["buildwork"] == 5) {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"] + 1, mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: 0, mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
            }
            if (userS.inventory[2]["workwork"] == 5) {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"] + 1, progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: 0, progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
            }
            if (userS.inventory[2]["mechwork"] == 5) {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"] + 1, workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: 0, workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
            }
            if (userS.inventory[2]["progwork"] == 5) {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"] + 1, buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: 0 })
                userS.save().catch((err) => client.outputsend("Error", err))
            }
            if (userS.inventory[2]["job"] == 'builder') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"] + 1, mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 5000
            } else if (userS.inventory[2]["job"] == 'office worker') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"] + 1, progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 5000
            } else if (userS.inventory[2]["job"] == 'mechanic') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"] + 1, workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 5000
            } else if (userS.inventory[2]["job"] == 'programmer') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] + 1 })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 5000
            } else if (userS.inventory[2]["job"] == 'builder 1') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"] + 1, mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 6300
            } else if (userS.inventory[2]["job"] == 'office worker 1') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"] + 1, progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 7100
            } else if (userS.inventory[2]["job"] == 'mechanic 1') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"] + 1, workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 8500
            } else if (userS.inventory[2]["job"] == 'programmer 1') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] + 1 })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 8500
            } else if (userS.inventory[2]["job"] == 'builder 2') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"] + 1, mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 8200
            } else if (userS.inventory[2]["job"] == 'office worker 2') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"] + 1, progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 8500
            } else if (userS.inventory[2]["job"] == 'mechanic 2') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"] + 1, workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 10000
            } else if (userS.inventory[2]["job"] == 'programmer 2') {
                userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"], buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] + 1 })
                userS.save().catch((err) => client.outputsend("Error", err))
                money = 10000
            }
        }
        if (userS.settings[0]["lang"] == 'polish') {
            message.channel.send({
                embeds: [{ author: { text: `${message.author.username}` }, title: `Pracowanie`, color: 0x3498DB, footer: { text: `Pracujesz jako ${userS.inventory[2]["job"]}}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
            }).then((message) => {
                setTimeout(function () {
                    function doRandHT() {
                        var rand = [`Pracowałes drugą noc i dostałes ${coin}${money}`, `Pracowałes drugi dzień i dostałes ${coin}${money}`, `Twoj szef ci dał ${coin}${money} za tylko siedzenie w krześle`];

                        return rand[Math.floor(Math.random() * rand.length)];
                    }
                    message.edit({ embeds: [{ title: `${doRandHT()}`, color: 0x3498DB, footer: { text: `Pracujesz jako ${userS.inventory[2]["job"]}}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).then(() => {
                        userS.inventory.set(0, { currency: userS.inventory[0]["currency"] + money })
                        userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"] - 1, buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        if (userS.inventory[2]["leftuses"] == 0) {
                            message.channel.send({
                                embeds: [{ title: `Wygląda na to, że Twój laptop się zepsuł, idź kupić nowy w sklepie!`, color: 0x3498DB, footer: { text: `Pracujesz jako ${userS.inventory[2]["job"]}}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                            })
                            userS.inventory.set(1, { laptop: 0, draidplush: userS.inventory[1]["draidplush"] })
                        }
                        userS.save().catch((err) => client.outputsend("Error", err))
                    })

                }, 3000)
            })
        } else if (userS.settings[0]["lang"] == 'english') {
            message.channel.send({
                embeds: [{ author: { text: `${message.author.username}` }, title: `Working`, color: 0x3498DB, footer: { text: `Working as a ${userS.inventory[2]["job"]}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
            }).then((message) => {
                setTimeout(function () {
                    function doRandHT() {
                        var rand = [`You worked an extra night and got ${coin}${money}`, `You worked an extra day and got ${coin}${money}`, `Your boss just gave you ${coin}${money} for just sitting in your chair`];

                        return rand[Math.floor(Math.random() * rand.length)];
                    }
                    message.edit({ embeds: [{ title: `${doRandHT()}`, color: 0x3498DB, footer: { text: `Working as a ${userS.inventory[2]["job"]}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).then(() => {
                        userS.inventory.set(0, { currency: userS.inventory[0]["currency"] + money })
                        userS.inventory.set(2, { job: userS.inventory[2]["job"], leftuses: userS.inventory[2]["leftuses"] - 1, buildskill: userS.inventory[2]["buildskill"], mechskill: userS.inventory[2]["mechskill"], workskill: userS.inventory[2]["workskill"], progskill: userS.inventory[2]["progskill"], buildwork: userS.inventory[2]["buildwork"], mechwork: userS.inventory[2]["mechwork"], workwork: userS.inventory[2]["workwork"], progwork: userS.inventory[2]["progwork"] })
                        if (userS.inventory[2]["leftuses"] == 0) {
                            message.channel.send({ embeds: [{ title: `Looks like your laptop broke, go buy a new one in the shop!`, color: 0x3498DB, footer: { text: `Working as a ${userS.inventory[2]["job"]}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] })
                            userS.inventory.set(1, { laptop: 0, draidplush: userS.inventory[1]["draidplush"] })
                        }
                        userS.save().catch((err) => client.outputsend("Error", err))
                    })
                }, 3000)
            })
        }
    }
}