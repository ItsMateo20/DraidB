require('dotenv').config()
const Discord = require("discord.js");
let shardsamount
if (process.env.TOKEN) {
  shardsamount = "ShardCount: 2"
} else if (process.env.TOKENDEV) {
  shardsamount = "ShardCount: 1"
}

const client = new Discord.Client({
  shardsamount,
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildEmojisAndStickers,
    Discord.GatewayIntentBits.GuildIntegrations,
    Discord.GatewayIntentBits.GuildWebhooks,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildPresences,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.DirectMessageReactions,
    Discord.GatewayIntentBits.DirectMessageTyping,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildScheduledEvents,
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.GuildScheduledEvent,
    Discord.Partials.ThreadMember,
  ],
});

const DiscordBotConfig = require("./src/configs/DiscordBot.js");
const fs = require("fs");
const mongoose = require("mongoose");

const chalk = require("chalk");


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODBLOGIN).then(() => {
  console.log(chalk.gray(`[MAIN-BOT-`) + chalk.yellow(`${client.shard.ids[0] + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Connected to MongoDB!`));
});


const { Player } = require("discord-player");
const { setTimeout } = require('timers');
const wait = require('util').promisify(setTimeout);

client.player = new Player(client)

const DeezerExtractor = require("discord-player-deezer")
const { SpotifyExtractor, SoundCloudExtractor } = require("@discord-player/extractor")
client.player.extractors.loadDefault();
client.player.extractors.register(DeezerExtractor, {});
client.player.extractors.register(SpotifyExtractor, {});
client.player.extractors.register(SoundCloudExtractor, {});

client.newdb = require("./src/models/newdb.js");
client.config = DiscordBotConfig;
client.outputsend = (t, message) => {
  const errorObj = new Error(message);
  const stackLine = errorObj.stack.split('\n')[2].trim().split(" ");
  const filePath = stackLine[stackLine.length - 1].split(":").slice(0, -2).join(":").split("\\").slice(-4).join("\\");
  const fileLine = stackLine[stackLine.length - 1].match(/:(\d+):/)[1];

  const ConsoleWebhook = new Discord.WebhookClient({ id: "1149402776363864135", token: "me2DB5PYxhZ0QFYyBGkMxnlxsJ3wHUF2reIaRfGLtgiHCvwRt7y0re_fWi9X9ujhsamv" })
  let type = t
  let color
  let avatar

  const red = 0xe33829
  const yellow = 0xe3c12a
  const blue = 0x2a9ce3
  const grey = 0x2e2e2e

  if (type.toLowerCase() == "error") {
    type = "Error"
    color = "red"
    avatar = "https://i.imgur.com/2jlov4m.png"
  } else if (type.toLowerCase() == "warn") {
    type = "Warn"
    color = "yellow"
    avatar = "https://i.imgur.com/jxJ1tdP.png"
  } else if (type.toLowerCase() == "log") {
    type = "Log"
    color = "blue"
    avatar = "https://i.imgur.com/9ZWIGKQ.png"
  } else if (type.toLowerCase() == "info") {
    type = "Info"
    color = "grey"
    avatar = "https://i.imgur.com/9F1Hnlk.png"
  } else if (type.toLowerCase() == "custom") {
    type = "Custom"
    color = "custom"
  }

  function EmbedColor(c) {
    if (!c) return console.log("No color specified")
    if (c == "red") {
      return red
    } else if (c == "yellow") {
      return yellow
    } else if (c == "blue") {
      return blue
    } else if (c == "grey") {
      return grey
    }
  }

  function Chalk(color, message) {
    if (!color) return console.log("No color specified")
    if (!message) return console.log("No message specified")
    if (type.toLowerCase() == "error" && color == "red") {
      return chalk.gray(`[MAIN-BOT]: `) + chalk.cyan("Error: ") + chalk.red(`${message}\n\n`) + '| ' + chalk.gray(`${filePath}:${fileLine}`) + '\n' + chalk.gray(errorObj.stack) + '\n';
    } else if (type.toLowerCase() == "warn" && color == "yellow") {
      return chalk.gray(`[MAIN-BOT]: `) + chalk.cyan("Warn: ") + chalk.yellow(`${message}\n\n`) + '| ' + chalk.gray(`${filePath}:${fileLine}`) + '\n' + chalk.gray(errorObj.stack) + '\n';
    } else if (type.toLowerCase() == "log" && color == "blue") {
      return chalk.gray(`[MAIN-BOT:] `) + chalk.cyan("Log: ") + chalk.blue(`${message}\n\n`) + '| ' + chalk.gray(`${filePath}:${fileLine}`) + '\n' + chalk.gray(errorObj.stack) + '\n';
    } else if (type.toLowerCase() == "info" && color == "grey") {
      return chalk.gray(`[MAIN-BOT]: `) + chalk.cyan("Info: ") + chalk.grey(`${message}\n\n`) + '| ' + chalk.gray(`${filePath}:${fileLine}`) + '\n' + chalk.gray(errorObj.stack) + '\n';
    }
  }


  if (type.toLowerCase() !== "custom") {
    if (process.env.TOKEN) {
      ConsoleWebhook.send({
        username: 'Output',
        avatarURL: avatar,
        embeds: [{ title: `${type}`, description: `### ${message} \n\n${filePath}:${fileLine}`, color: EmbedColor(color) }],
      });
    }
    console.log(Chalk(color, message))
  } else if (type.toLowerCase() == "custom") {
    console.log(message)
  }
}

