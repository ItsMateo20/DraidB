const { getSong } = require("genius-lyrics-api");
const { StringUtils } = require("devtools-ts");
const { chunkSubString } = new StringUtils();

module.exports = {
    name: `lyrics`,
    aliases: ['ly'],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Get the lyrics for the playing/requested song title.',
    helpUsage: '**lyrics** [song title]',
    helpGroup: 'Music',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const queue = client.player.nodes.get(message.guild.id);
        const songString = args.join(" ");
        let songTitle;
        let songAuthor;

        message.channel.sendTyping();

        if (songString) {
            songTitle = songString;
            songAuthor = " "
        } else {
            if (!queue) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.channel.send({ embeds: [{ title: "There is no music playing to search for lyrics!, Give me the song name instead.", color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.channel.send({ embeds: [{ title: "Nie ma muzyki, która by była odtwarzana, podaj nazwę piosenki!", color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
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
                    return message.channel.send({ embeds: [{ title: `I could not find any lyrics for this song!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.channel.send({ embeds: [{ title: `Nie znalazłem żadnych słów dla tego utworu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
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
                        icon_url: `${message.author.avatarURL({ dynamic: true })}`
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
                        icon_url: `${message.author.avatarURL({ dynamic: true })}`
                    }
                }
            }



            if (userS.settings[0]["lang"] == "english") {
                lyricsEmbed[0].footer = { text: `Provided by Genius`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                lyricsEmbed[2].footer = { text: `Provided by Genius`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
            } else if (userS.settings[0]["lang"] == "polish") {
                lyricsEmbed[0].footer = { text: `Dostarczone przez Genius`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                lyricsEmbed[2].footer = { text: `Dostarczone przez Genius`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
            }

            if (lyrics.lyrics.length > 4096) {
                const chunkLyrics = chunkSubString(lyrics.lyrics, 4096);
                let i = 0
                chunkLyrics.forEach(async (str) => {
                    i++
                    lyricsEmbed[i].description = str;
                    return message.channel.send({ embeds: [lyricsEmbed[i]] });
                });
            } else {
                return message.channel.send({ embeds: [lyricsEmbed[0]] });
            }
        } catch (error) {
            if (userS.settings[0]["lang"] == "english") {
                await message.channel.send({ embeds: [{ title: `I could not get the lyrics of this requested song!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                await message.channel.send({ embeds: [{ title: `Nie mogę pobrać tekstu tego utworu!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
            client.outputsend("Error", error)
        }
    },
};