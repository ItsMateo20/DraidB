const { SlashCommandBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    name: "play",
    musiccmd: true,
    data: new SlashCommandBuilder()
        .setName('play')
        .setNameLocalizations({
            "pl": "graj"
        })
        .setDescription('This command allows you to start music that you would like to play.')
        .setDescriptionLocalizations({
            "pl": "Ta komenda pozwala ci rozpocząć muzykę, którą chcesz odtworzyć."
        })
        .addStringOption(option =>
            option.setName('title')
                .setNameLocalizations({
                    "pl": "tytuł"
                })
                .setDescription('The title of the song or URL you want to play.')
                .setDescriptionLocalizations({
                    "pl": "Tytuł piosenki lub adres URL, który chcesz odtworzyć."
                })
                .setRequired(false)),
    async execute(client, interaction, serverS, userS, serveruserS) {
        const inter = interaction;
        const args = inter.options.getString('title');
        const queue = client.player.nodes.get(inter.guild.id);

        await inter.deferReply();

        if (!args) {
            if (queue) {
                const success = queue.node.resume();
                if (userS.settings[0]["lang"] == "english") {
                    return inter.editReply({ embeds: [{ title: `${success ? `Resumed the song!` : `There was an error resuming the song!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                } else if (userS.settings[0]["lang"] == "polish") {
                    return inter.editReply({ embeds: [{ title: `${success ? `Wznowiona piosenka!` : `Wystąpił błąd przy wznowieniu piosenki!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
                }
            }
            if (userS.settings[0]["lang"] == "english") {
                return inter.editReply({ embeds: [{ title: `Please provide a song name or URL!`, color: 0x3498DB }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return inter.editReply({ embeds: [{ title: `Podaj nazwę piosenki lub adres URL!`, color: 0x3498DB }] });
            }
        }


        const player = useMainPlayer();
        await player.play(inter.member.voice.channel, args, {
            requestedBy: inter.user,
            nodeOptions: {
                metadata: {
                    channel: inter.channel,
                    author: inter.user,
                    member: inter.member,
                    guild: inter.guild
                },
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
                return inter.editReply({ embeds: [{ title: `There was an error playing the song/playlist. Try again!`, color: 0x3498DB }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return inter.editReply({ embeds: [{ title: `Wystąpił błąd podczas odtwarzania piosenki/playlisty. Spróbuj ponownie!`, color: 0x3498DB }] });
            }
        });

        inter.deleteReply();
    },
};