//============================================================================================
//============================================================================================


client.player.events.on('playerStart', async (que) => {
  const queue = await client.player.nodes.get(que.metadata.guild.id)
  const { userS, serverS } = await client.newdb.execute(true, true, false, queue.currentTrack.requestedBy.id, queue.metadata.guild.id)
  if (queue.repeatMode !== 0 || serverS.settings[4]["notifysongs"] == false) return;

  const repeatmodes = ['Disabled', 'Track 🔂', 'Queue 🔁']
  let informationplay


  if (userS.settings[0]["lang"] == "english") {
    informationplay = () => `Queue length: \`${queue.tracks.data.length}\` | Loop mode: \`${repeatmodes[queue.repeatMode]}\` | Volume: \`${queue.filters._lastFiltersCache.volume}/100%\` | Requested by: \`${queue.currentTrack.requestedBy.username}\``
  } else if (userS.settings[0]["lang"] == "polish") {
    informationplay = () => `Długość kolejki: \`${queue.tracks.data.length}\` | Tryb powtórzenia: \`${repeatmodes[queue.repeatMode]}\` | Głośność: \`${queue.filters._lastFiltersCache.volume}/100%\` | Wybrana przez: \`${queue.currentTrack.requestedBy.username}\``
  }


  const playingmenu = new Discord.EmbedBuilder()
    .setColor(0x3498DB)

  const queueingmenu = new Discord.EmbedBuilder()
    .setColor(0x3498DB)

  const disabledbtns = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId('back')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏮')
        .setDisabled(true),
      new Discord.ButtonBuilder()
        .setCustomId('pause')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏸')
        .setDisabled(true),
      new Discord.ButtonBuilder()
        .setCustomId('resume')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('▶')
        .setDisabled(true),
      new Discord.ButtonBuilder()
        .setCustomId('skip')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏭')
        .setDisabled(true),
      new Discord.ButtonBuilder()
        .setCustomId('stop')
        .setStyle(Discord.ButtonStyle.Danger)
        .setEmoji('⏹')
        .setDisabled(true),
    );
  const disabledmenu = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId('play_menu')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setLabel('Play menu')
        .setDisabled(true),
      new Discord.ButtonBuilder()
        .setCustomId('queue_menu')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setLabel('Queue menu')
        .setDisabled(true),
    );



  let control = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId('back')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏮'),
      new Discord.ButtonBuilder()
        .setCustomId('pause')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏸'),
      new Discord.ButtonBuilder()
        .setCustomId('resume')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('▶'),
      new Discord.ButtonBuilder()
        .setCustomId('skip')
        .setStyle(Discord.ButtonStyle.Success)
        .setEmoji('⏭'),
      new Discord.ButtonBuilder()
        .setCustomId('stop')
        .setStyle(Discord.ButtonStyle.Danger)
        .setEmoji('⏹')
    )


  let menu = new Discord.ActionRowBuilder()
    .addComponents(
      new Discord.ButtonBuilder()
        .setCustomId('play_menu')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setLabel('Play menu'),
      new Discord.ButtonBuilder()
        .setCustomId('queue_menu')
        .setStyle(Discord.ButtonStyle.Secondary)
        .setLabel('Queue menu')
    )

  let reply = que.metadata | undefined
  let collector

  const time = 5000 * 60 * 5
  const progress = queue.node.createProgressBar();
  const timestamp = queue.node.getTimestamp();

  if (userS.settings[0]["lang"] == "english") {
    playingmenu.setTitle(`Media player - controller`)
    playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
    if (timestamp.progress !== 'Infinity') {
      playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
    }
  } else if (userS.settings[0]["lang"] == "polish") {
    playingmenu.setTitle(`Odtwarzacz - kontroller`)
    playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
    if (timestamp.progress !== 'Infinity') {
      playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
    }
  }
  playingmenu.setThumbnail(queue.currentTrack.thumbnail)
  reply = await queue.metadata.channel.send({
    embeds: [playingmenu],
    components: [control, menu]
  })

  collector = reply.createMessageComponentCollector({ time: time })

  collector.on('collect', async (btnInt) => {
    if (!btnInt) return;
    btnInt.deferUpdate()
    if (btnInt.customId === "queue_menu") {

      if (!queue.tracks.data[0]) {
        if (userS.settings[0]["lang"] == "english") {
          return reply.edit({ embeds: [{ title: `There are no other songs in the queue than the current one!`, color: 0x3498DB, footer: { text: `Use ",play" to add track or a hole playlist to the queue! (100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [control, menu] })
        } else if (userS.settings[0]["lang"] == "polish") {
          return reply.edit({ embeds: [{ title: `W kolejce nie ma innych piosenek niż obecny`, color: 0x3498DB, footer: { text: `Użyj ",play" aby dodać utwór lub playlistę do kolejki! (maksymalnie 100 utworów z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }], compoments: [control, menu] })
        }
      }


      if (userS.settings[0]["lang"] == "english") {
        const tracks = queue.tracks.data.map((track, i) => `**\`${++i}\`** - [${track.title}](${track.url}) (${`\`${track.duration}\``}) | Requested by - ${track.requestedBy.username}`);
        queueingmenu.setTitle(`Media player - queue`)
        queueingmenu.setDescription(`**Playing now**:\n[${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n\n**Pending tracks:**\n${tracks.slice(0, 8).join('\n\n')}${tracks.length > 8 ? `\n\n**${tracks.length - 8}** more tracks...` : ''}`)
      } else if (userS.settings[0]["lang"] == "polish") {
        const tracks = queue.tracks.data.map((track, i) => `**\`${++i}\`** - [${track.title}](${track.url}) (${`\`${track.duration}\``}) | Wybrana przez - ${track.requestedBy.username}`);
        queueingmenu.setTitle(`Odtwarzacz - kolejka`)
        queueingmenu.setDescription(`**Aktualnie odtwarzam:**\n[${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n\n**Pozostałe piosenki:**\n${tracks.slice(0, 8).join('\n\n')}${tracks.length > 8 ? `\n\n**${tracks.length - 8}** wiecej piosenek...` : ''}`)
      }

      reply.edit({ embeds: [queueingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "play_menu") {
      const progress = queue.node.createProgressBar();
      const timestamp = queue.node.getTimestamp();

      if (userS.settings[0]["lang"] == "english") {
        playingmenu.setTitle(`Media player - controller`)
        playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
        }
      } else if (userS.settings[0]["lang"] == "polish") {
        playingmenu.setTitle(`Odtwarzacz - kontroler`)
        playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
        }
      }
      if (queue.tracks.data.length == 0) {
        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
      } else {
        playingmenu.setThumbnail(queue.tracks.data[0].thumbnail)
      }
      reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "pause") {

      const success = queue.node.pause();
      if (userS.settings[0]["lang"] == "english") {
        reply.edit({ embeds: [{ title: `${success ? `Paused the song!` : `The song is already paused!`}`, color: 0x3498DB, footer: { text: `Use ",resume" to resume the current track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      } else if (userS.settings[0]["lang"] == "polish") {
        reply.edit({ embeds: [{ title: `${success ? `Zatrzymano utwór!` : `Utwór jest już zatrzymany!`}`, color: 0x3498DB, footer: { text: `Użyj ",resume" aby wznowić utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      }

      await wait(5000);
      const progress = queue.node.createProgressBar();
      const timestamp = queue.node.getTimestamp();

      if (userS.settings[0]["lang"] == "english") {
        playingmenu.setTitle(`Media player - controller`)
        playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
        }
      } else if (userS.settings[0]["lang"] == "polish") {
        playingmenu.setTitle(`Odtwarzacz - kontroler`)
        playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
        }
      }
      if (queue.tracks.data.length == 0) {
        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
      } else {
        playingmenu.setThumbnail(queue.tracks.data[0].thumbnail)
      }
      reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "resume") {

      const success = queue.node.resume();
      if (userS.settings[0]["lang"] == "english") {
        reply.edit({ embeds: [{ title: `${success ? `Resumed the song!` : `The song is already resumed!`}`, color: 0x3498DB, footer: { text: `Use ",pause" to pause the current track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      } else if (userS.settings[0]["lang"] == "polish") {
        reply.edit({ embeds: [{ title: `${success ? `Wznowiono utwór!` : `Utwór jest już wznowiony!`}`, color: 0x3498DB, footer: { text: `Użyj ",pause" aby zatrzymać utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      }

      await wait(5000);
      const progress = queue.node.createProgressBar();
      const timestamp = queue.node.getTimestamp();

      if (userS.settings[0]["lang"] == "english") {
        playingmenu.setTitle(`Media player - controller`)
        playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
        }
      } else if (userS.settings[0]["lang"] == "polish") {
        playingmenu.setTitle(`Odtwarzacz - kontroler`)
        playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
        }
      }
      if (queue.tracks.data.length == 0) {
        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
      } else {
        playingmenu.setThumbnail(queue.tracks.data[0].thumbnail)
      }
      reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "skip") {

      if (queue.repeatMode === 1) {
        queue.setRepeatMode(0);
        queue.node.skip();
        await wait(500);
        queue.setRepeatMode(1);
      }
      else {
        queue.node.skip();
      }
      if (userS.settings[0]["lang"] == "english") {
        reply.edit({ embeds: [{ title: `Skipped the song`, color: 0x3498DB, footer: { text: `Use ",back" to play the previous track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      } else if (userS.settings[0]["lang"] == "polish") {
        reply.edit({ embeds: [{ title: `Przewinąłem piosenkę`, color: 0x3498DB, footer: { text: `Użyj ",back" aby odtworzyć poprzedni utwór!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] })
      }

      await wait(5000);
      const progress = queue.node.createProgressBar();
      const timestamp = queue.node.getTimestamp();

      if (userS.settings[0]["lang"] == "english") {
        playingmenu.setTitle(`Media player - controller`)
        playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
        }
      } else if (userS.settings[0]["lang"] == "polish") {
        playingmenu.setTitle(`Odtwarzacz - kontroler`)
        playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
        }
      }
      if (queue.tracks.data.length == 0) {
        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
      } else {
        playingmenu.setThumbnail(queue.tracks.data[0].thumbnail)
      }
      reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "back") {

      if (!queue.previousTracks[1]) {
        if (userS.settings[0]["lang"] == "english") {
          reply.edit({ embeds: [{ title: `There was is no music that was played before the current one!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist! (100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
        } else if (userS.settings[0]["lang"] == "polish") {
          reply.edit({ embeds: [{ title: `Nie ma muzyki, która była odtwarzana przed aktualnym!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę! (maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
        }
      }

      await queue.history.back();
      if (userS.settings[0]["lang"] == "english") {
        reply.edit({ embeds: [{ title: `Playing the last song that was played!`, color: 0x3498DB, footer: { text: `Use ",skip" to play the next track!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
      } else if (userS.settings[0]["lang"] == "polish") {
        reply.edit({ embeds: [{ title: `Odtwarzam ostatnią piosenkę, która była odtwarzana!`, color: 0x3498DB, footer: { text: `Użyj ",skip" aby odtworzyć następną piosenkę!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
      }

      await wait(5000);
      const progress = queue.node.createProgressBar();
      const timestamp = queue.node.getTimestamp();

      if (userS.settings[0]["lang"] == "english") {
        playingmenu.setTitle(`Media player - controller`)
        playingmenu.setDescription(`Playing - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nViews: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Progress: ", value: `${progress}` })
        }
      } else if (userS.settings[0]["lang"] == "polish") {
        playingmenu.setTitle(`Odtwarzacz - kontroler`)
        playingmenu.setDescription(`Odtwarzanie - [${queue.currentTrack.title}](${queue.currentTrack.url}) (${`\`${queue.currentTrack.duration}\``})\n${queue.currentTrack.url.includes("open.spotify.com") ? "" : `\nWyświetlenia: \`${queue.currentTrack.views}\``}\n${informationplay()}`)
        if (timestamp.progress !== 'Infinity') {
          playingmenu.setFields({ name: "Postęp: ", value: `${progress}` })
        }
      }
      if (queue.tracks.data.length == 0) {
        playingmenu.setThumbnail(queue.currentTrack.thumbnail)
      } else {
        playingmenu.setThumbnail(queue.tracks.data[0].thumbnail)
      }
      reply.edit({ embeds: [playingmenu], compoments: [control, menu] })

    } else if (btnInt.customId === "stop") {
      if (queue) {
        queue.delete();
      }
      collector.stop();
    }
  })
  collector.on('end', async () => {
    if (userS.settings[0]["lang"] == "english") {
      reply.edit({
        embeds: [{ title: "Media player - controller", description: `This player is now unavailable, use the command "${serverS.settings[3]["prefix"]}nowplaying" for a media controler.`, color: 0x3498DB }], components: [disabledbtns, disabledmenu]
      }).then(() => setTimeout(() => {
        reply.delete()
      }, 3000))
    } else if (userS.settings[0]["lang"] == "polish") {
      reply.edit({
        embeds: [{ title: "Odtwarzacz - kontroler", description: `Ten odtwarzacz jest już niedostępny, użyj komendy "${serverS.settings[3]["prefix"]}nowplaying" aby zobaczyć kontroller muzyki.`, color: 0x3498DB }], components: [disabledbtns, disabledmenu]
      }).then(() => setTimeout(() => {
        reply.delete()
      }, 3000))
    }
  });
}).on('audioTrackAdd', async (queue, track) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - queue`, description: `Added - [${track.title}](${track.url}) (${track.duration}) to the queue!`, color: 0x3498DB, thumbnail: { url: `${track.thumbnail}` }, footer: { text: `Use ",skip" to play the next song!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kolejka`, description: `Dodano - [${track.title}](${track.url}) (${track.duration}) do kolejki!`, color: 0x3498DB, thumbnail: { url: `${track.thumbnail}` }, footer: { text: `Użyj ",skip" aby odtworzyć następną piosenkę!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
}).on('audioTracksAdd', async (queue, track) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - queue`, description: `Added - **${track.length}** song(s) to the queue`, color: 0x3498DB, thumbnail: { url: `${track[0].playlist.thumbnail}` }, footer: { text: `Use ",skip" to play the next song!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kolejka`, description: `Dodano - **${track.length}** piosenek do kolejki`, color: 0x3498DB, thumbnail: { url: `${track[0].playlist.thumbnail}` }, footer: { text: `Użyj ",skip" aby odtworzyć następną piosenkę!`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
}).on('playerError', async (queue, error) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  client.outputsend("Error", error)
  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - controller`, description: `An error occured!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist!(100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kontroler`, description: `Wystąpił błąd!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę!(maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
}).on('connectionError', async (queue, error) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  client.outputsend("Error", error)
  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - controller`, description: `An error occured!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist!(100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kontroler`, description: `Wystąpił błąd!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę!(maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
}).on('emptyChannel', async (queue) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - controller`, description: `The channel is empty so I disconnected, clearing queue!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist!(100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kontroler`, description: `Kanał jest pusty, więc rozłączono, czyszczenie kolejki!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę!(maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
}).on('disconnect', async (queue) => {
  const { userS } = await client.newdb.execute(true, false, false, queue.metadata.author.id, queue.metadata.guild.id)

  if (userS.settings[0]["lang"] == "english") {
    return queue.metadata.channel.send({ embeds: [{ title: `Media player - controller`, description: `I was disconnected from the channel, clearing queue!`, color: 0x3498DB, footer: { text: `Use ",play" to play a track or a hole playlist!(100 tracks max from playlists)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  } else if (userS.settings[0]["lang"] == "polish") {
    return queue.metadata.channel.send({ embeds: [{ title: `Odtwarzacz - kontroler`, description: `Rozłączono z kanału, czyszczenie kolejki!`, color: 0x3498DB, footer: { text: `Użyj ",play" aby odtworzyć piosenkę lub całą listę!(maks 100 piosenek z playlist)`, icon_url: `${queue.metadata.author.avatarURL({ dynamic: true })}` } }] });
  }
})


const eventFolders = fs.readdirSync("./src/events/")

for (const folder of eventFolders) {
  const eventFiles = fs.readdirSync(`./src/events/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of eventFiles) {
    const event = require(`./src/events/${folder}/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
  }
}



client.commands = new Discord.Collection();
client.slashcmds = new Discord.Collection();

client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync("./src/functions/commands")

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./src/functions/commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./src/functions/commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}


const slashCommandFolders = fs.readdirSync("./src/functions/commandsslash")
const slashcmdsForRegister = [];

for (const folder of slashCommandFolders) {
  const commandFiles = fs.readdirSync(`./src/functions/commandsslash/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./src/functions/commandsslash/${folder}/${file}`);
    client.slashcmds.set(command.name, command);
    slashcmdsForRegister.push(command.data.toJSON());
  }
}

client.slashcmdsForRegister = slashcmdsForRegister;

const deployslashCmds = require("./src/deploy-commands.js");
deployslashCmds.execute(client)



process.on("unhandledRejection", async (error) => {
  client.outputsend("Error", error)
})

process.on("uncaughtException", async (error) => {
  client.outputsend("Error", error)
})

process.on("warning", async (warn) => {
  client.outputsend("Warn", warn)
})

process.on("exit", async (code) => {
  if (code == 0) return;
  client.outputsend("Error", "Exited with code: " + code)
})

client.login(process.env.TOKEN || process.env.TOKENDEV);
