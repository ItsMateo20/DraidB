module.exports = {
    name: 'sayembed',
    cooldown: 4,
    votedcooldown: 1,
    dev: true,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Sends a embed message that the user has typed.',
    helpUsage: '**sayembed** {message}',
    helpGroup: 'Devs',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        message.delete()
        let embedmsg = args.slice(0).join(' ');
        const newEmbed = new Discord.EmbedBuilder()
            .setColor(0x3498DB)
            .setDescription(embedmsg)
        message.channel.send({ embeds: [newEmbed] })
    }
}