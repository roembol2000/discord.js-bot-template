const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const config = require('./config.json');

client.once('ready', () => {
  console.log(`${config.botinfo.name} version ${config.botinfo.version} is ready with the prefix '${config.prefix}'`);
  console.log(config.botinfo.description);
});

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(' ');
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.channel.send('Oops! That command could not be ran due to an issue.');
  }
});

client.login(process.env.TOKEN);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}