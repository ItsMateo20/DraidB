require("dotenv").config()
const mongoose = require('mongoose');
const users = require('../../models/user.js');
const servers = require('../../models/server.js');



mongoose.connect(process.env.MONGODBLOGIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    await servers.updateMany({ "settings.$[].notifysongs": [true] }, { "$unset": { pi: 1 } }, { upsert: false, new: true, strict: false }).catch((err) => {
        return console.error("Data wasn't changed because an unexpected error showed up!\n\n" + `ERROR MESSAGE: ${err.message}\n\nERROR: ${err}`)
    }).then(() => {
        console.log(`Data updated`)
    })
})