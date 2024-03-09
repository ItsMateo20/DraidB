

module.exports = {
  name: 'coinflip',
  alilses: ['or', 'cf'],
  cooldown: 4,
  votedcooldown: 1,
  botpermission: ['SendMessages', 'EmbedLinks'],

  helpDescription: 'Flip a coin',
  helpUsage: '**coinflip**',
  helpGroup: 'Games',
  async execute(client, fs, draidS, userS, serverS, serveruserS, user, server, serveruser, message, args, Discord, target, targett) {

    if (userS.settings[0]["lang"] == 'polish') {

      function doRandHT() {
        var rand = ['ORZEŁ!', 'RESZKA!'];

        return rand[Math.floor(Math.random() * rand.length)];
      }

      const newEmbed = new Discord.EmbedBuilder()
        .setColor(0x3498DB)
        .setTitle(doRandHT())
        .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
      message.channel.send({ embeds: [newEmbed] });

    } else if (userS.settings[0]["lang"] == 'english') {
      function doRandHT() {
        var rand = ['HEADS!', 'TAILS!'];

        return rand[Math.floor(Math.random() * rand.length)];
      }

      const newEmbed = new Discord.EmbedBuilder()
        .setColor(0x3498DB)
        .setTitle(doRandHT())
        .setFooter({ text: `https://draid.vercel.app`, iconURL: `${message.author.avatarURL({ dynamic: true })}` })
      message.channel.send({ embeds: [newEmbed] });
    }

  }
};