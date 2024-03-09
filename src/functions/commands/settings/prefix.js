module.exports = {
    name: `prefix`,
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'ManageGuild',
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],

    helpDescription: 'Sets the bot\'s prefix for the server.',
    helpUsage: '**prefix** {prefix}',
    helpGroup: 'Settings',
    helpSubcommands: ['**set** {prefix}'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{ title: `Serwera prefix:**${serverS.settings[3]["prefix"]}**`, color: 0x3498DB, footer: { text: `Użyj "${serverS.settings[3]["prefix"]}prefix set" aby ustwaić serwera prefix`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{ title: `Server prefix:**${serverS.settings[3]["prefix"]}**`, color: 0x3498DB, footer: { text: `Use "${serverS.settings[3]["prefix"]}prefix set" to set server prefix`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0] == "set" || args[0]) {
            let prefixset = "ERROR 404"
            if (args[0] && !args[1]) {
                prefixset = args[0]
            } else if (args[0] && args[1]) {
                prefixset = args[1]
            }
            serverS.settings.set(3, { prefix: prefixset, disallowedcommandchannels: serverS.settings[3]["disallowedcommandchannels"] });
            serverS.save().catch((err) => client.outputsend("Error", err));
            if (userS.settings[0]["lang"] == 'polish') {
                return message.channel.send({
                    embeds: [{
                        title: `Prefix ustawiony na \`${prefixset}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{
                        title: `Prefix set to \`${prefixset}\``, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

    }
};