module.exports = {
    name: 'error',
    async execute(client, error) {
        client.outputsend("Error", error)
    },
};