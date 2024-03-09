const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: "skip",
    musiccmd: true,
    data: new SlashCommandBuilder()
        .setName('skip')
        .setNameLocalizations({
            "pl": "pomiń"
        })
        .setDescription('This command allows you to skip music that you would not like to listen to.')
        .setDescriptionLocalizations({
            "pl": "Ta komenda pozwala ci pominąć muzykę, której nie chcesz słuchać."
        }),
    async execute(client, interaction, serverS, userS, serveruserS) {
        const inter = interaction;
        const queue = client.player.nodes.get(inter.guild.id);

        await inter.deferReply();

        if (!queue) {
            if (userS.settings[0]["lang"] == "english") {
                return inter.editReply({ embeds: [{ title: `There is no song currently playing!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return inter.editReply({ embeds: [{ title: `Nie gra żadna piosenka!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
            }
        }

        if (queue.repeatMode === 1) {
            queue.setRepeatMode(0);
            queue.node.skip();
            await wait(500);
            queue.setRepeatMode(1);
        } else {
            queue.node.skip();
        }

        if (userS.settings[0]["lang"] == "english") {
            return inter.editReply({ embeds: [{ title: `Skipped the song`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return inter.editReply({ embeds: [{ title: `Przewinołem piosenkę`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${inter.user.avatarURL({ dynamic: true })}` } }] });
        }
    },
};