const server = require("../../models/server.js");


module.exports = {
    name: 'guildCreate',
    async execute(client, guild) {
        const servers = await server.findOne({ guildID: guild.id });
        if (!servers) {
            const newServer = new server({ guildID: guild.id });
            await newServer.save()
        } else if (servers) {
            await servers.Delete();
            const newServer = new server({ guildID: guild.id });
            await newServer.save()
        }
    },
};