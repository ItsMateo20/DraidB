const { ChannelType } = require("discord.js");

// const Sequelize = require('sequelize');

module.exports = {
    name: `debug`,
    aliases: ['dbg'],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks', 'UseEmojis'],
    dev: true,

    helpDescription: 'debugging draid',
    helpUsage: '**debug**',
    helpGroup: 'Devs',
    helpSubcommands: ['**database** {add/remove/get} {server/user/serveruser} [user]', '**test**', '**activity** [reset]/{Activity message}'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {


        if (!args[0]) {
            if (userS.settings[0]["lang"] == 'english') {
                return message.channel.send({
                    embeds: [{ title: `**Arguments:**`, description: `> Activity - Change the activity of that shard!\n> Database - Controlling the database\n> Test - Test something IDK`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                }).catch((err) => client.outputsend("Error", err));
            }
        } else if (args[0] == 'test') {
            // const sequelize = new Sequelize({
            //     host: '89.71.156.191',
            //     port: 7249,
            //     dialect: 'sqlite',
            //     logging: false,
            //     username: 'Draid',
            //     password: 'DraidDatabase#$!*',
            //     storage: 'C:/Users/itsma/Desktop/Programming/Draid/DraidBD/database.sqlite',
            // });

            // const Users = sequelize.define('users', {
            //     userId: {
            //         type: Sequelize.NUMBER,
            //         unique: true,
            //         primaryKey: true,
            //     },
            //     username: {
            //         type: Sequelize.STRING,
            //         unique: true,
            //     },
            // });

            // Users.sync()

            // sequelize.authenticate().then(() => {
            //     console.log('Connection has been established successfully.');
            // })

            // const User = await Users.findOne({ where: { userId: message.author.id } })
            // if (!User) {
            //     message.reply(`you are not in database`)
            // } else {
            //     message.reply(`you are in database\n\n${User.username}`)
            // }
        } else if (args[0] == 'activity') {
            if (args[1] == 'reset') {
                await client.user.setActivity(`${client.config.DefaultActivity}${client.shard.ids[0] + 1}`, { type: Discord.ActivityType.Listening })
                if (userS.settings[0]["lang"] == 'english') {
                    return message.channel.send({
                        embeds: [{ title: `Activity reset!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == 'polish') {
                    return message.channel.send({
                        embeds: [{ title: `Aktywność została zresetowana!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            } else if (args[1] !== 'reset') {
                const activity = args.slice(1).join(" ")
                if (!activity) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{ title: `**Arguments:**`, description: `> The activity you want to set`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{ title: `**Argumenty:**`, description: `> Aktywność, którą chcesz ustawić`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                } else if (activity) {
                    await client.user.setActivity(`${activity}`, { type: Discord.ActivityType.Listening })
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({ embeds: [{ title: `**Activity set to \`${activity}\` for shard: ${client.shard.ids[0] + 1}**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({ embeds: [{ title: `**Aktywność ustawiona na \`${activity}\` dla sharda: ${client.shard.ids[0] + 1}**`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
                    }
                }
            }
        } else if (args[0] == "database" || args[0] == "db") {
            if (!args[1]) {
                if (userS.settings[0]["lang"] == 'english') {
                    return message.channel.send({
                        embeds: [{ title: `** Arguments:**`, description: `> add - Adding to the database\n > remove - Removing from the database\n > get - Get a database`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == 'polish') {
                    return message.channel.send({
                        embeds: [{ title: `** Argumenty:**`, description: `> add - Dodawanie do bazy danych\n> remove - Usuwanie z bazy danych\n > get - Pobieranie bazy danych`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            } else if (args[1] == "add") {
                if (!args[2]) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{ title: `** Arguments:**`, description: `> server - Adding a server\n > user - Adding a user\n > serveruser - Adding a serveruser`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{ title: `** Argumenty:**`, description: `> server - Dodawanie serwera\n > user - Dodawanie użytkownika\n > serveruser - Dodawanie użytkownika serwera`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                } else if (args[2] == "server") {
                    const serverSS = await server.findOne({ guildID: message.guild.id });
                    if (!serverSS) {
                        const newServer = new server({ guildID: message.guild.id });
                        await newServer.save()
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Saved ${message.guild.name}\'s server to the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Zapisano ${message.guild.name} serwer do bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    } else {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${message.guild.name} \'s server is already in the database, I cannot save it again.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${message.guild.name} serwer jest już w bazie danych, nie można go zapisać ponownie.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
                if (args[2] == "user") {
                    const userFind = await client.users.cache.get(target.id);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the user you are trying to add to the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć użytkownika, którego chcesz dodać do bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                    const userSS = await user.findOne({ userID: userFind.id });
                    if (!userSS) {
                        const newUser = new user({ userID: userFind.id, userUSERNAME: userFind.username });
                        await newUser.save()
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Saved ${userFind.username} \'s user to the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Zapisano ${userFind.username} użytkownika do bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    } else {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} user is already in the database, I cannot save it again.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} jest już w bazie danych, nie można go zapisać ponownie.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
                if (args[2] == "serveruser") {
                    const userFind = await client.users.cache.get(target.id);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the serveruser you are trying to add to the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć serwerużytkownik, którego chcesz dodać do bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                    const serveruserSS = await serveruser.findOne({ guildID: message.guild.id, userID: userFind.id });
                    if (!serveruserSS) {
                        const newServerUser = new serveruser({ guildID: message.guild.id, userID: userFind.id });
                        await newServerUser.save()
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Saved ${userFind.username} \'s serveruser to the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Zapisano ${userFind.username} serwerużytkownik  do bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    } else {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s serveruser is already in the database, I cannot save it again.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} serwerużytkownik  jest już w bazie danych, nie można go zapisać ponownie.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    }
                }
            } else if (args[1] == "remove") {
                if (!args[2]) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{ title: `** Arguments:**\n > server - Removing a server\n > user - Removing a user\n > serveruser - Removing a serveruser`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{ title: `** Argumenty:**\n > server - Usuwanie serwera\n > user - Usuwanie użytkownika\n > serveruser - Usuwanie serwerużytkownika`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                } else if (args[2] == "server") {
                    const serverSS = await server.findOne({ guildID: message.guild.id });
                    if (!serverSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `This server is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Ten serwer nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await serverSS.deleteOne();
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Removed ${message.guild.name} \'s server from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Usunięto ${message.guild.name} serwer z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                } else if (args[2] == "user") {
                    const userFind = await client.users.cache.get(target.id);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the user you are trying to remove from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć użytkownika, którego chcesz usunąć z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                    const userSS = await user.findOne({ userID: userFind.id });
                    if (!userSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s user is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} użytkownik nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await userSS.deleteOne();
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Removed ${userFind.username} \'s user from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Usunięto ${userFind.username} użytkownika z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                } else if (args[2] == "serveruser") {
                    const userFind = await client.users.cache.get(targett.id || message.author.id);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the serveruser you are trying to remove from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć serwerużytkownika, którego chcesz usunąć z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                    const serveruserSS = await serveruser.findOne({ guildID: message.guild.id, userID: userFind.id });
                    if (!serveruserSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s serveruser is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} serwerużytkownik nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await serveruserSS.deleteOne();
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Removed ${userFind.username} \'s serveruser from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Usunięto ${userFind.username} serwerużytkownika z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                }
            } else if (args[1] == "get") {
                if (!args[2]) {
                    if (userS.settings[0]["lang"] == 'english') {
                        return message.channel.send({
                            embeds: [{ title: `** Arguments:**\n > server - Getting a server\n > user - Getting a user\n > serveruser - Getting a serveruser`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    } else if (userS.settings[0]["lang"] == 'polish') {
                        return message.channel.send({
                            embeds: [{ title: `** Argumenty:**\n > server - Pobieranie serwera\n > user - Pobieranie użytkownika\n > serveruser - Pobieranie serwerużytkownika`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                        }).catch((err) => client.outputsend("Error", err));
                    }
                } else if (args[2] == "server") {
                    const serverSS = await server.findOne({ guildID: message.guild.id });
                    if (!serverSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${message.guild.name}\'s serveru is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${message.guild.name} serwer nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await fs.writeFile(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, `${serverSS} `, function (err) {
                            client.outputsend("Error", err);
                        })
                        if (userS.settings[0]["lang"] == "english") {
                            await message.channel.send({
                                embeds: [{
                                    title: `${message.guild.name} \'s data:`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            await message.channel.send({
                                embeds: [{
                                    title: `Dane ${message.guild.name}: `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                        await fs.unlinkSync(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, function (err) {
                            if (err) throw (err)
                        })
                    }
                } else if (args[2] == "user") {
                    const userFind = await client.users.cache.get(target.id);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the user you are trying to remove from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć użytkownika, którego chcesz usunąć z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                    const userSS = await user.findOne({ userID: userFind.id });
                    if (!userSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s user is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} użytkownik nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await fs.writeFile(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, `${userSS} `, function (err) {
                            client.outputsend("Error", err);
                        })
                        if (userS.settings[0]["lang"] == "english") {
                            await message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s data:`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            await message.channel.send({
                                embeds: [{
                                    title: `Dane ${userFind.username}: `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                        await fs.unlinkSync(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, function (err) {
                            if (err) throw (err)
                        })
                    }
                } else if (args[2] == "serveruser") {
                    const userFind = await client.users.cache.get(target.idd);
                    if (!userFind) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `I cannot find the user you are trying to remove from the database.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Nie mogę znaleźć użytkownika, którego chcesz usunąć z bazy danych.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err));
                        }
                    }
                    const serveruserSS = await serveruser.findOne({ guildID: message.guild.id, userID: userFind.id });
                    if (!serveruserSS) {
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s serveruser is not in the database, I cannot remove it.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} serwerużytkownik nie jest w bazie danych, nie można go usunąć.`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                    } else {
                        await fs.writeFile(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, `${serveruserSS} `, function (err) {
                            client.outputsend("Error", err);
                        })
                        if (userS.settings[0]["lang"] == "english") {
                            return message.channel.send({
                                embeds: [{
                                    title: `${userFind.username} \'s data:`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        } else if (userS.settings[0]["lang"] == "polish") {
                            return message.channel.send({
                                embeds: [{
                                    title: `Dane ${userFind.username}: `, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                                }], files: [`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`]
                            }).catch((err) => client.outputsend("Error", err))
                        }
                        await fs.unlinkSync(`./ src / TimedFiles / ${message.author.id} _databaseGet.txt`, function (err) {
                            if (err) throw (err)
                        })
                    }
                }
            }
        } else if (args[0] == "annouce") {
            if (!args[1]) {
                if (userS.settings[0]["lang"] == 'english') {
                    message.channel.send({
                        embeds: [{ title: `**Arguments:**\n > message - the message you want to annouce to all servers \n > preview - preview how the message will look like on other servers`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                } else if (userS.settings[0]["lang"] == 'polish') {
                    message.channel.send({
                        embeds: [{ title: `**Argumenty:**\n > message - wiadomość, którą chcesz ogłosić wszystkim serwerom \n > preview - podglądnij, jak będzie wyglądać twoja wiadomość na innych serwerach`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }]
                    }).catch((err) => client.outputsend("Error", err));
                }
            } else if (args[1] == "preview") {
                message.channel.send({ embeds: [{ title: `**Annoucement**`, description: `${args.slice(2).join(" ")}`, color: 0x3498DB, footer: { text: `Sent by ${message.author.username}`, icon_url: `${message.author.avatarURL({ dynamic: true })}` } }] }).catch((err) => client.outputsend("Error", err));
            } else if (args[1] == "message") {
                const username = message.author.username
                const avatarUrl = message.author.avatarURL({ dynamic: true })
                client.shard.broadcastEval(async (c, { args, username, avatarUrl }) => {
                    c.guilds.cache.forEach(guild => {
                        const { ChannelType, PermissionsBitField } = require('discord.js')
                        const channel = guild.channels.cache.find(channel => channel.type === ChannelType.GuildText && channel.permissionsFor(c.user.id).has(PermissionsBitField.Flags.SendMessages, false) && channel.permissionsFor(c.user.id).has(PermissionsBitField.Flags.EmbedLinks, false))
                        if (!channel) return;
                        channel.send({ embeds: [{ title: `**Annoucement**`, description: `${args.slice(2).join(" ")}`, color: 0x3498DB, footer: { text: `Sent by ${username}`, icon_url: `${avatarUrl}` } }] }).catch((err) => c.outputsend("Error", err));
                    })
                }, { context: { args: args, username: username, avatarUrl: avatarUrl } });
            }
        }
    }
}