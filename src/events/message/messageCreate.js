const Discord = require("discord.js");

const server = require("../../models/server.js");
const user = require("../../models/user.js");
const serveruser = require("../../models/serveruser.js");
const draid = require('../../models/draid.js');

const fs = require("fs");

module.exports = {
  name: 'messageCreate',
  async execute(client, message) {
    if (message.author.bot || message.system || message.channelType === Discord.ChannelType.DM) return;
    const target = message.mentions.users.first() || message.author;
    const targett = message.mentions.users.first()
    const { userS, serverS, serveruserS } = await client.newdb.execute(true, true, true, message.author.id, message.guild.id);
    const draidS = await draid.findOne({ userID: "831829384884518923" });

    if (message.content.endsWith(`<@${client.user.id}>` || `<@${client.user.id}> `)) {
      if (userS.settings[0]["lang"] == "english") {
        return message.channel.send(`Hi, This server\'s prefix is \`${serverS.settings[3]["prefix"]}\``)
      } else if (userS.settings[0]["lang"] == "polish") {
        return message.channel.send(`Witaj, Prefiks serwera to \`${serverS.settings[3]["prefix"]}\``)
      }
    }



    if (serverS.draiddevs[1]["blacklisted"] == true) return;
    if (userS.draiddevs[1]["blacklisted"] == true) return;

    //command functions

    if (message.channelType === Discord.ChannelType.GuildText && message.channel.id === `${serverS.tickets[0]["channel"]}`) {
      setTimeout(() => {
        message.delete().catch((err) => {
          client.outputsend("Error", err)
        });
      }, 2000);
    }

    // if (draidS.spying[0]["spy"] == true) {
    //     if (draidS.spying[0]["type"] == "server") {
    //         const serverFind = client.guilds.cache.get(guild => guild.id === draidS.spying[0]["id"]);
    //         if (serverFind) {
    //             if (message.guild.id == serverFind.id) {
    //                 const channel = client.guilds.cache.get("973260639348854784").channels.cache.get(channel => channel.name === `spy-${draidS.spying[0]["spying"]}`);
    //                 channel.send({ content: `${message.author.username}: ${message.content}` });
    //             }
    //         }
    //     }
    // }
    if (targett) {
      let userSS
      userSS = await user.findOne({ userID: target.id });
      if (userSS) {
        if (userSS.profile[0]["afk"] == true) {
          if (userS.settings[0]["lang"] == "english") {
            message.reply(`${target} is afk! | Reason: ${userSS.profile[0]["afkreason"]}`);
          } else if (userS.settings[0]["lang"] == "polish") {
            message.reply(`${target} jest afk! | Powód: ${userSS.profile[0]["afkreason"]}`);
          }
        }
      }
    }

    if (userS.profile[0]["afk"] == true) {
      if (userS.settings[0]["lang"] == "english") {
        message.reply(`Welcome back, ${message.author.username}! You are no longer afk.`).then((msg) => {
          setTimeout(() => {
            msg.delete().catch((err) => {
              client.outputsend("Error", err)
            })
          }, 5000);
        })
      } else if (userS.settings[0]["lang"] == "polish") {
        message.reply(`Witaj, ${message.author.username}! Nie jesteś już afk.`).then((msg) => {
          setTimeout(() => {
            msg.delete().catch((err) => {
              client.outputsend("Error", err)
            })
          }, 5000);
        })
      }
      userS.profile.set(0, { commandsused: userS.profile[0]["commandsused"], messagessent: userS.profile[0]["messagessent"], afk: false })
      return userS.save()
    }

    if (userS.tickets[0]["ticket"] == true) {
      let userFind
      if (userS.tickets[0]["claimed"] == message.author.id) {
        userFind = userS.tickets[0]["ticketby"]
      } else if (userS.tickets[0]["ticketby"] == message.author.id) {
        userFind = userS.tickets[0]["claimed"]
      }
      const userSS = await user.findOne({ userID: userFind });
      if (userSS) {
        userSS.tickets.set(0, { channel: "None", ticketby: "None", claimed: "None", ticket: false })
        userSS.save().catch((err) => client.outputsend("Error", err));
      }
      userS.tickets.set(0, { channel: "None", ticketby: "None", claimed: "None", ticket: false })
      userS.save().catch((err) => client.outputsend("Error", err));
    }

    //command handler

    const commandStart = async () => {
      if (serverS.settings[3]["disallowedcommandchannels"].includes(message.channel.id)) {
        if (userS.settings[0]["notifications"] == true) {
          let channels = []
          for (i = 0; i < serverS.settings[3]["disallowedcommandchannels"].length; i++) {
            const channel = client.channels.cache.get(serverS.settings[3]["disallowedcommandchannels"][i])
            if (channel) {
              channels.push(channel.name)
            }
          }
          if (userS.settings[0]["lang"] == "english") {
            return client.user.send(message.author.id, {
              embeds: [{ thumbnail: { url: `${message.guild.iconURL({ dynamic: true })}` }, title: `The server has disabled commands for that channel (${message.channel.name})`, description: `Other blocked channels - ${channels.join(", ")}`, color: 0x3498DB }]
            }).catch(() => {
              return;
            })
          } else if (userS.settings[0]["lang"] == "polish") {
            return client.user.send(message.author.id, {
              embeds: [{ thumbnail: { url: `${message.guild.iconURL({ dynamic: true })}` }, title: `Serwer zablokował komendy w tym kanale (${message.channel.name})`, description: `Inne zablokowane kanale - ${channels.join(", ")}`, color: 0x3498DB }]
            }).catch(() => {
              return;
            })
          }
        } else return;
      }
      let args

      if (message.content.startsWith(serverS.settings[3]["prefix"])) {
        args = message.content.slice(serverS.settings[3]["prefix"].length).split(/ +/);
      } else if (message.content.startsWith(`<@${client.user.id}> `)) {
        const prefix = `<@${client.user.id}> `
        args = message.content.slice(prefix.length).split(/ +/);
      } else if (message.content.startsWith(`<@${client.user.id}>`)) {
        const prefix = `<@${client.user.id}>`
        args = message.content.slice(prefix.length).split(/ +/);
      }

      const commandName = args.shift().toLowerCase();
      const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      //====================================
      //unknown command

      if (!command || command == undefined) return;

      // achievements fopr commands here id:1

      //====================================
      //bot permissions

      if (command.botpermission) {
        let listOfPerms = []

        const bot = message.guild.members.cache.get(client.user.id);

        if (!bot.permissions.has(Discord.PermissionsBitField.Flags.Administrator, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.Administrator, false)) {

          if (command.botpermission.includes("SendMessages")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.SendMessages, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.SendMessages, false)) {
              listOfPerms.push("Send Messages")
            }
          }
          if (command.botpermission.includes("EmbedLinks")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.EmbedLinks, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.EmbedLinks, false)) {
              listOfPerms.push("Embed Links")
            }
          }
          if (command.botpermission.includes("AttachFiles")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.AttachFiles, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.AttachFiles, false)) {
              listOfPerms.push("Attach Files")
            }
          }
          if (command.botpermission.includes("UseEmojis")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.UseExternalEmojis, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.UseExternalEmojis, false)) {
              listOfPerms.push("Use External Emojis")
            }
          }
          if (command.botpermission.includes("ManageMessages")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.ManageMessages, false)) {
              listOfPerms.push("Manage Messages")
            }
          }
          if (command.botpermission.includes("ManageChannels")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.ManageChannels, false)) {
              listOfPerms.push("Manage Channels")
            }
          }
          if (command.botpermission.includes("ManageGuild")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.ManageGuild, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.ManageGuild, false)) {
              listOfPerms.push("Manage Server")
            }
          }
          if (command.botpermission.includes("AddReactions")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.AddReactions, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.AddReactions, false)) {
              listOfPerms.push("Add Reactions")
            }
          }
          if (command.botpermission.includes("ModerateMembers")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.ModerateMembers, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.ModerateMembers, false)) {
              listOfPerms.push("Timeout Members")
            }
          }
          if (command.botpermission.includes("KickMembers")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.KickMembers, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.KickMembers, false)) {
              listOfPerms.push("Kick Members")
            }
          }
          if (command.botpermission.includes("BanMembers")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.BanMembers, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.BanMembers, false)) {
              listOfPerms.push("Ban Members")
            }
          }
          if (command.botpermission.includes("Speak")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.Speak, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.Speak, false)) {
              listOfPerms.push("Speak")
            }
          }
          if (command.botpermission.includes("Connect")) {
            if (!bot.permissions.has(Discord.PermissionsBitField.Flags.Connect, false) || !message.channel.permissionsFor(client.user.id).has(Discord.PermissionsBitField.Flags.Connect, false)) {
              listOfPerms.push("Connect")
            }
          }


          if (listOfPerms.length > 0) {
            const embed = new Discord.EmbedBuilder()
              .setTitle(`I am missing the following permissions to use the ${command.name}:`)
              .addFields("Permissions:", `${listOfPerms.join(", ")}`)
              .setColor(0x3498DB)
              .setFooter({ text: `${message.author.username}`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
            return client.users.cache.get(message.author.id).send({ embeds: [embed] }).catch((err) => client.outputsend("Error", err))
          }
        }
      }

      //====================================
      //commands disabled

      if (serverS.settings[2]["currency"] == false) {
        if (command.currencycmd) {
          if (command.currencycmd == true) {
            if (userS.settings[0]["lang"] == 'english') {
              return message.channel.send({
                embeds: [{
                  title: `This server has currency turned off!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
              }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == 'polish') {
              return message.channel.send({
                embeds: [{
                  title: `Ten serwer ma walute wyłączoną!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
              }).catch((err) => client.outputsend("Error", err))
            }
          }
        }
      }

      if (serverS.settings[2]["music"] == false) {
        if (command.musiccmd) {
          if (command.musiccmd == true) {
            if (userS.settings[0]["lang"] == 'english') {
              return message.channel.send({
                embeds: [{
                  title: `This server has music turned off!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
              }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == 'polish') {
              return message.channel.send({
                embeds: [{
                  title: `Ten serwer ma muzykę wyłączoną!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                }]
              }).catch((err) => client.outputsend("Error", err))
            }
          }
        }
      }
      //=====================================
      //permissions

      if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
          if (userS.settings[0]["lang"] == 'english') {
            return message.channel.send({
              embeds: [{ title: `You do not have permission to use ${command.name}!`, field: { name: `Missing permissions:`, value: `${command.permissions}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
            }).catch((err) => client.outputsend("Error", err))
          } else if (userS.settings[0]["lang"] == 'polish') {
            return message.channel.send({
              embeds: [{ title: `Nie masz uprawnień do używania ${command.name}!`, field: { name: `Brak uprawnień:`, value: `${command.permissions}` }, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
            }).catch((err) => client.outputsend("Error", err))
          }
        }
      }

      //======================================
      //music

      if (command.musiccmd) {
        if (command.musiccmd == true && !message.member.voice.channel) {
          return message.reply({
            embeds: [{
              title: `You are not in a voice channel!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
            }]
          }).catch((err) => client.outputsend("Error", err))
        }
      }

      //======================================
      //dev

      if (command.dev) {
        if (command.dev == true) {
          if (userS.draiddevs[0]["developer"] == false) {
            if (userS.settings[0]["lang"] == 'english') {
              return message.channel.send({
                embeds: [{
                  title: `This command is only for Draid devs`, color: 0x3498DB
                }]
              })
            } else if (userS.settings[0]["lang"] == 'polish') {
              return message.channel.send({
                embeds: [{
                  title: `Ta komenda jest przeznaczona tylko dla twórców Draida`, color: 0x3498DB
                }]
              })
            }
          }
        }
      }

      //======================================
      //cooldown


      if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
      }

      const now = new Date();
      const timestamps = client.cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown || 3) * 1000;

      if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = (expirationTime - now) / 1000;
          if (userS.settings[0]["lang"] == 'english') {
            return message.channel.send({
              embeds: [{
                title: `Please wait ${timeLeft.toFixed(1)} s, before reusing the \`${command.name}\` command.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
              }]
            }).catch((err) => client.outputsend("Error", err))
          } else if (userS.settings[0]["lang"] == 'polish') {
            return message.channel.send({
              embeds: [{
                title: `Proszę potrzekaj ${timeLeft.toFixed(1)} s, przed ponownym użyciem \`${command.name}\` komendy.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
              }]
            }).catch((err) => client.outputsend("Error", err))
          }
        }
      }

      //=======================================
      //command execute

      if (userS.draiddevs[0]["developer"] == false) {
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      }

      try {

        command.execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett);
      } catch (e) {
        client.outputsend("Error", e);
      }
    }
    if (message.content.startsWith(serverS.settings[3]["prefix"])) {
      commandStart()
    } else if (message.content.startsWith(`<@${client.user.id}>`)) {
      commandStart()
    } else if (message.content.startsWith(`<@${client.user.id}> `)) {
      commandStart()
    }
  }
};