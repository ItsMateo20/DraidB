module.exports = {
    name: 'snake',
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks', 'UseEmojis'],

    helpDescription: 'Play snake.',
    helpUsage: '**snake**',
    helpGroup: 'Games',
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {


        if (userS.settings[0]["lang"] == 'polish') {
            message.channel.send(`${message.author}`)
            const SnakeGame = require("snakecord");
            const snakeGame = new SnakeGame({
                title: `${message.author.username} - Wąż`,
                color: 0x3498DB,
                timestamp: false,
                gameOverTitle: `${message.author.username} - Koniec gry`
            });
            return snakeGame.newGame(message);
        } else if (userS.settings[0]["lang"] == 'english') {
            message.channel.send(`${message.author}`)
            const SnakeGame = require("snakecord");
            const snakeGame = new SnakeGame({
                title: `${message.author.username} - Snake`,
                color: 0x3498DB,
                timestamp: false,
                gameOverTitle: `${message.author.username} - Game Over`
            });
            return snakeGame.newGame(message);
        }
    }
}