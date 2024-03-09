
module.exports = {
    name: 'invite',
    aliases: ['vote'],
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Important links to the bot',
    helpUsage: '**invite**',
    helpGroup: 'Others',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        //invite command id:4

        if (userS.settings[0]["lang"] == 'polish') {
            const newEmbed = new Discord.EmbedBuilder()
                .setColor(0x3498DB)
                .setTitle('Pozyteczne linki')
                .setDescription('[Dodaj Draid](https://discord.com/api/oauth2/authorize?client_id=831829384884518923&permissions=1641953094902&scope=applications.commands%20bot) \n [Support serwer](https://discord.gg/YeF9TXQnwd) \n [Top.gg](https://top.gg/bot/831829384884518923)')
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
            message.channel.send({ embeds: [newEmbed] });
        } else if (userS.settings[0]["lang"] == 'english') {
            const newEmbed = new Discord.EmbedBuilder()
                .setColor(0x3498DB)
                .setTitle('Inportant links')
                .setDescription("[Add Draid](https://discord.com/api/oauth2/authorize?client_id=831829384884518923&permissions=1641953094902&scope=applications.commands%20bot) \n [Support server](https://discord.gg/YeF9TXQnwd) \n [Top.gg](https://top.gg/bot/831829384884518923)")
                .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
            message.channel.send({ embeds: [newEmbed] });
        }
    }
};
