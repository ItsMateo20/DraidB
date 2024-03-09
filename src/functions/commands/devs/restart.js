module.exports = {
    name: `restart`,
    aliases: ['rest'],
    cooldown: 60,
    votedcooldown: 30,
    dev: true,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Restarts the bot.',
    helpUsage: '**restart**',
    helpGroup: 'Devs',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        if (userS.settings[0]["lang"] == 'polish') {
            message.channel.send({
                embeds: [{
                    title: `Uruchomiono ponownie`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err)).then((message) => {
                return client.shard.broadcastEval(async (c) => {
                    // await c.user.setActivity(`${c.config.DefaultRestartActivity}${c.shard.ids[0] + 1}`, { type: 'LISTENING' });
                    process.exit(0);
                })
            })
        } else if (userS.settings[0]["lang"] == 'english') {
            message.channel.send({
                embeds: [{
                    title: `Restarted`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
            }).catch((err) => client.outputsend("Error", err)).then((message) => {
                return client.shard.broadcastEval(async (c) => {
                    // await c.user.setActivity(`${c.config.DefaultRestartActivity}${c.shard.ids[0] + 1}`, { type: 'LISTENING' });
                    process.exit(0);
                })
            })
        }
    }
};