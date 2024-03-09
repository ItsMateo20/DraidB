const Discord = require("discord.js");
const server = require("../../models/server.js");

module.exports = {
    name: 'threadDelete',
    async execute(client, thread) {
        const serverNew = await server.findOne({ guildID: thread.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: thread.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: thread.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["threadDelete"] == true) {
            const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channelS) return;

            let threadInfo = 'Id: ```' + thread.id + '```\nName: ```' + thread.name + '```'
            const threadOwner = await thread.guild.members.fetch(thread.ownerId)

            const embed = {
                title: "Thread Deleted",
                description: `Channel: ${thread.parent}\nThread: **#${thread.name}**\nOwner: ${threadOwner}\nMessage count: ${thread.messageCount}\nMember count: ${thread.memberCount}`,
                fields: [{ name: "Id", value: '```' + thread.id + '```' }, { name: "Name", value: '```' + thread.name + '```' }],
                thumbnail: { url: threadOwner.displayAvatarURL({ dynamic: true }) },
                color: 0xff0000,
                timestamp: new Date()
            }

            channelS.send({ embeds: [embed] }).catch(e => { return })
        }
    },
};