module.exports = {
    name: `achievements`,
    aliases: [`achieve`],
    cooldown: 4,
    votedcooldown: 1,
    botpermissions: ['SendMessages', 'EmbedLinks'],

    helpDescription: 'Gives you some fun achievements to do',
    helpUsage: '**achievements**',
    helpGroup: 'Fun',
    helpSubcommands: ['**claim** all', '**add** {ID} {achievement id} {{Devs only}}', '**remove** {ID} {achievement id} {{devs only}}'],
    async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

        return message.channel.send("This command is currently disabled due to database overload. Sorry for the inconvenience. It will be back when we change database to a local one damn a cloud one. 😓")

        const coin = '<:Coin:918638794738139176>'
        const tick = '<:tick:987617258018844712>'
        const x = '<:x_:987617259377786911>'

        let achievementsUserID

        if (args[1]) {
            if (!targett) {
                achievementsUserID = args[1]
            } else if (targett) {
                achievementsUserID = targett.id
            }
        }
        const userSS = await user.findOne({ userID: achievementsUserID });
        const achievementsUserFind = await client.users.cache.get(achievementsUserID)


        if (!args[0] || args[0] == "list") {
            if (userS.settings[0]["lang"] == 'english') {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Achievements list - pg 1")
                    .setDescription("Get rewards by completing achievements")
                    .addFields(
                        { name: `Member :) ${userS.achievements[1]["finished"] ? tick : x} ||ID: 1||`, value: `Description: \`Join the server\`\nReward: ${coin}\`${userS.achievements[1]["reward"]}\`\nDifficulty: \`${userS.achievements[1]["difficulty"]}\``, inline: true },
                        { name: `Beginner ${userS.achievements[2]["finished"] ? tick : x} ||ID: 2||`, value: `Description: \`Use a command\`\nReward: ${coin}\`${userS.achievements[2]["reward"]}\`\nDifficulty: \`${userS.achievements[2]["difficulty"]}\``, inline: true },
                        { name: `Newbie :3 ${userS.achievements[3]["finished"] ? tick : x} ||ID: 3||`, value: `Description: \`Send 100 messages\`\nReward: ${coin}\`${userS.achievements[3]["reward"]}\`\nDifficulty: \`${userS.achievements[3]["difficulty"]}\``, inline: true },
                        { name: `Shopper ${userS.achievements[4]["finished"] ? tick : x} ||ID: 4||`, value: `Description: \`Buy an item from ',shop'\`\nReward: ${coin}\`${userS.achievements[4]["reward"]}\`\nDifficulty: \`${userS.achievements[4]["difficulty"]}\``, inline: true },
                        { name: `Dissapointed ${userS.achievements[5]["finished"] ? tick : x} ||ID: 5||`, value: `Description: \`Get warned\`\nReward: ${coin}\`${userS.achievements[5]["reward"]}\`\nDifficulty: \`${userS.achievements[5]["difficulty"]}\``, inline: true },
                        { name: `Artist ${userS.achievements[6]["finished"] ? tick : x} ||ID: 6||`, value: `Description: \`Post Art\`\nReward: ${coin}\`${userS.achievements[6]["reward"]}\`\nDifficulty: \`${userS.achievements[6]["difficulty"]}\``, inline: true },
                        { name: `Worker ${userS.achievements[8]["finished"] ? tick : x} ||ID: 8||`, value: `Description: \`Apply for a Job on ',work'\`\nReward: ${coin}\`${userS.achievements[8]["reward"]}\`\nDifficulty: \`${userS.achievements[8]["difficulty"]}\``, inline: true },
                        { name: `Awesome! ${userS.achievements[9]["finished"] ? tick : x} ||ID: 9||`, value: `Description: \`Invite Draid to your server\`\nReward: ${coin}\`${userS.achievements[9]["reward"]}\`\nDifficulty: \`${userS.achievements[9]["difficulty"]}\``, inline: true },
                        { name: `Voted! ${userS.achievements[10]["finished"] ? tick : x} ||ID: 10||`, value: `Description: \`Vote for the bot!\`\nReward: ${coin}\`${userS.achievements[10]["reward"]}\`\nDifficulty: \`${userS.achievements[10]["difficulty"]}\``, inline: true },
                        { name: `AFK ${userS.achievements[7]["finished"] ? tick : x} ||ID: 7 || `, value: `Description: \`Be AFK\`\nReward: ${coin}\`${userS.achievements[7]["reward"]}\`\nDifficulty: \`${userS.achievements[7]["difficulty"]}\``, inLine: true },
                    )
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Achievements list - pg 2")
                    .setDescription("Get rewards by completing achievements")
                    .addFields(
                        { name: `Adventurer ${userS.achievements[11]["finished"] ? tick : x} ||ID: 11||`, value: `Description: \`Complete over 5 achievements\`\nReward: ${coin}\`${userS.achievements[11]["reward"]}\`\nDifficulty: \`${userS.achievements[11]["difficulty"]}\``, inline: true },
                        { name: `Verified ${userS.achievements[12]["finished"] ? tick : x} ||ID: 12||`, value: `Description: \`Confirmed to be over 13\`\nReward: ${coin}\`${userS.achievements[12]["reward"]}\`\nDifficulty: \`${userS.achievements[12]["difficulty"]}\``, inline: true },
                        { name: `Reporter ${userS.achievements[13]["finished"] ? tick : x} ||ID: 13||`, value: `Description: \`Report someone for misbehaving\`\nReward: ${coin}\`${userS.achievements[13]["reward"]}\`\nDifficulty: \`${userS.achievements[13]["difficulty"]}\``, inline: true },
                        { name: `Active ${userS.achievements[14]["finished"] ? tick : x} ||ID: 14||`, value: `Description: \`Send over 2k messages\`\nReward: ${coin}\`${userS.achievements[14]["reward"]}\`\nDifficulty: \`${userS.achievements[14]["difficulty"]}\``, inline: true },
                        { name: `Crazy ${userS.achievements[15]["finished"] ? tick : x} ||ID: 15||`, value: `Description: \`Use over 100 commands\`\nReward: ${coin}\`${userS.achievements[15]["reward"]}\`\nDifficulty: \`${userS.achievements[15]["difficulty"]}\``, inline: true },
                        { name: `Mona Lisa ${userS.achievements[16]["finished"] ? tick : x} ||ID: 16||`, value: `Description: \`Have your art accepted\`\nReward: ${coin}\`${userS.achievements[16]["reward"]}\`\nDifficulty: \`${userS.achievements[16]["difficulty"]}\``, inline: true },
                        { name: `Contributor ${userS.achievements[17]["finished"] ? tick : x} ||ID: 17||`, value: `Description: \`Suggest a idea and have it accepted\`\nReward: ${coin}\`${userS.achievements[17]["reward"]}\`\nDifficulty: \`${userS.achievements[17]["difficulty"]}\``, inline: true },
                        { name: `Millionaire ${userS.achievements[18]["finished"] ? tick : x} ||ID: 18||`, value: `Description: \`Have 1 million cash\`\nReward: ${coin}\`${userS.achievements[18]["reward"]}\`\nDifficulty: \`${userS.achievements[18]["difficulty"]}\``, inline: true },
                        { name: `Funny ${userS.achievements[19]["finished"] ? tick : x} ||ID: 19||`, value: `Description: \`Have a developer laugh at a joke of yours\`\nReward: ${coin}\`${userS.achievements[19]["reward"]}\`\nDifficulty: \`${userS.achievements[19]["difficulty"]}\``, inline: true },
                        { name: `Trustful ${userS.achievements[20]["finished"] ? tick : x} ||ID: 20||`, value: `Description: \`Send over 10k messages\`\nReward: ${coin}\`${userS.achievements[20]["reward"]}\`\nDifficulty: \`${userS.achievements[20]["difficulty"]}\``, inline: true },
                    )
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Achievements list - pg 3")
                    .setDescription("Get rewards by completing achievements")
                    .addFields(
                        { name: `Tropical Seeker ${userS.achievements[21]["finished"] ? tick : x} ||ID: 21||`, value: `Description: \`Complete 10 achievements\`\nReward: ${coin}\`${userS.achievements[21]["reward"]}\`\nDifficulty: \`${userS.achievements[21]["difficulty"]}\``, inline: true },
                        { name: `Supportive ${userS.achievements[22]["finished"] ? tick : x} ||ID: 22||`, value: `Description: \`Be trusted by staff and help people\`\nReward: ${coin}\`${userS.achievements[22]["reward"]}\`\nDifficulty: \`${userS.achievements[22]["difficulty"]}\``, inline: true },
                        { name: `Chosen One ${userS.achievements[23]["finished"] ? tick : x} ||ID: 23||`, value: `Description: \`Be known by loads of the staff and members\`\nReward: ${coin}\`${userS.achievements[23]["reward"]}\`\nDifficulty: \`${userS.achievements[23]["difficulty"]}\``, inline: true },
                        { name: `Tester ${userS.achievements[24]["finished"] ? tick : x} ||ID: 24||`, value: `Description: \`Test something for the bot\`\nReward: ${coin}\`${userS.achievements[24]["reward"]}\`\nDifficulty: \`${userS.achievements[24]["difficulty"]}\``, inline: true },
                        { name: `Power ${userS.achievements[25]["finished"] ? tick : x} ||ID: 25||`, value: `Description: \`Become a staff member\`\nReward: ${coin}\`${userS.achievements[25]["reward"]}\`\nDifficulty: \`${userS.achievements[25]["difficulty"]}\``, inline: true },
                        { name: `Billionaire ${userS.achievements[26]["finished"] ? tick : x} ||ID: 26||`, value: `Description: \`Have 1 billion cash\`\nReward: ${coin}\`${userS.achievements[26]["reward"]}\`\nDifficulty: \`${userS.achievements[26]["difficulty"]}\``, inline: true },
                        { name: `Tryhard ${userS.achievements[27]["finished"] ? tick : x} ||ID: 27||`, value: `Description: \`Send over 1000 commands\`\nReward: ${coin}\`${userS.achievements[27]["reward"]}\`\nDifficulty: \`${userS.achievements[27]["difficulty"]}\``, inline: true },
                        { name: `Collabration ${userS.achievements[28]["finished"] ? tick : x} ||ID: 28||`, value: `Description: \`Collab with Draid\`\nReward: ${coin}\`${userS.achievements[28]["reward"]}\`\nDifficulty: \`${userS.achievements[28]["difficulty"]}\``, inline: true },
                        { name: `Friendly ${userS.achievements[29]["finished"] ? tick : x} ||ID: 29||`, value: `Description: \`Be friends with the creators\`\nReward: ${coin}\`${userS.achievements[29]["reward"]}\`\nDifficulty: \`${userS.achievements[29]["difficulty"]}\``, inline: true },
                        { name: `Master Achiever ${userS.achievements[30]["finished"] ? tick : x} ||ID: 30||`, value: `Description: \`Obtain all achievements\`\nReward: ${coin}\`${userS.achievements[30]["reward"]}\`\nDifficulty: \`${userS.achievements[30]["difficulty"]}\``, inline: true },
                    )
                    .setColor(0x3498DB))

                const getRow = (id) => {
                    const row = new Discord.ActionRowBuilder()
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('prev_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('◀')
                            .setDisabled(pages[id] === 0)
                    )
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('next_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('▶')
                            .setDisabled(pages[id] === embeds.length - 1)
                    )
                    return row
                }

                const id = message.author.id
                pages[id] = pages[id] || 0

                const embed = embeds[pages[id]]
                let reply = message | undefined
                let collector

                const filter = (i) => i.user.id === message.author.id
                const time = 1000 * 60 * 5

                reply = await message.reply({
                    embeds: [embed],
                    components: [getRow(id)]
                })

                collector = reply.createMessageComponentCollector({ filter, time })

                collector.on('collect', async (btnInt) => {
                    if (!btnInt) return;
                    btnInt.deferUpdate()
                    if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") return;

                    if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                        --pages[id]
                    } else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
                        ++pages[id]
                    }

                    reply.edit({
                        embeds: [embeds[pages[id]]],
                        components: [getRow(id)]
                    })

                })
            } else if (userS.settings[0]["lang"] == "polish") {
                const embeds = []
                const pages = {}

                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Osiagnięcia - str 1")
                    .setDescription("Wyświetlane są osiagnięcia wg. ich trudności.")
                    .addFields(
                        { name: `Członek :) ${userS.achievements[1]["finished"] ? tick : x} ||ID: 1||`, value: `Opis: \`Dołącz do serwera\`\nNagroda: ${coin}\`${userS.achievements[1]["reward"]}\`\nTrudność: \`${userS.achievements[1]["difficulty"]}\``, inline: true },
                        { name: `Początkujący ${userS.achievements[2]["finished"] ? tick : x} ||ID: 2||`, value: `Opis: \`Użyj komendy\`\nNagroda: ${coin}\`${userS.achievements[2]["reward"]}\`\nTrudność: \`${userS.achievements[2]["difficulty"]}\``, inline: true },
                        { name: `Noob :3 ${userS.achievements[3]["finished"] ? tick : x} ||ID: 3||`, value: `Opis: \`Wyślij 100 wiadomości\`\nNagroda: ${coin}\`${userS.achievements[3]["reward"]}\`\nTrudność: \`${userS.achievements[3]["difficulty"]}\``, inline: true },
                        { name: `Klient ${userS.achievements[4]["finished"] ? tick : x} ||ID: 4||`, value: `Opis: \`Kup przedmiot w sklepie uzywając ',shop'\`\nNagroda: ${coin}\`${userS.achievements[4]["reward"]}\`\nTrudność: \`${userS.achievements[4]["difficulty"]}\``, inline: true },
                        { name: `Zawiedziony ${userS.achievements[5]["finished"] ? tick : x} ||ID: 5||`, value: `Opis: \`Zostań Ostrzegniony\`\nNagroda: ${coin}\`${userS.achievements[5]["reward"]}\`\nTrudność: \`${userS.achievements[5]["difficulty"]}\``, inline: true },
                        { name: `Artysta ${userS.achievements[6]["finished"] ? tick : x} ||ID: 6||`, value: `Opis: \`Sztuka pocztowa\`\nNagroda: ${coin}\`${userS.achievements[6]["reward"]}\`\nTrudność: \`${userS.achievements[6]["difficulty"]}\``, inline: true },
                        { name: `Pracownik ${userS.achievements[8]["finished"] ? tick : x} ||ID: 8||`, value: `Opis: \`Bądź AFK\`\nNagroda: ${coin}\`${userS.achievements[8]["reward"]}\`\nTrudność: \`${userS.achievements[8]["difficulty"]}\``, inline: true },
                        { name: `Niesamowite! ${userS.achievements[9]["finished"] ? tick : x} ||ID: 9||`, value: `Opis: \`Aplikuj o pracę uzywając ',job'\`\nNagroda: ${coin}\`${userS.achievements[9]["reward"]}\`\nTrudność: \`${userS.achievements[9]["difficulty"]}\``, inline: true },
                        { name: `Głosował! ${userS.achievements[10]["finished"] ? tick : x} ||ID: 10||`, value: `Opis: \`Zaproś Draida na swój serwer\`\nNagroda: ${coin}\`${userS.achievements[10]["reward"]}\`\nTrudność: \`${userS.achievements[10]["difficulty"]}\``, inline: true },
                        { name: `AFK ${userS.achievements[7]["finished"] ? tick : x} ||ID: 7||`, value: `Opis: \`Głosuj na bota!\`\nNagroda: ${coin}\`${userS.achievements[7]["reward"]}\`\nTrudność: \`${userS.achievements[7]["difficulty"]}\``, inline: true },
                    )
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Osiagnięcia - str 2")
                    .setDescription("Wyświetlane są osiagnięcia wg. ich trudności.")
                    .addFields(
                        { name: `Poszukiwacz przygód ${userS.achievements[11]["finished"] ? tick : x} ||ID: 11||`, value: `Opis: \`Ukończ ponad 5 osiągnięć\`\nNagroda: ${coin}\`${userS.achievements[11]["reward"]}\`\nTrudność: \`${userS.achievements[11]["difficulty"]}\``, inline: true },
                        { name: `Verified ${userS.achievements[12]["finished"] ? tick : x} ||ID: 12||`, value: `Opis: \`Potwierdzono, że ma ponad 13 lat\`\nNagroda: ${coin}\`${userS.achievements[12]["reward"]}\`\nTrudność: \`${userS.achievements[12]["difficulty"]}\``, inline: true },
                        { name: `Reporter ${userS.achievements[13]["finished"] ? tick : x} ||ID: 13||`, value: `Opis: \`Zgłoś kogoś za złe zachowanie\`\nNagroda: ${coin}\`${userS.achievements[13]["reward"]}\`\nTrudność: \`${userS.achievements[13]["difficulty"]}\``, inline: true },
                        { name: `Aktywny ${userS.achievements[14]["finished"] ? tick : x} ||ID: 14||`, value: `Opis: \`Wyślij ponad 2k wiadomości\`\nNagroda: ${coin}\`${userS.achievements[14]["reward"]}\`\nTrudność: \`${userS.achievements[14]["difficulty"]}\``, inline: true },
                        { name: `Zwariowany ${userS.achievements[15]["finished"] ? tick : x} ||ID: 15||`, value: `Opis: \`Użyj ponad 100 komend\`\nNagroda: ${coin}\`${userS.achievements[15]["reward"]}\`\nTrudność: \`${userS.achievements[15]["difficulty"]}\``, inline: true },
                        { name: `Mona Lisa ${userS.achievements[16]["finished"] ? tick : x} ||ID: 16||`, value: `Opis: \`Dostań swoją sztukę żeby była zaakceptowana\`\nNagroda: ${coin}\`${userS.achievements[16]["reward"]}\`\nTrudność: \`${userS.achievements[16]["difficulty"]}\``, inline: true },
                        { name: `Współpracownik ${userS.achievements[17]["finished"] ? tick : x} ||ID: 17||`, value: `Opis: \`Zaproponuj pomysł i niech został zaakceptowany\`\nNagroda: ${coin}\`${userS.achievements[17]["reward"]}\`\nTrudność: \`${userS.achievements[17]["difficulty"]}\``, inline: true },
                        { name: `Milioner ${userS.achievements[18]["finished"] ? tick : x} ||ID: 18||`, value: `Opis: \`Have 1 million cash\`\nNagroda: ${coin}\`${userS.achievements[18]["reward"]}\`\nTrudność: \`${userS.achievements[18]["difficulty"]}\``, inline: true },
                        { name: `Śmieszny ${userS.achievements[19]["finished"] ? tick : x} ||ID: 19||`, value: `Opis: \`Niech programista śmieje się z twojego żartu\`\nNagroda: ${coin}\`${userS.achievements[19]["reward"]}\`\nTrudność: \`${userS.achievements[19]["difficulty"]}\``, inline: true },
                        { name: `Ufny ${userS.achievements[20]["finished"] ? tick : x} ||ID: 20||`, value: `Opis: \`Wyślij ponad 10k wiadomości\`\nNagroda: ${coin}\`${userS.achievements[20]["reward"]}\`\nTrudność: \`${userS.achievements[20]["difficulty"]}\``, inline: true },
                    )
                    .setColor(0x3498DB))
                embeds.push(new Discord.EmbedBuilder()
                    .setTitle("Osiagnięcia - str 3")
                    .setDescription("Wyświetlane są osiagnięcia wg. ich trudności.")
                    .addFields(
                        { name: `Tropikalny poszukiwacz ${userS.achievements[21]["finished"] ? tick : x} ||ID: 21||`, value: `Opis: \`Ukończ 10 osiągnięć\`\nNagroda: ${coin}\`${userS.achievements[21]["reward"]}\`\nTrudność: \`${userS.achievements[21]["difficulty"]}\``, inline: true },
                        { name: `Wspierający ${userS.achievements[22]["finished"] ? tick : x} ||ID: 22||`, value: `Opis: \`Bądż zaufany przez personelowi i pomagaj ludziom\`\nNagroda: ${coin}\`${userS.achievements[22]["reward"]}\`\nTrudność: \`${userS.achievements[22]["difficulty"]}\``, inline: true },
                        { name: `Wybraniec ${userS.achievements[23]["finished"] ? tick : x} ||ID: 23||`, value: `Opis: \`Być znanym przez wielu pracowników i członków\`\nNagroda: ${coin}\`${userS.achievements[23]["reward"]}\`\nTrudność: \`${userS.achievements[23]["difficulty"]}\``, inline: true },
                        { name: `Próbnik ${userS.achievements[24]["finished"] ? tick : x} ||ID: 24||`, value: `Opis: \`Przetestuj coś dla bota\`\nNagroda: ${coin}\`${userS.achievements[24]["reward"]}\`\nTrudność: \`${userS.achievements[24]["difficulty"]}\``, inline: true },
                        { name: `Moc ${userS.achievements[25]["finished"] ? tick : x} ||ID: 25||`, value: `Opis: \`Zostań członkiem personelu\`\nNagroda: ${coin}\`${userS.achievements[25]["reward"]}\`\nTrudność: \`${userS.achievements[25]["difficulty"]}\``, inline: true },
                        { name: `Miliarder ${userS.achievements[26]["finished"] ? tick : x} ||ID: 26||`, value: `Opis: \`Posiadaj 1 miliard gotówki\`\nNagroda: ${coin}\`${userS.achievements[26]["reward"]}\`\nTrudność: \`${userS.achievements[26]["difficulty"]}\``, inline: true },
                        { name: `Tryhard ${userS.achievements[27]["finished"] ? tick : x} ||ID: 27||`, value: `Opis: \`Wyślij ponad 1000 poleceń\`\nNagroda: ${coin}\`${userS.achievements[27]["reward"]}\`\nTrudność: \`${userS.achievements[27]["difficulty"]}\``, inline: true },
                        { name: `Współpraca ${userS.achievements[28]["finished"] ? tick : x} ||ID: 28||`, value: `Opis: \`Współpraca z Draidem\`\nNagroda: ${coin}\`${userS.achievements[28]["reward"]}\`\nTrudność: \`${userS.achievements[28]["difficulty"]}\``, inline: true },
                        { name: `Przyjazny ${userS.achievements[29]["finished"] ? tick : x} ||ID: 29||`, value: `Opis: \`Zaprzyjaźnij się z twórcamim\`\nNagroda: ${coin}\`${userS.achievements[29]["reward"]}\`\nTrudność: \`${userS.achievements[29]["difficulty"]}\``, inline: true },
                        { name: `Mistrz Osiągnięć ${userS.achievements[30]["finished"] ? tick : x} ||ID: 30||`, value: `Opis: \`Zdobądź wszystkie osiągnięcia\`\nNagroda: ${coin}\`${userS.achievements[30]["reward"]}\`\nTrudność: \`${userS.achievements[30]["difficulty"]}\``, inline: true },
                    )
                    .setColor(0x3498DB))

                const getRow = (id) => {
                    const row = new Discord.ActionRowBuilder()
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('prev_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('◀')
                            .setDisabled(pages[id] === 0)
                    )
                    row.addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('next_embed')
                            .setStyle(Discord.ButtonStyle.Primary)
                            .setEmoji('▶')
                            .setDisabled(pages[id] === embeds.length - 1)
                    )
                    return row
                }

                const id = message.author.id
                pages[id] = pages[id] || 0

                const embed = embeds[pages[id]]
                let reply = message | undefined
                let collector

                const filter = (i) => i.user.id === message.author.id
                const time = 1000 * 60 * 5

                reply = await message.reply({
                    embeds: [embed],
                    components: [getRow(id)]
                })

                collector = reply.createMessageComponentCollector({ filter, time })

                collector.on('collect', async (btnInt) => {
                    if (!btnInt) return;
                    btnInt.deferUpdate()
                    if (btnInt.customId !== "prev_embed" && btnInt.customId !== "next_embed") return;

                    if (btnInt.customId === "prev_embed" && pages[id] > 0) {
                        --pages[id]
                    } else if (btnInt.customId === "next_embed" && pages[id] < embeds.length - 1) {
                        ++pages[id]
                    }

                    reply.edit({
                        embeds: [embeds[pages[id]]],
                        components: [getRow(id)]
                    })
                })
            }
        } else if (args[0] == "claim") {
            if (args[1] == "all") {
                let amountReward = 0
                for (let i = 0; i < userS.achievements.length - 1; i++) {
                    if (userS.achievements[i + 1]["finished"] == true && userS.achievements[i + 1]["claimed"] == false) {
                        userS.achievements.set(i + 1, { claimed: true, finished: true, name: userS.achievements[i + 1]["name"], reward: userS.achievements[i + 1]["reward"], difficulty: userS.achievements[i + 1]["difficulty"] })
                        amountReward += userS.achievements[i + 1]["reward"]
                    }
                }
                userS.inventory.set(0, { currency: userS.inventory[0]["currency"] + amountReward })
                userS.save().catch((err) => client.outputsend("Error", err))

                if (amountReward > 0) {
                    if (userS.settings[0]["lang"] == "english") {
                        await message.channel.send({
                            embeds: [{
                                title: `You have claimed all finished achievements and got ${coin}${amountReward} coins!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        })
                    } else if (userS.settings[0]["lang"] == "polish") {
                        await message.channel.send({
                            embeds: [{
                                title: `Zdobyłeś wszystkie ukończone osiągnięcia i otrzymałeś ${coin}${amountReward} kasy!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        })
                    }
                } else {
                    if (userS.settings[0]["lang"] == "english") {
                        await message.channel.send({
                            embeds: [{
                                title: `You don\'t have a finished achievement to claim`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        })
                    } else if (userS.settings[0]["lang"] == "polish") {
                        await message.channel.send({
                            embeds: [{
                                title: `Nie masz ukończonego osiągnięcia do zdobycia`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                            }]
                        })
                    }
                }
            }
        } else if (args[0] == "remove") {
            if (userS.draiddevs[0]["developer"] == false) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `You can\'t use this command, you\'re not a developer!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Nie możesz użyć tej komendy, nie jesteś wziązany z botem!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            if (!achievementsUserFind && !args[2]) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `You need to specify a user and an achievement!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Musisz określić użytkownika i osiągnięcie!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            if (!userSS) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `User not found!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Użytkownik nie znaleziony!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            if (args[2] > 30) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `That achievement dosen\'t exist!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Takie osiągnięcie nie istnieje!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            if (userSS.achievements[args[2]]["finished"] == false) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `This achievement isn't finished yet!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `To osiągnięcie nie jest jeszcze zakończone!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            userSS.achievements.set(args[2], { claimed: false, finished: false, name: userSS.achievements[args[2]]["name"], reward: userSS.achievements[args[2]]["reward"], difficulty: userSS.achievements[args[2]]["difficulty"] })

            userSS.inventory.set(0, { currency: userSS.inventory[0]["currency"] - userSS.achievements[args[2]]["reward"] })

            if (userSS.achievements[args[2]]["difficulty"] == "⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"] - 1, finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"] - 1, finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"] - 1, finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"] - 1, finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] - 1 })
            }

            await userSS.save().catch((err) => client.outputsend("Error", err))

            if (userS.settings[0]["lang"] == "english") {
                return message.reply({
                    embeds: [{ title: `Removed the achievement from \`${achievementsUserFind.username}\``, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.reply({
                    embeds: [{ title: `Usunięto osiągnięcie dla \`${achievementsUserFind.username}\``, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB }]
                }).catch((err) => client.outputsend("Error", err))
            }
        } else if (args[0] == "add") {
            if (userS.draiddevs[0]["developer"] == false) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `You can\'t use this command, you\'re not a developer!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Nie możesz użyć tej komendy, nie jesteś wziązany z botem!`, color: 0x3498DB, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            if (!achievementsUserFind && !args[2]) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `You need to specify a user and an achievement!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Musisz określić użytkownika i osiągnięcie!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            if (!args[2]) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `You need to specify an achievement!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Musisz określić osiągnięcie!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }
            if (!userSS) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `User not found!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Użytkownik nie znaleziony!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            if (args[2] > 30) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `That achievement dosen\'t exist!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Takie osiągnięcie nie istnieje!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            if (userSS.achievements[args[2]]["finished"] == true) {
                if (userS.settings[0]["lang"] == "english") {
                    return message.reply({
                        embeds: [{
                            title: `Achievement already finished!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                } else if (userS.settings[0]["lang"] == "polish") {
                    return message.reply({
                        embeds: [{
                            title: `Osiągnięcie zostało już ukończone!`, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB
                        }]
                    }).catch((err) => client.outputsend("Error", err))
                }
            }

            userSS.achievements.set(args[2], { claimed: true, finished: true, name: userSS.achievements[args[2]]["name"], reward: userSS.achievements[args[2]]["reward"], difficulty: userSS.achievements[args[2]]["difficulty"] })

            userSS.inventory.set(0, { currency: userSS.inventory[0]["currency"] + userSS.achievements[args[2]]["reward"] })

            if (userSS.achievements[args[2]]["difficulty"] == "⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"] + 1, finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"] + 1, finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
            } else if (userSS.achievements[args[2]]["difficulty"] == "⭐ ⭐ ⭐ ⭐ ⭐") {
                userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"], finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] + 1 })
            }

            await userSS.save().catch((err) => client.outputsend("Error", err))

            if (userS.settings[0]["lang"] == "english") {
                return message.reply({
                    embeds: [{ title: `Added the achievement to \`${achievementsUserFind.username}\``, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB }]
                }).catch((err) => client.outputsend("Error", err))
            } else if (userS.settings[0]["lang"] == "polish") {
                return message.reply({
                    embeds: [{ title: `Added osiągnięcie do \`${achievementsUserFind.username}\``, footer: { text: `https://draid.vercel.app`, icon_url: `${message.author.avatarURL({ dynamic: true })}` }, color: 0x3498DB }]
                }).catch((err) => client.outputsend("Error", err))
            }
        }
    }
}