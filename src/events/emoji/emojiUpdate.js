const server = require("../../models/server.js");

module.exports = {
    name: 'emojiUpdate',
    async execute(client, oldEmoji, emoji) {
        const serverNew = await server.findOne({ guildID: emoji.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: emoji.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: emoji.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["emojiUpdate"] == true) {
            const channel = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channel) return;
            const embed = {
                title: "Emoji Updated",
                fields: [
                    { Name: 'Name:', Value: '```Old: ' + oldEmoji.name + '\nNew: ' + emoji.name + '```' },
                    { Name: 'Id', Value: '```' + emoji.id + '```' }
                ],
                color: 0xffff00,
            }

            channel.send({ embeds: [embed] }).catch(e => { return })
        }
    }
}
