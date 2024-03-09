module.exports = {
    name: `hourly`,
    aliases: ['hour'],
    cooldown: 86400,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Redeems the user\'s hourly crate.',
    helpUsage: '**hourly**',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const coin = '<:Coin:918638794738139176>'


        let money1 = 0

        const money = Math.floor(Math.random() * 5000) + 1;
        money1 = parseInt(money)
        userS.inventory.set(0, { currency: userS.inventory[0]["currency"] + money1 })
        userS.save().catch((err) => client.outputsend("Error", err))

        if (userS.settings[0]["lang"] == "english") {
            const embed = new Discord.EmbedBuilder()
                .setTitle('You have opened your hourly crate and got:')
                .setDescription(`+${coin}${money1}`)
                .setColor(0x3498DB)
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
            return message.channel.send({ embeds: [embed] })
        } else if (userS.settings[0]["lang"] == "polish") {
            const embed = new Discord.EmbedBuilder()
                .setTitle('Otworzyłeś swoją skrzynie godzinną i otrzymałeś:')
                .setDescription(`+ ${coin}${money1} `)
                .setColor(0x3498DB)
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
            return message.channel.send({ embeds: [embed] })
        }
    }
};