const { ActivityType } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.outputsend("Custom", chalk.gray(`[MAIN-BOT-`) + chalk.yellow(`${client.shard.ids[0] + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Launched!`));
        client.user.setActivity(`${client.config.DefaultActivity}${client.shard.ids[0] + 1}`, { type: ActivityType.Listening })
        setInterval(() => {
            client.user.setActivity(`${client.config.DefaultActivity}${client.shard.ids[0] + 1}`, { type: ActivityType.Listening })
        }, 7200000);
    },
};