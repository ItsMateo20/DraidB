//messageCreate id:0

// if (userS.achievements[2]["finished"] == false || userS.achievements[15]["finished"] == false || userS.achievements[27]["finished"] == false) {
//     if (!message.content.toLowerCase().startsWith(serverS.settings[3]["prefix"])) {
//       userS.profile.set(0, { commandsused: userS.profile[0]["commandsused"], messagessent: userS.profile[0]["messagessent"] + 1, afk: userS.profile[0]["afk"] });
//       userS.save().catch((err) => client.outputsend("Error", err))

//       if (userS.profile[0]["messagessent"] + 1 == 100) {
//         if (userS.achievements[3]["finished"] == false) {
//           if (userS.settings[0]["notifications"] == true) {
//             if (userS.settings[0]["lang"] == "english") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Newbie :3**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//               });
//             } else if (userS.settings[0]["lang"] == "polish") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Noob :3**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievements claim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//               });
//             }
//           }
//           userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//           userS.achievements.set(3, { claimed: false, finished: true, name: userS.achievements[3]["name"], reward: userS.achievements[3]["reward"], difficulty: userS.achievements[3]["difficulty"] });
//           userS.save().catch((err) => client.outputsend("Error", err))
//         }
//       } else if (userS.profile[0]["messagessent"] + 1 == 2000) {
//         if (userS.achievements[14]["finished"] == false) {
//           if (userS.settings[0]["notifications"] == true) {
//             if (userS.settings[0]["lang"] == "english") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Active**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//               });
//             } else if (userS.settings[0]["lang"] == "polish") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Aktywny**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//               });
//             }
//           }
//           userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//           userS.achievements.set(14, { claimed: false, finished: true, name: userS.achievements[14]["name"], reward: userS.achievements[14]["reward"], difficulty: userS.achievements[14]["difficulty"] });
//           userS.save().catch((err) => client.outputsend("Error", err))
//         }
//       } else if (userS.profile[0]["messagessent"] + 1 == 10000) {
//         if (userS.achievements[20]["finished"] == false) {
//           if (userS.settings[0]["notifications"] === true) {
//             if (userS.settings[0]["lang"] === "english") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Trustful**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//               });
//             } else if (userS.settings[0]["lang"] === "polish") {
//               message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Ufny**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//               });
//             }
//           }
//           userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"] + 1, finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//           userS.achievements.set(20, { claimed: false, finished: true, name: userS.achievements[20]["name"], reward: userS.achievements[20]["reward"], difficulty: userS.achievements[20]["difficulty"] });
//           userS.save().catch((err) => client.outputsend("Error", err))
//         }
//       }
//     }
//   }
//   if (userS.inventory[0]["currency"] >= 1000000) {
//     if (userS.achievements[18]["finished"] == false) {
//       if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Millionaire**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] == "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Milioner**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"] + 1, finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//       userS.achievements.set(18, { claimed: false, finished: true, name: userS.achievements[18]["name"], reward: userS.achievements[18]["reward"], difficulty: userS.achievements[18]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//   }
//   if (userS.inventory[0]["currency"] >= 1000000000) {
//     if (userS.achievements[26]["finished"] == false) {
//       if (userS.settings[0]["notifications"] === true) {
//         if (userS.settings[0]["lang"] === "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Billionaire**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] === "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Miliarder**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] + 1 })
//       userS.achievements.set(26, { claimed: false, finished: true, name: userS.achievements[26]["name"], reward: userS.achievements[26]["reward"], difficulty: userS.achievements[26]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//   }
//   const addedupachievements = userS.achievements[0]["finishedonestar"] + userS.achievements[0]["finishedtwostar"] + userS.achievements[0]["finishedthreestar"] + userS.achievements[0]["finishedfourstar"] + userS.achievements[0]["finishedfivestar"] > 30 || userS.achievements[0]["finishedonestar"] + userS.achievements[0]["finishedtwostar"] + userS.achievements[0]["finishedthreestar"] + userS.achievements[0]["finishedfourstar"] + userS.achievements[0]["finishedfivestar"]
//   if (addedupachievements >= 5) {
//     if (userS.achievements[11]["finished"] == false) {
//       if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Adventurer**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] == "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Poszukiwacz przygód**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//       userS.achievements.set(11, { claimed: false, finished: true, name: userS.achievements[11]["name"], reward: userS.achievements[11]["reward"], difficulty: userS.achievements[11]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//   }
//   if (addedupachievements >= 10) {
//     if (userS.achievements[21]["finished"] == false) {
//       if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Adventurer**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] == "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Tropikalny poszukiwacz**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//       userS.achievements.set(21, { claimed: false, finished: true, name: userS.achievements[21]["name"], reward: userS.achievements[21]["reward"], difficulty: userS.achievements[21]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//   }
//   if (addedupachievements >= 30) {
//     if (userS.achievements[30]["finished"] == false) {
//       if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Master Achiever**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] == "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Mistrz Osiągnięć**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] + 1 })
//       userS.achievements.set(30, { claimed: false, finished: true, name: userS.achievements[30]["name"], reward: userS.achievements[30]["reward"], difficulty: userS.achievements[30]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//   }

