module.exports = {
    name: `queue`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to see the list of songs that are about to play.',
    helpUsage: '**queue**',
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

        const queueingmenu = new Discord.EmbedBuilder()
            .setColor(0x3498DB)

        if (!queue.tracks.data[0]) {
            if (userS.settings[0]["lang"] == "english") {
                return reply.edit({ embeds: [{ title: `There are no other songs in the queue than the current one!`, color: 0x3498DB, footer: { text: `Use ",play" to add track or a hole playlist to the queue! (100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [control, menu] })
            } else if (userS.settings[0]["lang"] == "polish") {
                return reply.edit({ embeds: [{ title: `W kolejce nie ma innych piosenek niż obecny`, color: 0x3498DB, footer: { text: `Użyj ",play" aby dodać utwór lub playlistę do kolejki! (maksymalnie 100 utworów z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [control, menu] })
            }
        }


        if (userS.settings[0]["lang"] == "english") {
            const tracks = queue.tracks.data.map((track, i) => `**\`${++i}\`** - [${track.title}](${track.url}) (${`\`${track.duration}\``}) | Requested by - ${track.requestedBy.username}`);
            queueingmenu.setTitle(`Media player - queue`)
            queueingmenu.setDescription(`**Playing now**:\n[${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n\n**Pending tracks:**\n${tracks.slice(0, 8).join('\n\n')}${tracks.length > 8 ? `\n\n**${tracks.length - 8}** more tracks...` : ''}`)
        } else if (userS.settings[0]["lang"] == "polish") {
            const tracks = queue.tracks.data.map((track, i) => `**\`${++i}\`** - [${track.title}](${track.url}) (${`\`${track.duration}\``}) | Wybrana przez - ${track.requestedBy.username}`);
            queueingmenu.setTitle(`Odtwarzacz - kolejka`)
            queueingmenu.setDescription(`**Aktualnie odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n\n**Pozostałe piosenki:**\n${tracks.slice(0, 8).join('\n\n')}${tracks.length > 8 ? `\n\n**${tracks.length - 8}** wiecej piosenek...` : ''}`)
        }

        message.channel.send({ embeds: [queueingmenu] });
    }
};