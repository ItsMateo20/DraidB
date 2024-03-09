const server = require("../../models/server.js");
const { StringUtils } = require("devtools-ts");
const tools = new StringUtils();

module.exports = {
    name: 'messageDelete',
    async execute(client, message) {
        if (message.author == null || message.author.bot || message.system) return;
        const serverNew = await server.findOne({ guildID: message.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: message.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: message.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["messageDelete"] == true) {
            const channel = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channel) return;
            const embed = {
                title: "Message Deleted",
                description: `Author: ${message.author}\nChannel: ${message.channel}`,
                color: 0xff0000,
            }
            const embed2 = {
                color: 0xff0000,
            }
            const embed3 = {
                color: 0xff0000,
            }

            const attachments = []

            if (message.author) embed.thumbnail = { url: message.author.avatarURL({ dynamic: true }) }
            if (message.content !== null) {
                if (message.content.length > 0 && message.content.length < 1024) {
                    embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nContent: ` + '```' + message.content + '```'
                } else if (message.content.length > 1024) {
                    const chunk = tools.chunkSubString(message.content, 1024);
                    let i = 0
                    chunk.forEach(async (str) => {
                        i++
                        if (i == 1) {
                            embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nContent: ` + '```' + str + '```'
                        } else if (i == 2) {
                            embed2.description = '```' + str + '```';
                        } else if (i == 3) {
                            embed3.description = '```' + str + '```';
                        }
                    });
                }
            }
            if (message.attachments.size > 0) {
                message.attachments.forEach(a => {
                    if (a.name) {
                        attachments.push(a.url.toString())
                    }
                })
            }
            if (message.stickers.size > 0) {
                message.stickers.forEach(s => {
                    if (s.format == 1 || s.format == 2) {
                        attachments.push(s.url.toString())
                    }
                })
            }

            if (embed.description && !embed2.description && !embed3.description) {
                embed.timestamp = new Date()
            } else if (embed2.description && !embed3.description) {
                embed2.timestamp = new Date()
            } else if (embed3.description) {
                embed3.timestamp = new Date()
            }


            if (attachments.length == 0) {
                channel.send({ embeds: [embed] }).then((msg) => {
                    if (embed2.description) {
                        msg.channel.send({ embeds: [embed2] }).catch(e => { });
                        if (embed3.description) {
                            msg.channel.send({ embeds: [embed3] }).catch(e => { });
                        }
                    }
                }).catch(e => {
                    return client.outputsend("Error", e)
                })
            } else if (attachments.length > 0) {
                channel.send({ embeds: [embed] }).then((msg) => {
                    if (embed2.description) {
                        msg.channel.send({ embeds: [embed2] }).catch(e => { });
                        if (embed3.description) {
                            msg.channel.send({ embeds: [embed3] }).catch(e => { });
                        }
                    }
                    msg.reply({ files: attachments }).catch(e => { });
                }).catch(e => { return })
            }
        }
    }
}
