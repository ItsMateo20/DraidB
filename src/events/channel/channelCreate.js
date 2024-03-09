const Discord = require("discord.js");
const server = require("../../models/server.js");

module.exports = {
  name: 'channelCreate',
  async execute(client, channel) {
    const serverNew = await server.findOne({ guildID: channel.guild.id });
    if (!serverNew) {
      const newServer = new server({ guildID: channel.guild.id });
      await newServer.save()
    }
    const serverS = await server.findOne({ guildID: channel.guild.id });
    if (serverS.settings[2]["logs"] == false) return;
    if (serverS.logs[1]["channelCreate"] == true) {
      const channelS = await client.channels.cache.get(serverS.logs[0]["channel"])
      if (!channelS) return;
      let channelType = null
      let Id = '```' + channel.id + '```'

      if (channel.type == Discord.ChannelType.GuildCategory) channelType = "```Category```"
      if (channel.type == Discord.ChannelType.GuildText) channelType = "```Text Channel```"
      if (channel.type == Discord.ChannelType.GuildVoice) channelType = "```Voice Channel```"
      if (channel.type == Discord.ChannelType.GuildAnnouncement) channelType = "```Announcement Channel```"
      if (channel.type == Discord.ChannelType.AnnouncementThread) channelType = "```Announcement Thread Channel```"
      if (channel.type == Discord.ChannelType.GuildForum) channelType = "```Forum Category```"
      if (channel.type == Discord.ChannelType.GuildDirectory) channelType = "```Directory Channel```"
      if (channel.type == Discord.ChannelType.GuildStageVoice) channelType = "```Stage Channel```"

      const embed = {
        title: "Channel Created",
        fields: [{ name: "Id", value: Id }, { name: "Type", value: channelType }],
        color: 0x00ff00,
        timestamp: new Date()
      }

      if (channel.type == Discord.ChannelType.GuildCategory && !channel.parent) {
        embed.title = "Category Created"
        embed.description = `Category: **#${channel.name}**`
      }

      if (channel.parent && channel && channelType !== null) embed.description = `Category: **#${channel.parent.name}**\nChannel: ${channel}`
      if (!channel.parent && channel && channel.type !== Discord.ChannelType.GuildCategory) embed.description = `Channel: **${channel}**`


      channelS.send({ embeds: [embed] }).catch(e => { return })
    }
  }
}
