module.exports = {
    name: `notepad`,
    aliases: ['ntp', 'np'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'ManageMessages'],

    helpDescription: 'Sends the message that the user has typed into the notepad.',
    helpUsage: '**notepad** {write/get} (message)',
    helpGroup: 'Settings',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        if (!args[0]) {
            if (userS.settings[0]["lang"] === "english") {
                return message.channel.send({
                    embeds: [{
                        title: `Use '${serverS.settings[3]["prefix"]}notepad write' to write a note or '${serverS.settings[3]["prefix"]}notepad get' to get your note`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] === "polish") {
                return message.channel.send({
                    embeds: [{
                        title: `Użyj '${serverS.settings[3]["prefix"]}notepad write' aby zapisać notatkę lub '${serverS.settings[3]["prefix"]}notepad get' aby pobrać notatkę`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }
        if (args[0] == 'write' || args[0] == 'set') {
            const messageargs = args.slice(1).join(" ");
            userS.settings.set(1, { notepad: messageargs })
            userS.save().catch((err) => client.outputsend("Error", err))

            if (userS.settings[0]["lang"] === "english") {
                message.channel.send({
                    embeds: [{
                        title: `Note saved`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] === "polish") {
                message.channel.send({
                    embeds: [{
                        title: `Notatka zapisana`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0] == 'get') {
            if (userS.settings[0]["lang"] === "english") {
                message.channel.send({
                    embeds: [{
                        title: `**Notepad**`, description: `**${userS.settings[1]["notepad"]}**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] === "polish") {
                message.channel.send({
                    embeds: [{
                        title: `**Notatnik**`, description: `**${userS.settings[1]["notepad"]}**`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                    }]
                }).catch((err) => client.outputsend("Error", err));
            }
        }
    }
};