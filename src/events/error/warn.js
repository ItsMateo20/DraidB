module.exports = {
    name: 'warn',
    async execute(client, warn) {
        client.outputsend("Warn", warn)
    },
};