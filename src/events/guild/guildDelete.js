const server = require("../../models/server.js");


module.exports = {
    name: 'guildCreate',
    async execute(client, guild) {
        const servers = await server.findOne({ guildID: guild.id });
        if (servers) {
            await servers.deleteOne();
        }
    },
};