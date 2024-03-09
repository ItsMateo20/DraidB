const server = require("../../models/server.js");

module.exports = {
    name: 'emojiCreate',
    async execute(client, emoji) {
        const serverNew = await server.findOne({ guildID: emoji.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: emoji.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: emoji.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["emojiCreate"] == true) {
            const channel = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channel) return;
            const embed = {
                title: "Emoji Created",
                fields: [
                    { Name: 'Name:', Value: '```' + emoji.name + '```' },
                    { Name: 'Animated', Value: '```' + emoji.animated + '```' },
                    { Name: 'Id', Value: '```' + emoji.id + '```' }
                ],
                image: { url: emoji.url },
                color: 0x00ff00,
            }

            channel.send({ embeds: [embed] }).catch(e => { return })
        }
    }
}
