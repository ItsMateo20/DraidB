const Discord = require("discord.js");
const server = require("../../models/server.js");

const prettyMilliseconds = require('pretty-ms');

module.exports = {
  name: 'channelUpdate',
  async execute(client, channelOld, channel) {
    if (
      channelOld.parent == channel.parent &&
      channelOld.name == channel.name &&
      channelOld.nsfw == channel.nsfw &&
      channelOld.rateLimitPerUser == channel.rateLimitPerUser &&
      channelOld.topic == channel.topic &&
      channelOld.bitrate == channel.bitrate &&
      channelOld.userLimit == channel.userLimit &&
      channelOld.videoQualityMode == channel.videoQualityMode &&
      channelOld.rtcRegion == channel.rtcRegion
    ) return;
    if (channelOld.type == Discord.ChannelType.DM || channelOld.type == Discord.ChannelType.GroupDM || channelOld.type == Discord.ChannelType.PrivateThread || channel.type == Discord.ChannelType.PrivateThread || channelOld.type == Discord.ChannelType.PublicThread || channel.type == Discord.ChannelType.PublicThread) return;
    const serverNew = await server.findOne({ guildID: channel.guild.id });
    if (!serverNew) {
      const newServer = new server({ guildID: channel.guild.id });
      await newServer.save()
    }
    const serverS = await server.findOne({ guildID: channel.guild.id });
    if (serverS.settings[2]["logs"] == false) return;
    if (serverS.logs[1]["channelUpdate"] == true) {
      const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
      if (!channelS) return;

      const embed = {
        title: "Channel Updated",
        fields: [{ name: "Id", value: '```' + channel.id + '```' }],
        color: 0xffff00,
        timestamp: new Date()
      }

      if (channel.type == Discord.ChannelType.GuildCategory && !channel.parent) {
        embed.title = "Category Updated"
        embed.description = `Category: **#${channel.name}**`
      }

      if (channel.parent && channel) embed.description = `Category: **#${channel.parent.name}**\nChannel: ${channel}`
      if (!channel.parent && channel) embed.description = `Channel: **${channel}**`

      if (channelOld.parent !== channel.parent) {
        if (!channelOld.parent) embed.fields.push({
          name: "Category",
          value: '```Old: None\nNew: #' + channel.parent.name + '```',
        })
        if (!channel.parent) embed.fields.push({
          name: "Category",
          value: '```Old: #' + channelOld.parent.name + '\nNew: None```',
        })
        if (channel.parent && channelOld.parent) embed.fields.push({
          name: "Category",
          value: '```Old: #' + channelOld.parent.name + '\nNew: #' + channel.parent.name + '```',
        })
      }

      if (channelOld.name !== channel.name) {
        embed.fields.push({
          name: "Name",
          value: '```Old: ' + channelOld.name + '\nNew: ' + channel.name + '```',
        })
      }

      if (channelOld.nsfw !== channel.nsfw) {
        embed.fields.push({
          name: "NSFW",
          value: '```Old: ' + channelOld.nsfw ? "Yes" : "No" + '\nNew: ' + channel.nsfw ? "Yes" : "No" + '```',
        })
      }

      if (channelOld.rateLimitPerUser !== channel.rateLimitPerUser) {
        embed.fields.push({
          name: "Rate Limit Per User",
          value: '```Old: ' + prettyMilliseconds(channelOld.rateLimitPerUser * 1000) + '\nNew: ' + prettyMilliseconds(channel.rateLimitPerUser * 1000) + '```',
        })
      }

      if (channelOld.topic !== channel.topic) {
        const oldtp = channelOld.topic ? channelOld.topic : "None";
        const newtp = channel.topic ? channel.topic : "None";
        embed.fields.push({
          name: "Topic",
          value: '```Old: ' + oldtp + '\nNew: ' + newtp + '```',
        })
      }

      if (channelOld.bitrate !== channel.bitrate) {
        embed.fields.push({
          name: "Bitrate",
          value: '```Old: ' + channelOld.bitrate / 1000 + 'kbps\nNew: ' + channel.bitrate / 1000 + 'kbps```',
        })
      }

      if (channelOld.userLimit !== channel.userLimit) {
        let oldul = channelOld.userLimit + ' Users'
        let newul = channel.userLimit + ' Users'
        if (channelOld.userLimit == 0) oldul = "Unlimited"
        if (channel.userLimit == 0) newul = "Unlimited"
        embed.fields.push({
          name: "User Limit",
          value: '```Old: ' + oldul + '\nNew: ' + newul + '```',
        })
      }

      const videoQualityMode = ["placeholdercuz0", "Auto", "720p", "Source", "Source", "Source"]

      if (channelOld.videoQualityMode !== channel.videoQualityMode) {
        const oldvqm = channelOld.videoQualityMode ? videoQualityMode[channelOld.videoQualityMode] : "Auto";
        const newvqm = channel.videoQualityMode ? videoQualityMode[channel.videoQualityMode] : "Auto";
        embed.fields.push({
          name: "Video Quality Mode",
          value: '```Old: ' + oldvqm + '\nNew: ' + newvqm + '```',
        })
      }

      if (channelOld.rtcRegion !== channel.rtcRegion) {
        const oldrg = channelOld.rtcRegion ? channelOld.rtcRegion
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ') : "Auto";
        const newrg = channel.rtcRegion ? channel.rtcRegion
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ') : "Auto";

        embed.fields.push({
          name: "RTC Region",
          value: '```Old: ' + oldrg + '\nNew: ' + newrg + '```',
        });
      }

      channelS.send({ embeds: [embed] }).catch(e => { return })
    }
  }
}
