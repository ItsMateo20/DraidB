module.exports = {
    name: `balance`,
    aliases: ['bal'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    currencycmd: true,

    helpDescription: "Displays the user's balance.",
    helpUsage: '**balance** [@user]',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const userSS = await user.findOne({ userID: target.id });
        const coin = '<:Coin:918638794738139176>'

        if (!userSS) {
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({ embeds: [{ title: `Osoba nie znaleziona w systemie!`, color: 0x3498DB }] })
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({ embeds: [{ title: `User not found in the system!`, color: 0x3498DB }] })
            }
        } else if (userSS) {
            if (userS.settings[0]["lang"] == 'polish') {
                const bal = new Discord.EmbedBuilder()
                    .setTitle(target.username + ` Konto`)
                    .addFields({ name: 'Kasa: ', value: `> ${coin}${userSS.inventory[0]["currency"]}` })
                    .setColor(0x3498DB)

                return message.channel.send({ embeds: [bal] })
            } else if (userS.settings[0]["lang"] == 'english') {
                const bal = new Discord.EmbedBuilder()
                    .setTitle(target.username + ` Account`)
                    .addFields({ name: 'Balance: ', value: `> ${coin}${userSS.inventory[0]["currency"]}` })
                    .setColor(0x3498DB)

                return message.channel.send({ embeds: [bal] })
            }
        }
    }
};