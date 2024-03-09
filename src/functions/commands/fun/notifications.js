module.exports = {
    name: `notifications`,
    aliases: ['notify'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Display notifications.',
    helpUsage: '**notifications**',
    helpGroup: 'Fun',
    helpSubcommands: ['**clear/remove** [Notification ID]'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {



        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'english') {
                const notifi = new Discord.EmbedBuilder()
                    .setTitle('Notifications')
                    .setDescription('Here will all of your notifications show up!')
                    .setColor(0x3498DB)
                    .setFooter({ text: `Use "${serverS.settings[3]["prefix"]}notifications remove" to remove all of your notifications!`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })

                message.channel.send({ embeds: [notifi] })
            } else if (userS.settings[0]["lang"] == 'polish') {
                const notifi = new Discord.EmbedBuilder()
                    .setTitle('Powiadomienia')
                    .setDescription('Tutaj wszystkie twoje powiadomienia sie pojawią!')
                    .setColor(0x3498DB)
                    .setFooter({ text: `Użyj "${serverS.settings[3]["prefix"]}notifications remove" by usunąć wszystkie swoje powiadomienia!`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })

                message.channel.send({ embeds: [notifi] })
            }
        } else if (args[0]) {
            if (args[0] == 'remove' || args[0] == 'clear') {
                if (!args[1]) {




                    //========
                    if (userS.settings[0]["lang"] == 'english') {
                        message.channel.send({
                            embeds: [{
                                title: `You have deleted all of your notifications!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        message.channel.send({
                            embeds: [{
                                title: `Usunełeś wszystkie swoje powiadomienia!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }
            }
        }
    }
};