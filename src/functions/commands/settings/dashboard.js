module.exports = {
    name: 'dashboard',
    aliases: ['dash', 'settings', 'server'],
    cooldown: 4,
    votedcooldown: 1,
    permissions: 'ManageGuild',
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Sends a link to the servers dashboard.',
    helpUsage: '**dashboard**',
    helpGroup: 'Settings',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        message.reply({ embeds: [{ title: `${message.guild.name}'s Dashboard`, url: `https://draid.vercel.app/dashboard/${message.guild.id}`, color: 0x3498DB }] })
    }
};