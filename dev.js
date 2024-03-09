require("dotenv").config();
const chalk = require('chalk');
console.log(chalk.gray("[SHARDS]: ") + chalk.cyan("Starting development..."));
if (!process.env.TOKENDEV) {
    console.error("[SHARDS]: Failed because couldn't find DraidDevelopers Token!")
    process.exit(1)
} else if (process.env.TOKEN && process.env.TOKENDEV) {
    console.error("[SHARDS]: Failed because found 2 available Tokens in the .env file!")
    process.exit(1)
}
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager('./index.js', { token: process.env.TOKENDEV, respawn: true, totalShards: 1, shardArgs: [process.env.TOKENDEV] });

manager.on('shardCreate', async (shard) => {
    console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan("Launched Development!"));
    shard.on("disconnect", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.red("Development disconnected!"));
    }).on("reconnecting", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan("Development reconnecting!"));
    }).on("death", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.red("Development died!"));
    })
});

manager.spawn({ timeout: Infinity });