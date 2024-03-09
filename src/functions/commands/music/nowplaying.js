const wait = require('util').promisify(setTimeout);

module.exports = {
    name: `nowplaying`,
    aliases: [`np`],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to see what song is playing right now.',
    helpUsage: '**nowplaying**',
    helpGroup: 'Music',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const queue = await client.player.nodes.get(message.guild.id)
        const repeatmodes = ['Disabled', 'Track 🔂', 'Queue 🔁']
        let informationplay


        if (userS.settings[0]["lang"] == "english") {
            informationplay = () => `Queue length: \`${queue.tracks.data.length}\` | Loop mode: \`${repeatmodes[queue.repeatMode]}\` | Volume: \`${queue.filters._lastFiltersCache.volume}/100%\` | Requested by: \`${queue.currentTrack.requestedBy.username}\``
        } else if (userS.settings[0]["lang"] == "polish") {
            informationplay = () => `Długość kolejki: \`${queue.tracks.data.length}\` | Tryb powtórzenia: \`${repeatmodes[queue.repeatMode]}\` | Głośność: \`${queue.filters._lastFiltersCache.volume}/100%\` | Wybrana przez: \`${queue.currentTrack.requestedBy.username}\``
        }

        const playingmenu = new Discord.EmbedBuilder()
            .setColor(0x3498DB)

        const queueingmenu = new Discord.EmbedBuilder()
            .setColor(0x3498DB)

        const disabledbtns = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('back')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏮')
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏸')
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('resume')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('▶')
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏭')
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('stop')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji('⏹')
                    .setDisabled(true),
            );
        const disabledmenu = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('play_menu')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Play menu')
                    .setDisabled(true),
                new Discord.ButtonBuilder()
                    .setCustomId('queue_menu')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Queue menu')
                    .setDisabled(true),
            );



        let control = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('back')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏮'),
                new Discord.ButtonBuilder()
                    .setCustomId('pause')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏸'),
                new Discord.ButtonBuilder()
                    .setCustomId('resume')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('▶'),
                new Discord.ButtonBuilder()
                    .setCustomId('skip')
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji('⏭'),
                new Discord.ButtonBuilder()
                    .setCustomId('stop')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji('⏹')
            )


        let menu = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('play_menu')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Play menu'),
                new Discord.ButtonBuilder()
                    .setCustomId('queue_menu')
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setLabel('Queue menu')
            )

        let reply = queue.metadata | undefined
        let collector

        const time = 5000 * 60 * 5
        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();

        if (userS.settings[0]["lang"] == "english") {
            playingmenu.setTitle(`Media player - controller`)
            playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
            if (timestamp.progress !== 'Infinity') {
                playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
            }
        } else if (userS.settings[0]["lang"] == "polish") {
            playingmenu.setTitle(`Odtwarzacz - kontroller`)
            playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
            if (timestamp.progress !== 'Infinity') {
                playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
            }
        }

        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
        reply = await queue.metadata.channel.send({
            embeds: [playingmenu],
            components: [control, menu]
        })

        collector = reply.createMessageComponentCollector({ time: time })

        collector.on('collect', async (btnInt) => {
            if (!btnInt) return;
            btnInt.deferUpdate()
            if (btnInt.customId === "queue_menu") {

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

                reply.edit({ embeds: [queueingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "play_menu") {
                const progress = queue.node.createProgressBar();
                const timestamp = queue.node.getTimestamp();

                if (userS.settings[0]["lang"] == "english") {
                    playingmenu.setTitle(`Media player - controller`)
                    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                    if (timestamp.progress !== 'Infinity') {
                        playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
                    }
                } else if (userS.settings[0]["lang"] == "polish") {
                    playingmenu.setTitle(`Odtwarzacz - kontroler`)
                    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                    if (timestamp.progress !== 'Infinity') {
                        playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
                    }
                }
                playingmenu.setThumbnail(queue.currentTrack.thumbnail)
                reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "pause") {

                const success = queue.node.pause();
                if (userS.settings[0]["lang"] == "english") {
                    reply.edit({ embeds: [{ title: `${success ? `Paused the song!` : `The song is already paused!`}`, color: 0x3498DB, footer: { text: `Use ",resume" to resume the current track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], components: [] })
                } else if (userS.settings[0]["lang"] == "polish") {
                    reply.edit({ embeds: [{ title: `${success ? `Zatrzymano utwór!` : `Utwór jest już zatrzymany!`}`, color: 0x3498DB, footer: { text: `Użyj ",resume" aby wznowić utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], components: [] })
                }

                await wait(5000);
                if (userS.settings[0]["lang"] == "english") {
                    playingmenu.setTitle(`Media player - controller`)
                    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                } else if (userS.settings[0]["lang"] == "polish") {
                    playingmenu.setTitle(`Odtwarzacz - kontroler`)
                    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                }
                playingmenu.setThumbnail(queue.currentTrack.thumbnail)
                reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "resume") {

                const success = queue.node.resume();
                if (userS.settings[0]["lang"] == "english") {
                    reply.edit({ embeds: [{ title: `${success ? `Resumed the song!` : `The song is already resumed!`}`, color: 0x3498DB, footer: { text: `Use ",pause" to pause the current track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] })
                } else if (userS.settings[0]["lang"] == "polish") {
                    reply.edit({ embeds: [{ title: `${success ? `Wznowiono utwór!` : `Utwór jest już wznowiony!`}`, color: 0x3498DB, footer: { text: `Użyj ",pause" aby zatrzymać utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] })
                }

                await wait(5000);
                if (userS.settings[0]["lang"] == "english") {
                    playingmenu.setTitle(`Media player - controller`)
                    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                } else if (userS.settings[0]["lang"] == "polish") {
                    playingmenu.setTitle(`Odtwarzacz - kontroler`)
                    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                }
                playingmenu.setThumbnail(queue.currentTrack.thumbnail)
                reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "skip") {

                if (queue.repeatMode === 1) {
                    queue.setRepeatMode(0);
                    queue.node.skip();
                    await wait(500);
                    queue.setRepeatMode(1);
                } else {
                    queue.node.skip();
                }
                if (userS.settings[0]["lang"] == "english") {
                    reply.edit({ embeds: [{ title: `Skipped the song`, color: 0x3498DB, footer: { text: `Use ",back" to play the previous track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] })
                } else if (userS.settings[0]["lang"] == "polish") {
                    reply.edit({ embeds: [{ title: `Przewinąłem piosenkę`, color: 0x3498DB, footer: { text: `Użyj ",back" aby odtworzyć poprzedni utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] })
                }

                await wait(5000);
                if (userS.settings[0]["lang"] == "english") {
                    playingmenu.setTitle(`Media player - controller`)
                    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                } else if (userS.settings[0]["lang"] == "polish") {
                    playingmenu.setTitle(`Odtwarzacz - kontroler`)
                    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                }
                playingmenu.setThumbnail(queue.currentTrack.thumbnail)
                reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "back") {

                if (!queue.previousTracks[1]) {
                    if (userS.settings[0]["lang"] == "english") {
                        reply.edit({ embeds: [{ title: `There was is no music that was played before the current one!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist! (100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
                    } else if (userS.settings[0]["lang"] == "polish") {
                        reply.edit({ embeds: [{ title: `Nie ma muzyki, która była odtwarzana przed aktualnym!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę! (maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
                    }
                }

                await queue.history.back();
                if (userS.settings[0]["lang"] == "english") {
                    reply.edit({ embeds: [{ title: `Playing the last song that was played!`, color: 0x3498DB, footer: { text: `Use ",skip" to play the next track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    reply.edit({ embeds: [{ title: `Odtwarzam ostatnią piosenkę, która była odtwarzana!`, color: 0x3498DB, footer: { text: `Użyj ",skip" aby odtworzyć następną piosenkę!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [] });
                }

                await wait(5000);
                if (userS.settings[0]["lang"] == "english") {
                    playingmenu.setTitle(`Media player - controller`)
                    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                } else if (userS.settings[0]["lang"] == "polish") {
                    playingmenu.setTitle(`Odtwarzacz - kontroler`)
                    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
                }
                playingmenu.setThumbnail(queue.currentTrack.thumbnail)
                reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

            } else if (btnInt.customId === "stop") {
                if (queue) {
                    queue.delete();
                }
                collector.stop();
            }
        })
        collector.on('end', async () => {
            if (userS.settings[0]["lang"] == "english") {
                reply.edit({
                    embeds: [{ title: "Media player - controller", description: `This player is now unavailable, use the command "${serverS.settings[3]["prefix"]}nowplaying" for a media controler.`, color: 0x3498DB }], components: [disabledbtns, disabledmenu]
                }).then(() => setTimeout(() => {
                    message.delete()
                    reply.delete()
                }, 3000))
            } else if (userS.settings[0]["lang"] == "polish") {
                reply.edit({
                    embeds: [{ title: "Odtwarzacz - kontroler", description: `Ten odtwarzacz jest już niedostępny, użyj komendy "${serverS.settings[3]["prefix"]}nowplaying" aby zobaczyć kontroller muzyki.`, color: 0x3498DB }], components: [disabledbtns, disabledmenu]
                }).then(() => setTimeout(() => {
                    message.delete()
                    reply.delete()
                }, 3000))
            }
        });
    }
}