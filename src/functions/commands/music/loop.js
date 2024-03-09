module.exports = {
    name: `loop`,
    aliases: ['repeat'],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to loop the same song over and over.',
    helpUsage: '**loop** [queue/track/off]',
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

        let mode
        if (args[0] == "0" || args[0] == 'off' || args[0] == "none") {
            mode = 0;
        } else if (args[0] == "1" || args[0] == 'one' || args[0] == 'single' || args[0] == 'song' || args[0] == 'track') {
            mode = 1;
        } else if (args[0] == "2" || args[0] == 'all' || args[0] == 'queue' || args[0] == 'playlist') {
            mode = 2;
        } else {
            mode = 0;
        }
        queue.setRepeatMode(mode);
        const reaction = ['', '🔂', '🔁']
        if (mode !== 0) {
            message.react(reaction[mode]).catch(() => { return; });
        }

        const methods = ['Off', 'Track 🔂', 'Queue 🔁']

        if (mode == 0 && args[0] !== 'off' && args[0] !== 'none' && args[0] !== '0') {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `Reset loop mode to ${methods[mode]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Zresetowano tryb pętli na ${methods[mode]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        if (userS.settings[0]["lang"] == "english") {
            return message.channel.send({ embeds: [{ title: `Set loop mode to ${methods[mode]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.channel.send({ embeds: [{ title: `Ustawiono tryb pętli na ${methods[mode]}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        }
    }
};