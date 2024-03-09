const { SlashCommandBuilder } = require('discord.js');
const { getSong } = require("genius-lyrics-api");
const { StringUtils } = require("devtools-ts");
const { chunkSubString } = new StringUtils();

module.exports = {
    name: "lyrics",
    musiccmd: true,
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setNameLocalizations({
            "pl": "tekst"
        })
        .setDescription('Get the lyrics for the playing/requested song title.')
        .setDescriptionLocalizations({
            "pl": "Pobierz tekst piosenki odtwarzanej/żądanej."
        })
        .addStringOption(option =>
            option.setName('title')
                .setNameLocalizations({
                    "pl": "tytuł"
                })
                .setDescription('The title of the song you want to get the lyrics for.')
                .setDescriptionLocalizations({
                    "pl": "Tytuł piosenki, dla której chcesz uzyskać tekst."
                })
                .setRequired(false))
        .addStringOption(option =>
            option.setName('author')
                .setNameLocalizations({
                    "pl": "autor"
                })
                .setDescription('The author of the song you want to get the lyrics for.')
                .setDescriptionLocalizations({
                    "pl": "Autor piosenki, dla której chcesz uzyskać tekst."
                })
                .setRequired(false)),
    async execute(client, interaction, serverS, userS, serveruserS) {
        const inter = interaction;
        const args1 = inter.options.getString('title');
        const args2 = inter.options.getString('author');

        await inter.deferReply();

        const queue = client.player.nodes.get(inter.guild.id);
        let songTitle;
        let songAuthor;

        if (args1) {
            songTitle = args1
            songAuthor = " "
            if (args2) {
                songAuthor = args2
            }
        } else {
            if (!queue) {
                if (userS.settings[0]["lang"] == "english") {
                    return inter.editReply({ embeds: [{ title: "There is no music playing to search for lyrics!, Give me the song name instead.", color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return inter.editReply({ embeds: [{ title: "Nie ma muzyki, która by była odtwarzana, podaj nazwę piosenki!", color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
                }
            }

            if (queue.currentTrack.title) {
                songTitle = queue.currentTrack.title;
                songAuthor = queue.currentTrack.author;

                const filterName = queue.currentTrack.title.indexOf("(");

                if (filterName !== -1) {
                    songTitle = songTitle.slice(0, filterName);
                }
            }
        }

        try {
            const lyricsOptions = {
                apiKey: process.env.GENIUS_TOKEN,
                title: songTitle,
                artist: songAuthor,
                optimizeQuery: true,
            };

            const lyrics = await getSong(lyricsOptions);
            if (!lyrics || lyrics.lyrics == null) {
                if (userS.settings[0]["lang"] == "english") {
                    return inter.editReply({ embeds: [{ title: `I could not find any lyrics for this song!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return inter.editReply({ embeds: [{ title: `Nie znalazłem żadnych słów dla tego utworu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
                }
            }

            const lyricsEmbed = {
                0: {
                    color: 0x3498DB,
                    title: `${lyrics.title}`,
                    description: `${lyrics.lyrics}`,
                    thumbnail: {
                        url: `${lyrics.albumArt}`,
                    },
                    footer: {
                        text: `Provided by Genius`,
                        icon_url: `${inter.user.avatarURL({ dynamic: true })}`
                    }
                },
                1: {
                    color: 0x3498DB,
                    title: `${lyrics.title}`,
                    description: `${lyrics.lyrics}`,
                    thumbnail: {
                        url: `${lyrics.albumArt}`,
                    },
                },
                2: {
                    color: 0x3498DB,
                    description: `${lyrics.lyrics}`,
                    footer: {
                        text: `Provided by Genius`,
                        icon_url: `${inter.user.avatarURL({ dynamic: true })}`
                    }
                }
            }



            if (userS.settings[0]["lang"] == "english") {
                lyricsEmbed[0].footer = { text: `Provided by Genius`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` }
                lyricsEmbed[2].footer = { text: `Provided by Genius`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` }
            } else if (userS.settings[0]["lang"] == "polish") {
                lyricsEmbed[0].footer = { text: `Dostarczone przez Genius`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` }
                lyricsEmbed[2].footer = { text: `Dostarczone przez Genius`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` }
            }

            if (lyrics.lyrics.length > 4096) {
                const chunkLyrics = chunkSubString(lyrics.lyrics, 4096);
                let i = 0
                chunkLyrics.forEach(async (str) => {
                    i++
                    lyricsEmbed[i].description = str;
                    return inter.channel.send({ embeds: [lyricsEmbed[i]] });
                });
                inter.deleteReply();
            } else {
                return inter.editReply({ embeds: [lyricsEmbed[0]] });
            }
        } catch (error) {
            if (userS.settings[0]["lang"] == "english") {
                await inter.editReply({ embeds: [{ title: `I could not get the lyrics of this requested song!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                await inter.editReply({ embeds: [{ title: `Nie mogę pobrać tekstu tego utworu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            }
            client.outputsend("Error", error)
        }
    },
};