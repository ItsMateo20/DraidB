const { useMainPlayer } = require('discord-player');

module.exports = {
    name: `play`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to start music that you would like to play.',
    helpUsage: '**play** {Song name/URL}',
    helpGroup: 'Music',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        if (!args[0]) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `Please provide a song name or URL!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Podaj nazwę piosenki lub adres URL!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        const player = useMainPlayer();
        await player.play(message.member.voice.channel, args.join(" "), {
            requestedBy: message.author,
            nodeOptions: {
                metadata: message,
                selfDeaf: true,
                volume: 100,
                bufferingTimeout: 15000,
                leaveOnStop: true,
                leaveOnStopCooldown: 15000,
                leaveOnEnd: true,
                leaveOnEndCooldown: 15000,
                leaveOnEmpty: true,
                leaveOnEmptyCooldown: 300000,
                skipOnNoStream: true,
                skipFFmpeg: true,
            }
        }).catch(() => {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `There was an error playing the song/playlist. Try again!`, color: 0x3498DB }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Wystąpił błąd podczas odtwarzania piosenki/playlisty. Spróbuj ponownie!`, color: 0x3498DB }] });
            }
        })
    }
};