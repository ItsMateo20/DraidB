const server = require("../../models/server.js");

module.exports = {
    name: 'emojiDelete',
    async execute(client, emoji) {
        const serverNew = await server.findOne({ guildID: emoji.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: emoji.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: emoji.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["emojiDelete"] == true) {
            const channel = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channel) return;
            const embed = {
                title: "Emoji Deleted",
                fields: [
                    { Name: 'Name:', Value: '```' + emoji.name + '```' },
                    { Name: 'Animated', Value: '```' + emoji.animated + '```' },
                    { Name: 'Id', Value: '```' + emoji.id + '```' }
                ],
                image: { url: emoji.url },
                color: 0xff0000,
            }

            channel.send({ embeds: [embed] }).catch(e => { return })
        }
    }
}
