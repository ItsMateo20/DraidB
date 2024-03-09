module.exports = {
    name: 'saylink',
    cooldown: 4,
    votedcooldown: 1,
    dev: true,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Sends a embed title link that the user has typed.',
    helpUsage: '**saylink** {link} {message}',
    helpGroup: 'Devs',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        let link = (args[0])
        let msg = args.slice(1).join(' ');
        message.delete()
        const newEmbed = new Discord.EmbedBuilder()
            .setColor(0x3498DB)
            .setTitle(msg)
            .setURL(link)
        message.channel.send({ embeds: [newEmbed] })
    }
}