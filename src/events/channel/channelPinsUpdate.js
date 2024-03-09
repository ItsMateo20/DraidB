const server = require("../../models/server.js");

module.exports = {
    name: 'channelPinsUpdate',
    async execute(client, channel) {
        const serverNew = await server.findOne({ guildID: channel.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: channel.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: channel.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["channelPinsUpdate"] == true) {
            const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channelS) return;

            const embed = {
                title: "Channel Pinned Messages Updated",
                description: `Channel: ${channel}`,
                fields: [{ name: "Id", value: '```' + channel.id + '```' }],
                color: 0xffff00,
                timestamp: new Date()
            }

            channelS.send({ embeds: [embed] }).catch(e => { return })
        }
    }
}
