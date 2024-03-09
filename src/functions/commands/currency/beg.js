module.exports = {
    name: `beg`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Begs for money.',
    helpUsage: '**beg**',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        let tf = 'false'

        let money = 0

        const coin = '<:Coin:918638794738139176>'


        if (userS.settings[0]["lang"] == 'polish') {
            const payment = Math.floor(Math.random() * 10);

            function doRandHT() {
                var rand = ['true', 'false'];

                return rand[Math.floor(Math.random() * rand.length)];
            }
            money = parseInt(payment)
            tf = doRandHT()

            if (tf == 'true') {
                message.channel.send({
                    embeds: [{ author: { text: `${message.author.username}` }, title: `Prosisz randomowe osoby`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err)).then((message) => {
                    setTimeout(function () {
                        function doRandHT() {
                            var rand = [`Prośiłes bogatego człowieka i dostałes ${coin}${money}`, `Prośiłes jakiś sklep i dostałes ${coin}${money}`, `Prośiłes YouTubera i dostałes ${coin}${money}`];

                            return rand[Math.floor(Math.random() * rand.length)];
                        }
                        message.edit({
                            embeds: [{ title: doRandHT(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err)).then(() => {
                            userS.inventory[0]["currency"] += money
                            serverS.save().catch((err) => client.outputsend("Error", err))
                        })

                    }, 3000)
                })
            } else if (tf == 'false') {
                message.channel.send({
                    embeds: [{ author: { text: message.author.username }, title: `Begging a random stranger`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err)).then((message) => {
                    setTimeout(function () {
                        function doRandHT() {
                            var rand = [`Prośiłes bogatego człowieka i nic nie dostałes`, `Prośiłes jakiś sklep i nic nie dostałes`, `Prośiłes YouTubera i nic nie dostałes`];

                            return rand[Math.floor(Math.random() * rand.length)];
                        }
                        message.edit({
                            embeds: [{ title: doRandHT(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err))
                    }, 3000)
                })
            }
        } else if (userS.settings[0]["lang"] == 'english') {
            const payment = Math.floor(Math.random() * 10);

            function doRandHT() {
                var rand = [`true`, `false`];

                return rand[Math.floor(Math.random() * rand.length)];
            }

            money = parseInt(payment)
            tf = doRandHT()

            if (tf == 'true') {
                message.channel.send({
                    embeds: [{ author: { text: message.author.username }, title: `🙏🙏🙏`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err)).then((message) => {
                    setTimeout(function () {
                        function doRandHT() {
                            var rand = [`You begged a rich man ang got ${coin}${money}`, `You begged a shop and got ${coin}${money}`, `You begged a YouTuber and got ${coin}${money}`];

                            return rand[Math.floor(Math.random() * rand.length)];
                        }
                        message.edit({
                            embeds: [{ title: doRandHT(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err)).then(() => {
                            userS.inventory[0]["currency"] += money
                            serverS.save().catch((err) => client.outputsend("Error", err))
                        })
                    }, 3000)
                })
            } else if (tf == 'false') {
                message.channel.send({
                    embeds: [{ author: { text: message.author.username }, title: `🙏🙏🙏`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err)).then((message) => {
                    setTimeout(function () {
                        function doRandHT() {
                            var rand = [`You begged a rich man and got nothing`, `You begged a shop and got nothing`, `You begged a YouTuber and got nothing`];

                            return rand[Math.floor(Math.random() * rand.length)];
                        }
                        message.edit({
                            embeds: [{ title: doRandHT(), color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err))
                    }, 3000)
                })
            }
        }
    }
};