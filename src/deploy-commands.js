require('dotenv').config()
const { REST, Routes } = require('discord.js');
const { yellow, gray, cyan } = require('chalk');

module.exports = {
    name: 'deploy-commands',
    async execute(client) {

        const { ClientId, ClientDevId } = client.config

        const commands = client.slashcmdsForRegister
        let clientid

        if (process.env.TOKEN) {
            clientid = ClientId
        } else if (process.env.TOKENDEV) {
            clientid = ClientDevId
        }

        const rest = new REST({ version: '10' }).setToken(process.env.TOKEN || process.env.TOKENDEV);
        (async () => {
            try {
                console.log(gray(`[SLASH-CMDS-`) + yellow(`${client.shard.ids[0] + 1}`) + gray(`]: `) + cyan(`Started refreshing ${commands.length} commands.`));

                let data

                if (process.env.TOKENDEV) {
                    data = await rest.put(
                        Routes.applicationGuildCommands(clientid, '973260639348854784'),
                        { body: commands },
                    );
                } else if (process.env.TOKEN) {
                    data = await rest.put(
                        Routes.applicationCommands(clientid),
                        { body: commands },
                    );
                }

                console.log(gray(`[SLASH-CMDS-`) + yellow(`${client.shard.ids[0] + 1}`) + gray(`]: `) + cyan(`Successfully reloaded ${data.length} commands.`));
            } catch (error) {
                client.outputsend("Error", error)
            }
        })();
    }
}