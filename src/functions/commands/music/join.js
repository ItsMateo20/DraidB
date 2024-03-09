const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    aliases: ['j'],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'Speak', 'Connect'],
    musiccmd: true,

    helpDescription: 'Makes the bot join the channel you are in.',
    helpUsage: '**join**',
    helpGroup: 'Music',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {
        const queue = client.player.nodes.get(message.guild.id);

        if (message.member.voice.channel.id == message.guild.me.voice.channel.id) {
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `I am already in your voice channel!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Jestem już w twoim kanale głosowym!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] });
            }
        }

        try {
            joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
        } catch {
            if (queue) {
                queue.remove();
            }
            if (userS.settings[0]["lang"] == "english") {
                return message.channel.send({ embeds: [{ title: `Can\'t join the voice channel`, color: 0x3498DB }] });
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.channel.send({ embeds: [{ title: `Nie można dołączyć do kanału głosowego`, color: 0x3498DB }] });
            }
        }

        if (userS.settings[0]["lang"] == "english") {
            return message.channel.send({ embeds: [{ title: `Joined \`${message.member.voice.channel.name}\``, color: 0x3498DB }] });
        } else if (userS.settings[0]["lang"] == "polish") {
            return message.channel.send({ embeds: [{ title: `Dołączono do \`${message.member.voice.channel.name}\``, color: 0x3498DB }] });
        }
    }
};