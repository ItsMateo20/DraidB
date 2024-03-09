module.exports = {
    name: `stop`,
    aliases: ['end'],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to stop the song.',
    helpUsage: '**stop**',
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

        if (!queue.deleted) queue.delete();

        if (userS.settings[0]["lang"] == "english") {
            return message.channel.send({ embeds: [{ title: `Destroyed the media player`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.channel.send({ embeds: [{ title: `Zniszczono odtwarzacz`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        }
        message.react('👋🏻').catch(() => { return; });
    }
};