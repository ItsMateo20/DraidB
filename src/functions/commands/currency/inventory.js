

module.exports = {
    name: `inventory`,
    aliases: ['inv'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Displays the user\'s inventory.',
    helpUsage: '**inventory** {@user}',
    helpGroup: 'Currency',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const userSS = await user.findOne({ userID: target.id });
        if (userS.settings[0]["lang"] == 'polish') {
            if (!userSS) {
                return message.channel.send({
                    embeds: [{
                        title: `Nie znaleziono **${target.username}** w naszym systemie`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else {

                const inv = new Discord.EmbedBuilder()
                    .setTitle(`${target.username} Plecak`)
                    .setDescription('**Posiadane Itemy**')
                    .setColor(0x3498DB)

                if (userSS.inventory[1]["laptop"] == 1 || userSS.inventory[1]["laptop"] > 1) {
                    inv.addFields({ name: `:computer: Laptop | ${userSS.inventory[1]["laptop"]}`, value: `ID: 1`, inLine: true })
                }
                if (userSS.inventory[1]["draidplush"] == 1 || userSS.inventory[1]["draidplush"] > 1) {
                    inv.addFields({ name: `Draid miśek | ${userSS.inventory[1]["draidplush"]}`, value: `ID: 2 - Kolektowane | Sprzedawalne`, inLine: true })
                }

                message.channel.send({ embeds: [inv] });
            }
        } else if (userS.settings[0]["lang"] == 'english') {
            if (!userSS) {
                return message.channel.send({
                    embeds: [{
                        title: `Didn\'t find **${target.username}** in our system`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else {

                const inv = new Discord.EmbedBuilder()
                    .setTitle(`${target.username} 's Inventory`)
                    .setDescription('**Owned Items**')
                    .setColor(0x3498DB)

                if (userSS.inventory[1]["laptop"] == 1 || userSS.inventory[1]["laptop"] > 1) {
                    inv.addFields({ name: `:computer: Laptop | ${userSS.inventory[1]["laptop"]} `, value: `ID: 1` })
                }
                if (userSS.inventory[1]["draidplush"] == 1 || userSS.inventory[1]["draidplush"] > 1) {
                    inv.addFields({ name: `Draid plush | ${userSS.inventory[1]["draidplush"]} `, value: `ID: 2 - Collectable | Sellable` })
                }

                message.channel.send({ embeds: [inv] });
            }
        }
    }
};