module.exports = {
    name: `blacklist`,
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks'],
    dev: true,

    helpDescription: 'Blacklist from using Draid.',
    helpUsage: '**blacklist**',
    helpGroup: 'Devs',
    helpSubcommands: ["**user** {ID} {on/off}", "**server** {ID} {on/off}"],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {


        if (args[0] == "user") {
            if (args[1]) {
                const userid = targett.id || args[1];
                const userSS = await user.findOne({ userID: userid });
                if (!userSS) {
                    if (!client.users.cache.has(userid)) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.reply(`That user isn't real.`).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.reply(`Ten użytkownik nie jest prawdziwy.`).catch((err) => client.outputsend("Error", err));
                        }
                    } else if (client.users.cache.has(userid)) {
                        const newUser = await user.create({ userID: userid });
                        newUser.save().catch((err) => client.outputsend("Error", err));
                    }
                }

                if (!client.users.cache.has(userid)) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply(`That user isn't real.`).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply(`Ten użytkownik nie jest prawdziwy.`).catch((err) => client.outputsend("Error", err));
                    }
                }

                if (userid == message.author.id) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply(`You can't blacklist yourself.`).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply(`Nie możesz zablokować samego siebie.`).catch((err) => client.outputsend("Error", err));
                    }
                }

                if (userid == client.user.id) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply(`You can't blacklist the bot.`).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply(`Nie możesz zablokować bota.`).catch((err) => client.outputsend("Error", err));
                    }
                }

                if (userSS) {
                    if (args[2] == "on") {
                        if (userSS.draiddevs[1]["blacklisted"] == true) {
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`This user is already blacklisted.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Ten użytkownik jest już zablokowany.`).catch((err) => client.outputsend("Error", err));
                            }
                        } else if (userSS.draiddevs[1]["blacklisted"] == false) {
                            userSS.draiddevs.set(1, { blacklisted: true });
                            userSS.save().catch((err) => client.outputsend("Error", err));
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`Blacklisted user \`${args[1]}\` from using Draid.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Zablokowano użytkownika \`${args[1]}\` od używając Draid.`).catch((err) => client.outputsend("Error", err));
                            }
                        }
                    } else if (args[2] == "off") {
                        if (userSS.draiddevs[1]["blacklisted"] == false) {
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`This user is not blacklisted.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Ten użytkownik nie jest zablokowany.`).catch((err) => client.outputsend("Error", err));
                            }
                        } else if (userSS.draiddevs[1]["blacklisted"] == true) {
                            userSS.draiddevs.set(1, { blacklisted: false });
                            userSS.save().catch((err) => client.outputsend("Error", err));
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`Unblacklisted user \`${args[1]}\` from using Draid.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Odblokowano użytkownika \`${args[1]}\` od używając Draid.`).catch((err) => client.outputsend("Error", err));
                            }
                        }
                    } else if (!args[2]) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.reply(`Please specify if you want to blacklist or unblacklist the user.`).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.reply(`Proszę podać czy chcesz zablokować czy odblokować użytkownika.`).catch((err) => client.outputsend("Error", err));
                        }
                    }
                }
            } else if (!targett || !args[1]) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply(`You didn't specify a user.`).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply(`Nie podano użytkownika.`).catch((err) => client.outputsend("Error", err));
                }
            }
        } else if (args[0] == "guild") {
            if (args[1]) {
                const serverSS = await server.findOne({ guildID: args[1] });
                if (!serverSS) {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply(`That server isn't real.`).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply(`Ten serwer nie jest prawdziwy.`).catch((err) => client.outputsend("Error", err));
                    }
                    const newServer = await server.create({ guildID: args[1] });
                    newServer.save().catch((err) => client.outputsend("Error", err));
                }

                if (args[1] == "831828880016408637" || args[1] == "973260639348854784") {
                    if (userS.settings[0]["lang"] == "english") {
                        return message.reply(`You can't blacklist the Draid Community server.`).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == "polish") {
                        return message.reply(`Nie możesz zablokować serwera Draid Community.`).catch((err) => client.outputsend("Error", err));
                    }
                }
                if (serverSS) {
                    if (args[2] == "on") {
                        if (serverSS.draiddevs[1]["blacklisted"] == true) {
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`This server is already blacklisted.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Ten serwer jest już zablokowany.`).catch((err) => client.outputsend("Error", err));
                            }
                        } else if (serverSS.draiddevs[1]["blacklisted"] == false) {
                            serverSS.draiddevs.set(1, { blacklisted: true });
                            serverSS.save().catch((err) => client.outputsend("Error", err));
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`Blacklisted server \`${args[1]}\` from using Draid.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Zablokowano serwer \`${args[1]}\` od używając Draid.`).catch((err) => client.outputsend("Error", err));
                            }
                        }
                    } else if (args[2] == "off") {
                        if (serverSS.draiddevs[1]["blacklisted"] == false) {
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`This server is not blacklisted.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Ten serwer nie jest zablokowany.`).catch((err) => client.outputsend("Error", err));
                            }
                        } else if (serverSS.draiddevs[1]["blacklisted"] == true) {
                            serverSS.draiddevs.set(1, { blacklisted: false });
                            serverSS.save().catch((err) => client.outputsend("Error", err));
                            if (userS.settings[0]["lang"] == "english") {
                                return message.reply(`Unblacklisted server \`${args[1]}\` from using Draid.`).catch((err) => client.outputsend("Error", err));
                            } else if (userS.settings[0]["lang"] == "polish") {
                                return message.reply(`Odblokowano serwer \`${args[1]}\` od używając Draid.`).catch((err) => client.outputsend("Error", err));
                            }
                        }
                    } else if (!args[2]) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.reply(`Please specify if you want to blacklist or unblacklist the server.`).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.reply(`Proszę podać czy chcesz zablokować czy odblokować serwer.`).catch((err) => client.outputsend("Error", err));
                        }
                    }
                }
            } else if (!args[1]) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply(`You didn't specify a server.`).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply(`Nie podano serwera.`).catch((err) => client.outputsend("Error", err));
                }
            }
        } else if (!args[0]) {
            if (userS.settings[0]["lang"] == "english") {
                return message.reply(`Please specify a type of blacklisting.\n \`(user, guild)\``).catch((err) => client.outputsend("Error", err));
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.reply(`Proszę podać typ blokowania.\n \`(user, guild)\``).catch((err) => client.outputsend("Error", err));
            }
        }
    }
};