

module.exports = {
    name: `help`,
    aliases: ['h'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],

    helpDescription: 'Shows all commands.',
    helpUsage: '**help** [command]',
    helpGroup: 'Help',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        if (userS.settings[0]["lang"] == "english") {
            return message.reply({ embeds: [{ description: "Check of all the bots commands [here](https://draid.vercel.app/commands)", color: 0x3498DB }], allowedMentions: { repliedUser: false } })
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.reply({ embeds: [{ description: "Sprawdź wszystkie komendy bota [here](https://draid.vercel.app/commands)", color: 0x3498DB }], allowedMentions: { repliedUser: false } })
        }
    }
}
