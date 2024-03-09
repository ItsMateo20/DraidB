module.exports = {
    name: 'saymsg',
    cooldown: 4,
    votedcooldown: 1,
    dev: true,
    botpermission: ['SendMessages', 'ManageMessages'],

    helpDescription: 'Sends a message that the user has typed.',
    helpUsage: '**saymsg** {message}',
    helpGroup: 'Devs',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        let msg = args.slice(0).join(' ');
        message.delete()
        message.channel.send(`${msg}`)
    }
}