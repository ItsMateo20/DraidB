module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if (!interaction.isChatInputCommand()) return;
        const { userS, serverS, serveruserS } = await client.newdb.execute(true, true, true, interaction.user.id, interaction.guild.id);
        const command = client.slashcmds.get(interaction.commandName);
        if (!command) {
            if (userS.settings[0]["lang"] == "english") {
                return interaction.reply({ content: 'There was an error while executing this command!' });
            } else if (userS.settings[0]["lang"] == "polish") {
                return interaction.reply({ content: 'Wystąpił błąd podczas wykonywania tej komendy!' });
            }
        }


        const inter = interaction

        if (serverS.settings[2]["music"] == false) {
            if (command.musiccmd) {
                if (command.musiccmd == true) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return inter.reply({
                            embeds: [{
                                title: `This server has music turned off!`, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return inter.reply({
                            embeds: [{
                                title: `Ten serwer ma muzykę wyłączoną!`, color: 0x3498DB
                            }]
                        }).catch((err) => client.outputsend("Error", err))
                    }
                }
            }
        }

        if (command.musiccmd) {
            if (command.musiccmd == true && !inter.member.voice.channel) {
                return inter.reply({
                    embeds: [{
                        title: `You are not in a voice channel!`, color: 0x3498DB
                    }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }

        try {
            await command.execute(client, interaction, serverS, userS, serveruserS);
        } catch (e) {
            client.outputsend("Error", e)
            if (userS.settings[0]["lang"] == "english") {
                return interaction.reply({ content: 'There was an error while executing this command!' });
            } else if (userS.settings[0]["lang"] == "polish") {
                return interaction.reply({ content: 'Wystąpił błąd podczas wykonywania tej komendy!' });
            }
        }
    },
};