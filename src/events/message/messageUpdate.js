const server = require("../../models/server.js");
const { StringUtils } = require("devtools-ts");
const tools = new StringUtils();

module.exports = {
    name: 'messageUpdate',
    async execute(client, oldMessage, message) {
        if (message.author == null || message.author.bot || message.system) return;
        const serverNew = await server.findOne({ guildID: message.guild.id });
        if (!serverNew) {
            const newServer = new server({ guildID: message.guild.id });
            await newServer.save()
        }
        const serverS = await server.findOne({ guildID: message.guild.id });
        if (serverS.settings[2]["logs"] == false) return;
        if (serverS.logs[1]["messageUpdate"] == true) {
            const channel = await client.channels.cache.get(serverS.logs[0]["channel"])
            if (!channel) return;

            const embed = {
                title: "Message Updated",
                description: `Author: ${message.author}\nChannel: ${message.channel}`,
                fields: [{ name: "Id", value: '```' + message.id + '```' }],
                color: 0xffff00,
            }
            const embed2 = {
                color: 0xffff00,
            }
            const embed3 = {
                color: 0xffff00,
            }

            const embed1after = {
                color: 0xffff00,
            }

            const embed2after = {
                color: 0xffff00,
            }

            const embed3after = {
                color: 0xffff00,
            }

            const linkEmbeds = []

            const attachments = []

            if (message.author) embed.thumbnail = { url: message.author.avatarURL({ dynamic: true }) }
            if (oldMessage.content !== message.content && oldMessage.pinned == message.pinned) {
                if (message.content.length > 0 && oldMessage.content.length <= 1024 && message.content.length <= 1024) {
                    embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nOld Content: ` + '```' + oldMessage.content + '```' + `\nNew Content: ` + '```' + message.content + '```'
                } else if (oldMessage.content.length > 0 || message.content.length > 0) {
                    const chunk = tools.chunkSubString(oldMessage.content, 1024);
                    let i = 0
                    chunk.forEach(async (str) => {
                        i++
                        if (i == 1) {
                            embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nOld Content: ` + '```' + oldMessage.content + '```'
                        } else if (i == 2) {
                            embed2.description = '```' + str + '```';
                        } else if (i == 3) {
                            embed3.description = '```' + str + '```';
                        }
                    });
                    if (message.content.length > 0) {
                        const chunk = tools.chunkSubString(message.content, 1024);
                        let i = 0
                        chunk.forEach(async (str) => {
                            i++
                            if (i == 1) {
                                embed1after.description = `\nNew Content: ` + '```' + str + '```'
                            } else if (i == 2) {
                                embed2after.description = '```' + str + '```';
                            } else if (i == 3) {
                                embed3after.description = '```' + str + '```';
                            }
                        });
                    }
                }
            } else if (oldMessage.content == message.content && oldMessage.pinned !== message.pinned) {
                if (message.content.length > 0 && message.content.length <= 1024) {
                    embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nContent: ` + '```' + message.content + '```'
                } else if (message.content.length > 0) {
                    const chunk = tools.chunkSubString(message.content, 1024);
                    let i = 0
                    chunk.forEach(async (str) => {
                        i++
                        if (i == 1) {
                            embed.description = `Author: ${message.author}\nChannel: ${message.channel}\nContent: ` + '```' + message.content + '```'
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

            if (oldMessage.embeds.length > 0) {
                oldMessage.embeds.forEach(e => {
                    linkEmbeds.push(e.data)
                })
            }

            if (message.embeds.length > 0) {
                message.embeds.forEach(e => {
                    linkEmbeds.push(e.data)
                })
            }


            if (embed1after.description && !embed2after.description && !embed3after.description) {
                embed1after.timestamp = new Date()
            } else if (embed2after.description && !embed3after.description) {
                embed2after.timestamp = new Date()
            } else if (embed3after.description) {
                embed3after.timestamp = new Date()
            }

            if (oldMessage.pinned !== message.pinned) {
                embed.title = "Message Pinned Status Updated"
                embed.fields.push({
                    name: "Pinned",
                    value: '```Old: ' + oldMessage.pinned + '\nNew: ' + message.pinned + '```',
                })
            }


            if (attachments.length == 0) {
                channel.send({ embeds: [embed] }).then((msg) => {
                    if (linkEmbeds.length > 0) msg.channel.send({ embeds: linkEmbeds }).catch(e => { });
                    if (embed2.description) {
                        msg.channel.send({ embeds: [embed2] }).catch(e => { });
                        if (embed3.description) {
                            msg.channel.send({ embeds: [embed3] }).catch(e => { });
                        }
                    }
                    if (embed1after.description) {
                        msg.channel.send({ embeds: [embed1after] }).catch(e => { });
                        if (embed2after.description) {
                            msg.channel.send({ embeds: [embed2after] }).catch(e => { });
                            if (embed3after.description) {
                                msg.channel.send({ embeds: [embed3after] }).catch(e => { });
                            }
                        }
                    }
                }).catch(e => { return })
            } else if (attachments.length > 0) {
                channel.send({ embeds: [embed] }).then((msg) => {
                    if (linkEmbeds.length > 0) msg.channel.send({ embeds: linkEmbeds }).catch(e => { });
                    if (embed2.description) {
                        msg.channel.send({ embeds: [embed2] }).catch(e => { });
                        if (embed3.description) {
                            msg.channel.send({ embeds: [embed3] }).catch(e => { });
                        }
                    }
                    if (embed1after.description) {
                        msg.channel.send({ embeds: [embed1after] }).catch(e => { });
                        if (embed2after.description) {
                            msg.channel.send({ embeds: [embed2after] }).catch(e => { });
                            if (embed3after.description) {
                                msg.channel.send({ embeds: [embed3after] }).catch(e => { });
                            }
                        }
                    }
                    msg.reply({ files: attachments }).catch(e => { });
                }).catch(e => { return })
            }
        }
    }
}
