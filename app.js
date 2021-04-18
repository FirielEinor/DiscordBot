require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const orchestrator = require('./orchestrator');


client.once('ready', () => {
	console.log('Bonjour Nemo ! Je suis prêt !');
});

client.on('message', message => {
    orchestrator(message, client);
})

console.log(process.env.BOT_TOKEN);

client.login(process.env.BOT_TOKEN);