// achievements fopr commands here id:1

// if (userS.achievements[2]["finished"] == false || userS.achievements[15]["finished"] == false || userS.achievements[27]["finished"] == false) {
//     userS.profile.set(0, { commandsused: userS.profile[0]["commandsused"] + 1, messagessent: userS.profile[0]["messagessent"], afk: userS.profile[0]["afk"] });
//     userS.save().catch((err) => client.outputsend("Error", err))

//     if (userS.achievements[2]["finished"] == false) {
//       if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Beginner**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//           });
//         } else if (userS.settings[0]["lang"] == "polish") {
//           message.channel.send({
//             embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Początkujący**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby otrzymać wszystkie osiągnięcia`, color: 0x3498DB }]
//           });
//         }
//       }
//       userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//       userS.achievements.set(2, { claimed: false, finished: true, name: userS.achievements[2]["name"], reward: userS.achievements[2]["reward"], difficulty: userS.achievements[2]["difficulty"] });
//       userS.save().catch((err) => client.outputsend("Error", err))
//     }
//     if (userS.profile[0]["commandsused"] + 1 == 100) {
//       if (userS.achievements[15]["finished"] == false) {
//         if (userS.settings[0]["notifications"] == true) {
//           if (userS.settings[0]["lang"] == "english") {
//             message.channel.send({
//               embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Crazy**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//           } else if (userS.settings[0]["lang"] == "polish") {
//             message.channel.send({
//               embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Zwariowany**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby otrzymać wszystkie osiągnięcia`, color: 0x3498DB }]
//             });
//           }
//         }
//         userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//         userS.achievements.set(15, { claimed: false, finished: true, name: userS.achievements[15]["name"], reward: userS.achievements[15]["reward"], difficulty: userS.achievements[15]["difficulty"] });
//         userS.save().catch((err) => client.outputsend("Error", err))
//       }
//     } else if (userS.profile[0]["commandsused"] + 1 == 1000) {
//       if (userS.achievements[27]["finished"] == false) {
//         if (userS.settings[0]["notifications"] == true) {
//           if (userS.settings[0]["lang"] == "english") {
//             message.channel.send({
//               embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Tryhard**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//           } else if (userS.settings[0]["lang"] == "polish") {
//             message.channel.send({
//               embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Tryhard**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby otrzymać wszystkie osiągnięcia`, color: 0x3498DB }]
//             });
//           }
//         }
//         userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] + 1 })
//         userS.achievements.set(27, { claimed: false, finished: true, name: userS.achievements[27]["name"], reward: userS.achievements[27]["reward"], difficulty: userS.achievements[27]["difficulty"] });
//         userS.save().catch((err) => client.outputsend("Error", err))
//       }
//     }
//   }


//buy command id:2

// if (userS.achievements[4]["finished"] == false) {
//     if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Shopper**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//         } else if (userS.settings[0]["lang"] == "polish") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Klient**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//             });
//         }
//     }
//     userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//     userS.achievements.set(4, { claimed: false, finished: true, name: userS.achievements[4]["name"], reward: userS.achievements[4]["reward"], difficulty: userS.achievements[4]["difficulty"] });
//     userS.save().catch((err) => client.outputsend("Error", err))
// }

//job command id:3

