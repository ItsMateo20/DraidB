module.exports = {
    name: `back`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'Plays the last song that was playing.',
    helpUsage: '**back**',
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
        if (!queue.history.previousTrack) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `There was is no music that was played before the current one!`, color: 0x3498DB, footer: { text: `Use ${serverS.settings[3]["prefix"]}play to play a track or a hole playlist! (100 tracks max from playlists)`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Nie ma muzyki, która była odtwarzana przed bieżącą!`, color: 0x3498DB, footer: { text: `Użyj ${serverS.settings[3]["prefix"]}play, aby odtworzyć piosenkę lub playlistę! (maksymalnie 100 piosenek z playlisty)`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        await queue.history.back();
        message.react('⏮').catch(() => { return; });
        if (userS.settings[0]["lang"] == "english") {
            return message.channel.send({ embeds: [{ title: `Playing the last song that was played!`, color: 0x3498DB, footer: { text: `Use ${serverS.settings[3]["prefix"]}skip to play the track that was going to be played!`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.channel.send({ embeds: [{ title: `Odtwarza ostatnią piosenkę, która była odtwarzana!`, color: 0x3498DB, footer: { text: `Użyj ${serverS.settings[3]["prefix"]}skip, aby odtworzyć piosenkę, która zostanie odtworzona!`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        }
    }
};