const Discord = require("discord.js");
const server = require("../../models/server.js");

module.exports = {
    name: 'threadCreate',
    async execute(client, thread) {
        await thread.join()

        const serverNew = await server.findOne({ guildID: thread.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: thread.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: thread.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["threadCreate"] == true) {
            const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channelS) return;
            const threadOwner = await thread.guild.members.fetch(thread.ownerId)

            const embed = {
                title: "Thread Created",
                description: `Channel: ${thread.parent}\nThread: ${thread}\nOwner: ${threadOwner}\nPublic thread: **${thread.invitable ? "No" : "Yes"}**`,
                fields: [{ name: "Id", value: '```' + thread.id + '```' }, { name: "Name", value: '```' + thread.name + '```' }],
                thumbnail: { url: threadOwner.displayAvatarURL({ dynamic: true }) },
                color: 0x00ff00,
                timestamp: new Date()
            }

            channelS.send({ embeds: [embed] }).catch(e => { return })
        }
    },
};