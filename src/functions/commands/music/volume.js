module.exports = {
    name: `volume`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to change the volume of the song.',
    helpUsage: '**volume**',
    helpGroup: 'Music',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const queue = client.player.nodes.get(message.guild.id);
        if (!queue) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `There is no song currently playing!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Nie gra żadna piosenka!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }


        const vol = parseInt(args[0]);

        if (!vol) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `The current volume is at ${queue.filters._lastFiltersCache.volume}%`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Aktualny poziom głośności to ${queue.filters._lastFiltersCache.volume}%`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        if (queue.filters._lastFiltersCache.volume === vol) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `You can\'t set the volume to the same value as the current volume!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Nie możesz ustawić poziomu głośności na taki sam jak aktualny poziom głośności!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        if (vol < 0 || vol > 100) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `The volume must be between 0% and 100%!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Poziom głośności musi być pomiędzy 0% a 100%!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        const success = queue.node.setVolume(vol);
        if (userS.settings[0]["lang"] == "english") {
            message.channel.send({ embeds: [{ title: `${success ? `The volume has been modified to **\`${vol}**/**100%\`**` : `There was an error changing the volume!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            message.channel.send({ embeds: [{ title: `${success ? `Poziom głośności został zmieniony na **\`${vol}**/**100%\`**` : `Wystąpił błąd podczas zmiany poziomu głośności!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        }

        if (vol == 0) {
            message.react('🔇').catch(() => { return; });
        } else if (vol >= 49 && vol > 1) {
            message.react('🔈').catch(() => { return; });
        } else if (vol == 50) {
            message.react('🔉').catch(() => { return; });
        } else if (vol <= 75) {
            message.react('🔊').catch(() => { return; });
        }
    }
};