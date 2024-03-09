module.exports = {
    name: `afk`,
    cooldown: 4,
    votedcooldown: 1,
    botpermission: ['SendMessages', 'EmbedLinks'],

    helpDescription: `Makes a user afk`,
    helpUsage: `**afk**`,
    helpGroup: `Fun`,
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        let reasonMSG
        if (args[0]) {
            reasonMSG = args.slice(0).join(" ")
        } else if (!args[0]) {
            reasonMSG = `${userS.profile[0]["afkreason"] == undefined ? "None" : userS.profile[0]["afkreason"]}`
        }

        if (userS.profile[0]["afk"] == false) {
            //afk command id:5
            userS.profile.set(0, { commandsused: userS.profile[0]["commandsused"], messagessent: userS.profile[0]["messagessent"], afk: true, afkreason: reasonMSG })
            userS.save().catch((err) => client.outputsend("Error", err))
            return message.channel.send(`${message.author} is now afk! | Reason: ${reasonMSG}`);
        }
    }
};