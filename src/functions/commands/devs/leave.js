module.exports = {
    name: 'leave',
    cooldown: 4,
    votedcooldown: 1,
    dev: true,
    botpermission: ['SendMessages'],

    helpDescription: 'Leaves the server.',
    helpUsage: '**leave**',
    helpGroup: 'Devs',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        message.channel.send('https://tenor.com/view/puffybear-puffy-face-cute-bye-gif-12628645').then(message => {
            message.guild.leave()
        })
    }
};