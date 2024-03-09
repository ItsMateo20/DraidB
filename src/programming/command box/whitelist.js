module.exports = {
    name: `whitelist`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SEND_MESSAGES', 'EMBED_LINKS'],

    helpDescription: `Changes a user to developer`,
    helpUsage: `**whitelist**`,
    helpGroup: `Fun`,
    helpSubcommands: [`**on** {userId}`, `**off** {userId}`],
    async execute(client, ERRORCATCHER, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        let userId = args[0]
        if (targett) {
            userId = targett.id
        }
        let userSS
        userSS = await user.findOne({ userId: userId })


        if (userSS) {
            if (args[1] == "on") {
                if (userSS.profile[0]["developer"] == false) {
                    userSS.profile.set(0, { developer: true })
                    userSS.save().catch(ERRORCATCHER)
                    if (userS.settings[0]["lang"] == "english") {
                        return message.channel.send({ embeds: [{ title: `Whitelisted ${userId}!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.channel.send({ embeds: [{ title: `Dodano ${userId} do białej listy!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    }
                } else if (userSS.profile[0]["developer"] == true) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.channel.send({ embeds: [{ title: `${userId} is already in the whitelist!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.channel.send({ embeds: [{ title: `${userId} już jest w białej liscie!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    }
                }
            } else if (args[1] == "off") {
                if (userSS.profile[0]["developer"] == true) {
                    userSS.profile.set(0, { developer: false })
                    userSS.save().catch(ERRORCATCHER)
                    if (userS.settings[0]["lang"] == "english") {
                        return message.channel.send({ embeds: [{ title: `UnWhitelisted ${userId}!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.channel.send({ embeds: [{ title: `Usunięto ${userId} z białej listy!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    }
                } else if (userSS.profile[0]["developer"] == false) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.channel.send({ embeds: [{ title: `${userId} wasn't in the whitelist!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.channel.send({ embeds: [{ title: `${userId} już nie był w białej liscie!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                    }
                }
            } else if (!args[1]) {
                if (userS.settings[0]["lang"]) {
                    return message.channel.send({ embeds: [{ title: `You didnt specify if you wanted to whitelist of unwhitelist that user!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.channel.send({ embeds: [{ title: `Nie wskazano czy chcesz dodać czy usunąć użytkownika z białej listy!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                }
            }
        } else if (!userSS) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `User ${userId} doesn't exist!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Użytkownik ${userId} nie istnieje!`, color: 0x3498DB, footer: { text: `https://draid.ddns.net`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }
    }
};