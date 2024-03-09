module.exports = {
    name: `avatar`,
    aliases: ['pfp', 'av', 'pic', 'png'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'AttachFiles'],

    helpDescription: `Display avatar`,
    helpUsage: `**avatar** [@user]`,
    helpGroup: `Fun`,
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        const newEmbed = new Discord.EmbedBuilder()
            .setTitle(target.username)
            .setColor(0x3498DB)
            .setImage(target.avatarURL({ dynamic: true }))

        return message.channel.send({ embeds: [newEmbed] });
    }
};