// if (userS.achievements[8]["finished"] == false) {
//     if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Worker**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//         } else if (userS.settings[0]["lang"] == "polish") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Pracownik**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//             });
//         }
//     }
//     userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//     userS.achievements.set(8, { claimed: false, finished: true, name: userS.achievements[8]["name"], reward: userS.achievements[8]["reward"], difficulty: userS.achievements[8]["difficulty"] });
//     userS.save().catch((err) => client.outputsend("Error", err))
// }

//invite command id:4

// if (message.author.id == message.guild.ownerId) {
//     if (userS.achievements[9]["finished"] == false) {
//         if (userS.settings[0]["notifications"] == true) {
//             if (userS.settings[0]["lang"] == "english") {
//                 await message.channel.send({
//                     embeds: [{ title: `${message.author.username} - You have unlocked the achievement **Tropical Seeker**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//                 });
//             } else if (userS.settings[0]["lang"] == "polish") {
//                 await message.channel.send({
//                     embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **Niesamowite**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//                 });
//             }
//         }
//         userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"], finishedtwostar: userS.achievements[0]["finishedtwostar"] + 1, finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//         userS.achievements.set(9, { claimed: false, finished: true, name: userS.achievements[9]["name"], reward: userS.achievements[9]["reward"], difficulty: userS.achievements[9]["difficulty"] });
//         userS.save().catch((err) => client.outputsend("Error", err))
//     }
// }

//invite command id:5

// if (userS.achievements[18]["finished"] == false) {
//     if (userS.settings[0]["notifications"] == true) {
//         if (userS.settings[0]["lang"] == "english") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - You have unlocked the achievement **AFK**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//         } else if (userS.settings[0]["lang"] == "polish") {
//             await message.channel.send({
//                 embeds: [{ title: `${message.author.username} - Otrzymałeś osiągnięcie **AFK**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//             });
//         }
//     }
//     userS.achievements.set(0, { finishedonestar: userS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userS.achievements[0]["finishedtwostar"], finishedthreestar: userS.achievements[0]["finishedthreestar"], finishedfourstar: userS.achievements[0]["finishedfourstar"], finishedfivestar: userS.achievements[0]["finishedfivestar"] })
//     userS.achievements.set(18, { claimed: false, finished: true, name: userS.achievements[7]["name"], reward: userS.achievements[7]["reward"], difficulty: userS.achievements[7]["difficulty"] });
//     userS.save().catch((err) => client.outputsend("Error", err))
// }

//warn command id:6

// if (userSS.achievements[5]["finished"] == false) {
//     if (userSS.settings[0]["notifications"] == true) {
//         if (userSS.settings[0]["lang"] == "english") {
//             message.channel.send({
//                 embeds: [{ title: `${warningUserFind.user.username} - You have unlocked the achievement **Disappointed**!\n\n\`Use "${serverS.settings[3]["prefix"]}user notifications off" to not see this notification again!\``, footer: `Type "${serverS.settings[3]["prefix"]} achievements claim all" to claim all your unlocked achievements `, color: 0x3498DB }]
//             });
//         } else if (userSS.settings[0]["lang"] == "polish") {
//             message.channel.send({
//                 embeds: [{ title: `${warningUserFind.user.username} - Otrzymałeś osiągnięcie **Zawiedziony**!\n\n\`Uzyj komendy "${serverS.settings[3]["prefix"]}user notifications off" aby nie wyświetlać tego powiadomienia ponownie!\``, footer: `Wpisz "${serverS.settings[3]["prefix"]} achievementsclaim all" aby zebrać wszystkie otrzymane osiągnięcia`, color: 0x3498DB }]
//             });
//         }
//     }
//     userSS.achievements.set(0, { finishedonestar: userSS.achievements[0]["finishedonestar"] + 1, finishedtwostar: userSS.achievements[0]["finishedtwostar"], finishedthreestar: userSS.achievements[0]["finishedthreestar"], finishedfourstar: userSS.achievements[0]["finishedfourstar"], finishedfivestar: userSS.achievements[0]["finishedfivestar"] })
//     userSS.achievements.set(5, { claimed: false, finished: true, name: userSS.achievements[5]["name"], reward: userSS.achievements[5]["reward"], difficulty: userSS.achievements[5]["difficulty"] });
//     userSS.save().catch((err) => client.outputsend("Error", err))
// }