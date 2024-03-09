const Discord = require("discord.js");

const server = require("../../models/server.js");
const user = require("../../models/user.js");
const serveruser = require("../../models/serveruser.js");



module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        const { userS, serverS, serveruserS } = await client.newdb.execute(true, true, true, member.user.id, member.guild.id);

        if (serverS.settings[0]["welcome"] == true) {
            const welcomeTextRaw = serverS.settings[0]["welcomemessage"]
            const user = {}
            if (member.user.globalName !== undefined) { user.globalName = member.user.globalName } else { user.globalName = "{error getting global name}" }
            if (member.user.username !== undefined) { user.username = member.user.username } else { user.username = "{error getting username}" }
            if (member.user.id !== undefined) { user.id = member.user.id } else { user.userID = "{error getting id}" }
            if (member.guild.name !== undefined) { user.guildName = member.guild.name } else { user.guildName = "{error getting guild name}" }
            if (member.guild.memberCount !== undefined) { user.guildMemberCount = member.guild.memberCount } else { user.guildMemberCount = "{error getting guild member count}" }
            if (member.guild.id !== undefined) { user.guildID = member.guild.id } else { user.guildID = "{error getting guild id}" }
            const welcomeText = welcomeTextRaw.replaceAll(/{nextLine}/g, "\n").replace(/{user_displayName}/g, user.globalName).replace(/{user_name}/g, user.username).replace(/{user_id}/g, user.userID).replace(/{server_name}/g, user.guildName).replace(/{server_member_count}/g, user.guildMemberCount).replace(/{server_id}/g, user.guildID)

            if (serverS.settings[0]["welcomedmTF"] == true) {
                if (serverS.settings[0]["welcomemessageTF"] == true) {
                    const embed = new Discord.EmbedBuilder()
                        .setColor(0x3498DB)
                        .setTitle(`Sent from ${member.guild.name} \n\n${welcomeText}`)
                        .setThumbnail(member.displayAvatarURL({ dynamic: true }))

                    if (userS.settings[0]["lang"] == "english") {
                        embed.setTitle(`Sent from ${member.guild.name} \n\n${welcomeText}`)
                    } else if (userS.settings[0]["lang"] == "polish") {
                        embed.setTitle(`Wysłano z ${member.guild.name} \n\n${welcomeText}`)
                    }

                    await member.send({ embeds: [embed] }).catch((err) => { });
                }
            } else if (serverS.settings[0]["welcomechannelTF"] == true) {
                if (serverS.settings[0]["welcomemessageTF"] == true) {
                    const channel = await client.channels.cache.get(serverS.settings[0]["welcomechannel"])
                    if (channel) {
                        const embed = new Discord.EmbedBuilder()
                            .setColor(0x3498DB)
                            .setTitle(`${welcomeText}`)
                            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))

                        await channel.send({ embeds: [embed] }).catch((err) => { });
                    }
                }
            }
            if (serverS.settings[0]["welcomeroleTF"] == true) {
                if (serverS.settings[0]["welcomerole"] !== "None") {
                    const role = await member.guild.roles.cache.get(serverS.settings[0]["welcomerole"]);
                    if (role) {
                        await member.roles.add(role).catch((err) => { });
                    }
                }
            }
        }
    },
};