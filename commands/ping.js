const Discord = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Check if bot is alive and get the latency.',
  execute(message, args) {
    const pingingEmbed = new Discord.MessageEmbed()
      .setColor('#0a7400')
      .setTitle('Pinging...');

    message.channel.send(pingingEmbed).then((msg) => {
      const latency = Math.floor(msg.createdAt - message.createdAt);

      msg.edit(new Discord.MessageEmbed()
        .setColor('#0a7400')
        .setTitle('Pong!')
        .addFields({
          name: 'Latency:',
          value: latency,
        }));
    });
  },
};