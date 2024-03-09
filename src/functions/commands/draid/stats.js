module.exports = {
    name: `stats`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Shows the bot\'s stats.',
    helpUsage: '**stats**',
    helpGroup: 'Others',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const prettyMilliseconds = require('pretty-ms');

        let serverCount = 404
        await client.shard.fetchClientValues('guilds.cache.size').then(results => serverCount = `${results.reduce((prev, val) => prev + val, 0)}`)
        let userCount = 404
        await client.shard.fetchClientValues('users.cache.size').then(results => userCount = `${results.reduce((prev, val) => prev + val, 0)}`)
        let channelCount = 404
        await client.shard.fetchClientValues('channels.cache.size').then(results => channelCount = `${results.reduce((prev, val) => prev + val, 0)}`)


        const embeds = []
        const pages = {}

        embeds.push(new Discord.EmbedBuilder()
            .setTitle(`Draid Stats - pg 1`)
            .setDescription(`Draid is a bot created by 630812692659044352.`)
            .addFields(
                { name: `Uptime`, value: `${prettyMilliseconds(client.uptime)}`, inline: true },
                { name: `ping`, value: `${client.ws.ping}ms`, inline: true },
                { name: `Status`, value: `${client.ws.status}`, inline: true },
                { name: `ShardAmount`, value: `${client.shard.count}`, inline: true },
                { name: `ShardId`, value: `${client.shard.ids[0] + 1}`, inline: true },
                { name: `ShardMode`, value: `${client.shard.mode}`, inline: true },
                { name: `Servers`, value: `${serverCount}`, inline: true },
                { name: `Users`, value: `${userCount}`, inline: true },
                { name: `Channels`, value: `${channelCount}`, inline: true },
                { name: `Commands`, value: `${client.commands.size}`, inline: true },
                { name: `Discord.js`, value: `v${Discord.version}`, inline: true },
                { name: `Node.js`, value: `${process.version}`, inline: true },
                { name: `Memory Usage`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: `Links`, value: "[Add Draid](https://draid.vercel.app/invite) \n [Support serwer](https://draid.vercel.app/support)", inline: true }
            )
            .setColor(0x3498DB)
            .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` }))

        const shardEmbed = new Discord.EmbedBuilder()
            .setTitle(`Draid Shards - pg 2`)
            .setDescription(`Draid is a bot created by 630812692659044352.`)
            .addFields(
                { name: `ShardCount`, value: `${client.shard.count}` },
                { name: `ShardMode`, value: `${client.shard.mode}` },
            )
            .setColor(0x3498DB)
            .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })


        for (let i = 0; i <= client.shard.count - 1; i++) {
            shardEmbed.addFields(
                { name: `Shard #${i + 1}`, value: `Ping: \`${await client.shard.fetchClientValues('ws.ping', i)}ms\`\nStatus: \`${await client.shard.fetchClientValues('ws.status', i)}\`` },
            )
        }

        embeds.push(shardEmbed)

        const getRow = (id) => {
            const row = new Discord.ActionRowBuilder()
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('prev_embed')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji('◀')
                    .setDisabled(pages[id] === 0)
            )
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('next_embed')
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji('▶')
                    .setDisabled(pages[id] === embeds.length - 1)
            )
            return row
        }

        const id = message.author.id
        pages[id] = pages[id] || 0

        const embed = embeds[pages[id]]
        let reply = message | undefined
        let collector

        const filter = (i) => i.user.id === message.author.id
        const time = 1000 * 60 * 5

        reply = await message.reply({
            embeds: [embed],
            components: [getRow(id)]
        })

        collector = reply.createMessageComponentCollector({ filter, time })

        collector.on('collect', async (btnInt) => {
            if (!btnInt) return;
            btnInt.deferUpdate()
            if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") return;

            if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                --pages[id]
            } else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
                ++pages[id]
            }

            reply.edit({
                embeds: [embeds[pages[id]]],
                components: [getRow(id)]
            })

        })
    }
};