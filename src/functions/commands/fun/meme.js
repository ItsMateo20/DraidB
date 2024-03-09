const https = require('https');
const limit = 150;
const url = 'https://www.reddit.com/r/memes/hot/.json?limit=' + limit;

module.exports = {
    name: "meme",
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'AttachFiles'],

    helpDescription: 'Display a random meme.',
    helpUsage: '**meme**',
    helpGroup: 'Fun',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        https.get(url, (result) => {
            var body = ''
            result.on('data', (chunk) => {
                body += chunk
            })

            result.on('end', () => {
                var response = JSON.parse(body)
                var index = response.data.children[Math.floor(Math.random() * (limit - 1)) + 1].data
                var image = index.url
                var title = index.title
                var link = 'https://reddit.com' + index.permalink
                var subRedditName = index.subreddit_name_prefixed
                var text = index.selftext
                if (index.post_hint !== 'image') {
                    const textembed = new Discord.EmbedBuilder()
                        .setTitle(subRedditName)
                        .setColor(0x3498DB)
                        .setDescription(`[${title}](${link})\n\n${text}`)
                        .setURL(`https://reddit.com/${subRedditName}`)

                    message.channel.send({ embeds: [textembed] })
                } else {
                    const imageembed = new Discord.EmbedBuilder()
                        .setTitle(subRedditName)
                        .setImage(image)
                        .setColor(0x3498DB)
                        .setDescription(`[${title}](${link})`)
                        .setURL(`https://reddit.com/${subRedditName}`)
                    message.channel.send({ embeds: [imageembed] })
                }
            }).on('error', function (e) {
                if (e) throw (e)
            })
        })
    }
};