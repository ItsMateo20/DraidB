require("dotenv").config();
const chalk = require("chalk");
console.log(chalk.gray("[SHARDS]: ") + chalk.cyan("Starting sharding..."));
if (!process.env.TOKEN) {
    console.error(chalk.gray("[SHARDS]: ") + chalk.yellow("Failed because couldn't find Draid Token!"))
    process.exit(1)
} else if (process.env.TOKEN && process.env.TOKENDEV) {
    console.error(chalk.gray("[SHARDS]: ") + chalk.yellow("Failed because found 2 available Tokens in the .env file!"))
    process.exit(1)
}
const { ShardingManager } = require("discord.js");
const manager = new ShardingManager('./index.js', { token: process.env.TOKEN, respawn: true, totalShards: 2, shardArgs: [process.env.TOKEN] });

manager.on('shardCreate', async (shard) => {
    console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Launched shard ${shard.id + 1} of ${manager.totalShards}!`));
    shard.on("disconnect", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Shard disconnected!`));
    }).on("reconnecting", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Shard reconnecting!`));
    }).on("death", (a, b) => {
        console.log(chalk.gray(`[SHARDS-`) + chalk.yellow(`${shard.id + 1}`) + chalk.gray(`]: `) + chalk.cyan(`Shard died!`));
    })
});

(async () => {
    await manager.spawn({ timeout: Infinity });
})();
