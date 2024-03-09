module.exports = {
    name: `place`,
    aliases: ['r/place', 'rplace'],
    cooldown: 300000,
    votedcooldown: 120000,
    botpermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    dev: true,

    helpDescription: 'Place a new color on a block every 5 minutes, just like in r/place.',
    helpUsage: '**place**',
    helpGroup: 'Fun',
    helpSubcommands: ['set {cords} {color (RED, ORANGE, GREEN, BLUE, YELLOW, MAGENTA)}'],
    async execute(ERRORCATCHER, fs, userS, serverS, serveruserS, user, server, serveruser, message, client, args, Discord, target, targett) {
        const Draid = require('../../../models/draid.js');
        const DraidS = await Draid.findOne({ userID: "831829384884518923" });
        const availableColors = ["RED", "ORANGE", "GREEN", "BLUE", "YELLOW", "MAGENTA"];

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Place - LastUpdate: ${DraidS.place[0]["lastUpdate"]}`)
                .setDescription(`${DraidS.place[1]["color"]}  ${DraidS.place[2]["color"]}  ${DraidS.place[3]["color"]}  ${DraidS.place[4]["color"]}  ${DraidS.place[5]["color"]} ${DraidS.place[6]["color"]}  ${DraidS.place[7]["color"]}  ${DraidS.place[8]["color"]}  ${DraidS.place[9]["color"]}  ${DraidS.place[10]["color"]}  ${DraidS.place[11]["color"]}  ${DraidS.place[12]["color"]}  ${DraidS.place[13]["color"]}  ${DraidS.place[14]["color"]}  ${DraidS.place[15]["color"]} ${DraidS.place[16]["color"]}  ${DraidS.place[17]["color"]}  ${DraidS.place[18]["color"]}  ${DraidS.place[19]["color"]}  ${DraidS.place[20]["color"]}  ${DraidS.place[21]["color"]}  ${DraidS.place[22]["color"]}  ${DraidS.place[23]["color"]}  ${DraidS.place[24]["color"]}  ${DraidS.place[25]["color"]}\n` +
                    `${DraidS.place[26]["color"]}  ${DraidS.place[27]["color"]}  ${DraidS.place[28]["color"]}  ${DraidS.place[29]["color"]}  ${DraidS.place[30]["color"]}  ${DraidS.place[31]["color"]}  ${DraidS.place[32]["color"]}  ${DraidS.place[33]["color"]}  ${DraidS.place[34]["color"]}  ${DraidS.place[35]["color"]} ${DraidS.place[36]["color"]}  ${DraidS.place[37]["color"]}  ${DraidS.place[38]["color"]}  ${DraidS.place[39]["color"]}  ${DraidS.place[40]["color"]}  ${DraidS.place[41]["color"]}  ${DraidS.place[42]["color"]}  ${DraidS.place[43]["color"]}  ${DraidS.place[44]["color"]}  ${DraidS.place[45]["color"]}  ${DraidS.place[46]["color"]}  ${DraidS.place[47]["color"]}  ${DraidS.place[48]["color"]}  ${DraidS.place[49]["color"]}  ${DraidS.place[50]["color"]}\n` +
                    `${DraidS.place[51]["color"]}  ${DraidS.place[52]["color"]}  ${DraidS.place[53]["color"]}  ${DraidS.place[54]["color"]}  ${DraidS.place[55]["color"]}  ${DraidS.place[56]["color"]}  ${DraidS.place[57]["color"]}  ${DraidS.place[58]["color"]}  ${DraidS.place[59]["color"]}  ${DraidS.place[60]["color"]}  ${DraidS.place[61]["color"]}  ${DraidS.place[62]["color"]}  ${DraidS.place[63]["color"]}  ${DraidS.place[64]["color"]}  ${DraidS.place[65]["color"]}  ${DraidS.place[66]["color"]}  ${DraidS.place[67]["color"]}  ${DraidS.place[68]["color"]}  ${DraidS.place[69]["color"]}  ${DraidS.place[70]["color"]}  ${DraidS.place[71]["color"]}  ${DraidS.place[72]["color"]}  ${DraidS.place[73]["color"]}  ${DraidS.place[74]["color"]}  ${DraidS.place[75]["color"]}\n` +
                    `${DraidS.place[76]["color"]}  ${DraidS.place[77]["color"]}  ${DraidS.place[78]["color"]}  ${DraidS.place[79]["color"]}  ${DraidS.place[80]["color"]}  ${DraidS.place[81]["color"]}  ${DraidS.place[82]["color"]}  ${DraidS.place[83]["color"]}  ${DraidS.place[84]["color"]}  ${DraidS.place[85]["color"]}  ${DraidS.place[86]["color"]}  ${DraidS.place[87]["color"]}  ${DraidS.place[88]["color"]}  ${DraidS.place[89]["color"]}  ${DraidS.place[90]["color"]}  ${DraidS.place[91]["color"]}  ${DraidS.place[92]["color"]}  ${DraidS.place[93]["color"]}  ${DraidS.place[94]["color"]}  ${DraidS.place[95]["color"]}  ${DraidS.place[96]["color"]}  ${DraidS.place[97]["color"]}  ${DraidS.place[98]["color"]}  ${DraidS.place[99]["color"]}  ${DraidS.place[100]["color"]}\n` +
                    `${DraidS.place[101]["color"]}  ${DraidS.place[102]["color"]}  ${DraidS.place[103]["color"]}  ${DraidS.place[104]["color"]}  ${DraidS.place[105]["color"]}  ${DraidS.place[106]["color"]}  ${DraidS.place[107]["color"]}  ${DraidS.place[108]["color"]}  ${DraidS.place[109]["color"]}  ${DraidS.place[110]["color"]}  ${DraidS.place[111]["color"]}  ${DraidS.place[112]["color"]}  ${DraidS.place[113]["color"]}  ${DraidS.place[114]["color"]}  ${DraidS.place[115]["color"]}  ${DraidS.place[116]["color"]}  ${DraidS.place[117]["color"]}  ${DraidS.place[118]["color"]}  ${DraidS.place[119]["color"]}  ${DraidS.place[120]["color"]}  ${DraidS.place[121]["color"]}  ${DraidS.place[122]["color"]}  ${DraidS.place[123]["color"]}  ${DraidS.place[124]["color"]}  ${DraidS.place[125]["color"]}\n` +
                    `${DraidS.place[126]["color"]}  ${DraidS.place[127]["color"]}  ${DraidS.place[128]["color"]}  ${DraidS.place[129]["color"]}  ${DraidS.place[130]["color"]}  ${DraidS.place[131]["color"]}  ${DraidS.place[132]["color"]}  ${DraidS.place[133]["color"]}  ${DraidS.place[134]["color"]}  ${DraidS.place[135]["color"]}  ${DraidS.place[136]["color"]}  ${DraidS.place[137]["color"]}  ${DraidS.place[138]["color"]}  ${DraidS.place[139]["color"]}  ${DraidS.place[140]["color"]}  ${DraidS.place[141]["color"]}  ${DraidS.place[142]["color"]}  ${DraidS.place[143]["color"]}  ${DraidS.place[144]["color"]}  ${DraidS.place[145]["color"]}  ${DraidS.place[146]["color"]}  ${DraidS.place[147]["color"]}  ${DraidS.place[148]["color"]}  ${DraidS.place[149]["color"]}  ${DraidS.place[150]["color"]}\n` +
                    `${DraidS.place[151]["color"]}  ${DraidS.place[152]["color"]}  ${DraidS.place[153]["color"]}  ${DraidS.place[154]["color"]}  ${DraidS.place[155]["color"]}  ${DraidS.place[156]["color"]}  ${DraidS.place[157]["color"]}  ${DraidS.place[158]["color"]}  ${DraidS.place[159]["color"]}  ${DraidS.place[160]["color"]}  ${DraidS.place[161]["color"]}  ${DraidS.place[162]["color"]}  ${DraidS.place[163]["color"]}  ${DraidS.place[164]["color"]}  ${DraidS.place[165]["color"]}  ${DraidS.place[166]["color"]}  ${DraidS.place[167]["color"]}  ${DraidS.place[168]["color"]}  ${DraidS.place[169]["color"]}  ${DraidS.place[170]["color"]}  ${DraidS.place[171]["color"]}  ${DraidS.place[172]["color"]}  ${DraidS.place[173]["color"]}  ${DraidS.place[174]["color"]}  ${DraidS.place[175]["color"]}\n` +
                    `${DraidS.place[176]["color"]}  ${DraidS.place[177]["color"]}  ${DraidS.place[178]["color"]}  ${DraidS.place[179]["color"]}  ${DraidS.place[180]["color"]}  ${DraidS.place[181]["color"]}  ${DraidS.place[182]["color"]}  ${DraidS.place[183]["color"]}  ${DraidS.place[184]["color"]}  ${DraidS.place[185]["color"]}  ${DraidS.place[186]["color"]}  ${DraidS.place[187]["color"]}  ${DraidS.place[188]["color"]}  ${DraidS.place[189]["color"]}  ${DraidS.place[190]["color"]}  ${DraidS.place[191]["color"]}  ${DraidS.place[192]["color"]}  ${DraidS.place[193]["color"]}  ${DraidS.place[194]["color"]}  ${DraidS.place[195]["color"]}  ${DraidS.place[196]["color"]}  ${DraidS.place[197]["color"]}  ${DraidS.place[198]["color"]}  ${DraidS.place[199]["color"]}  ${DraidS.place[200]["color"]}\n` +
                    `testing uwu`)

            message.channel.send({ embeds: [embed] });
        }
    }
};

