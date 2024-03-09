module.exports = {
    name: `shop`,
    aliases: ['sklep'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: 'Displays the shop.',
    helpUsage: '**shop**',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const coin = '<:Coin:918638794738139176>'


        if (userS.settings[0]["lang"] == 'polish') {
            const shop = new Discord.EmbedBuilder()
                .setTitle(message.guild.name + ` Shop`)
                .addFields({ name: `Laptop (ID: 1)`, value: `Koszt: 150${coin}`, inLine: true }, { name: `Draid miśek (ID: 2)`, value: `Koszt: 4000${coin}`, inLine: true })
                .setColor(0x3498DB)
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })

            return message.channel.send({ embeds: [shop] });
        } else if (userS.settings[0]["lang"] == 'english') {
            const shop = new Discord.EmbedBuilder()
                .setTitle(message.guild.name + `'s Shop`)
                .addFields({ name: `Laptop (ID: 1)`, value: `Cost: 150${coin}`, inLine: true }, { name: `Draid plush (ID: 2)`, value: `Cost: 4000${coin}`, inLine: true })
                .setColor(0x3498DB)
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })

            return message.channel.send({ embeds: [shop] });
        }
    }
};