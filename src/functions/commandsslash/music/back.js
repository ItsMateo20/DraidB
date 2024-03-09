const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "back",
    musiccmd: true,
    data: new SlashCommandBuilder()
        .setName('back')
        .setNameLocalizations({
            "pl": "cofnij"
        })
        .setDescription('Plays the last song that was playing.')
        .setDescriptionLocalizations({
            "pl": "Odtwarza ostatnią piosenkę, która była odtwarzana."
        }),
    async execute(client, interaction, serverS, userS, serveruserS) {
        const inter = interaction;
        const queue = client.player.nodes.get(inter.guild.id);
        if (!queue) {
            if (userS.settings[0]["lang"] == "english") {
                return inter.editReply({ embeds: [{ title: `There is no song currently playing!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return inter.editReply({ embeds: [{ title: `Nie gra żadna piosenka!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            }
        }
        if (!queue.history.previousTrack) {
            if (userS.settings[0]["lang"] == "english") {
                return inter.editReply({ embeds: [{ title: `There was is no music that was played before the current one!`, color: 0x3498DB, footer: { text: `Use ${serverS.settings[3]["prefix"]}play to play a track or a hole playlist! (100 tracks max from playlists)`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return inter.editReply({ embeds: [{ title: `Nie ma muzyki, która była odtwarzana przed bieżącą!`, color: 0x3498DB, footer: { text: `Użyj ${serverS.settings[3]["prefix"]}play, aby odtworzyć piosenkę lub playlistę! (maksymalnie 100 piosenek z playlisty)`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            }
        }

        await queue.history.back();
        if (userS.settings[0]["lang"] == "english") {
            return inter.editReply({ embeds: [{ title: `Playing the last song that was played!`, color: 0x3498DB, footer: { text: `Use ${serverS.settings[3]["prefix"]}skip to play the track that was going to be played!`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return inter.editReply({ embeds: [{ title: `Odtwarza ostatnią piosenkę, która była odtwarzana!`, color: 0x3498DB, footer: { text: `Użyj ${serverS.settings[3]["prefix"]}skip, aby odtworzyć piosenkę, która zostanie odtworzona!`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
        }
    },
};