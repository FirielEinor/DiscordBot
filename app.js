require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const prefix= '!'
const responses = [
    "Essaye plus tard",
    "Essaye encore",
    "Une chance sur deux",
    "Pas d'avis",
    "Repose ta question",
    "D'après moi oui ",
    "C'est certain",
    "Très probable",
    "Sans aucun doute",
    "Tu peux compter dessus",
    "C'est non",
    "Peu probable",
    "Faut pas rêver",
    "N'y compte pas",
    "Impossible",
]

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    console.log(command)
    if(command === 'ping'){
        message.channel.send('pong')
    }
    if(command === '8ball'){
        const i = Math.floor(Math.random() * responses.length);
        const reply = responses[i];
        message.channel.send(reply);
    }
})

console.log(process.env.BOT_TOKEN);

client.login(process.env.BOT_TOKEN);
