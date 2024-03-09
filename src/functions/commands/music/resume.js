module.exports = {
    name: `resume`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'This command allows you to resume a song.',
    helpUsage: '**resume**',
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

        const success = queue.node.resume();
        message.react('▶️').catch(() => { return; });
        if (userS.settings[0]["lang"] == "english") {
            return message.channel.send({ embeds: [{ title: `${success ? `Resumed the song!` : `There was an error resuming the song!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.channel.send({ embeds: [{ title: `${success ? `Wznowiona piosenka!` : `Wystąpił błąd przy wznowieniu piosenki!`}`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
        }
    }
};