const Discord = require("discord.js");
const server = require("../../models/server.js");

const prettyMilliseconds = require('pretty-ms');

module.exports = {
    name: 'threadUpdate',
    async execute(client, threadOld, thread) {
        if (threadOld.parent == thread.parent &&
            threadOld.name == thread.name &&
            threadOld.archived == thread.archived &&
            threadOld.locked == thread.locked &&
            threadOld.rateLimitPerUser == thread.rateLimitPerUser &&
            threadOld.autoArchiveDuration == thread.autoArchiveDuration &&
            threadOld.invitable == thread.invitable
        ) return;
        if (threadOld.type == Discord.ChannelType.PublicThread || thread.type == Discord.ChannelType.PublicThread || threadOld.type == Discord.ChannelType.PrivateThread || thread.type == Discord.ChannelType.PrivateThread) {
            const serverNew = await server.findOne({ guildID: thread.guild.id });
            if (!serverNew) {
                const newServer = new server({ guildID: thread.guild.id });
                await newServer.save()
            }
            const serverS = await server.findOne({ guildID: thread.guild.id });
            if (serverS.settings[2]["logs"] == false) return;
            if (serverS.logs[1]["threadUpdate"] == true) {
                const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
                if (!channelS) return;

                const threadOwner = await thread.guild.members.fetch(thread.ownerId)

                const embed = {
                    title: "Thread Updated",
                    description: `Channel: ${thread.parent}\nThread: ${thread}\nOwner: ${threadOwner}`,
                    fields: [{ name: "Id", value: '```' + thread.id + '```' }],
                    thumbnail: { url: threadOwner.displayAvatarURL({ dynamic: true }) },
                    color: 0x00ff00,
                    timestamp: new Date()
                }

                if (threadOld.name !== thread.name) {
                    embed.fields.push({
                        name: "Name",
                        value: '```Old: ' + threadOld.name + '\nNew: ' + thread.name + '```',
                    })
                }

                if (threadOld.archived !== thread.archived) {
                    embed.fields.push({
                        name: "Archived",
                        value: '```Old: ' + threadOld.archived ? "Yes" : "No" + '\nNew: ' + thread.archived ? "Yes" : "No" + '```',
                    })
                }

                if (threadOld.locked !== thread.locked) {
                    embed.fields.push({
                        name: "Locked",
                        value: '```Old: ' + threadOld.locked ? "Yes" : "No" + '\nNew: ' + thread.locked ? "Yes" : "No" + '```',
                    })
                }

                if (threadOld.rateLimitPerUser !== thread.rateLimitPerUser) {
                    embed.fields.push({
                        name: "Rate Limit Per User",
                        value: '```Old: ' + prettyMilliseconds(threadOld.rateLimitPerUser * 1000) + '\nNew: ' + prettyMilliseconds(thread.rateLimitPerUser * 1000) + '```',
                    })
                }

                if (threadOld.autoArchiveDuration !== thread.autoArchiveDuration) {
                    embed.fields.push({
                        name: "Auto Archive Duration",
                        value: '```Old: ' + threadOld.autoArchiveDuration + 's\nNew: ' + thread.autoArchiveDuration + 's```',
                    })
                }

                if (threadOld.invitable !== thread.invitable) {
                    embed.fields.push({
                        name: "Invitable",
                        value: '```Old: ' + threadOld.invitable ? "Yes" : "No" + '\nNew: ' + thread.invitable ? "Yes" : "No" + '```',
                    })
                }

                channelS.send({ embeds: [embed] }).catch(e => { return })
            }
        }
    },
};