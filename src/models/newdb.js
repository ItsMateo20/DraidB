const user = require("./user.js");
const server = require("./server.js");
const serveruser = require("./serveruser.js");

module.exports = {
    name: 'newdb',
    async execute(userTF, serverTF, serveruserTF, userid, guildid) {

        let userS = {}
        let serverS = {}
        let serveruserS = {}

        if (userTF == true) {
            const userNew = await user.findOne({ userID: userid });
            if (!userNew) {
                const newUser = new user({ userID: userid });
                await newUser.save()
            }
            userS = await user.findOne({ userID: userid });
        }
        if (serverTF == true) {
            const serverNew = await server.findOne({ guildID: guildid });
            if (!serverNew) {
                const newServer = new server({ guildID: guildid });
                await newServer.save()
            }
            serverS = await server.findOne({ guildID: guildid });
        }
        if (serveruserTF == true) {
            const serveruserNew = await serveruser.findOne({ userID: userid, guildID: guildid });
            if (!serveruserNew) {
                const newServerUser = new serveruser({ guildID: guildid, userID: userid });
                await newServerUser.save()
            }
            serveruserS = await serveruser.findOne({ userID: userid, guildID: guildid });
        }


        return { userS, serverS, serveruserS }
    }
}