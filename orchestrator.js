const ping = require('./ping');
const eight_balls = require('./eight_balls');
const music = require("./music");
module.exports = execute;

const commands = {
    ping,
    '8ball' : eight_balls,
    'music' : music
  };

  const prefix= '!'

function execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    console.log(command);
    if (Object.keys(commands).includes(command)) {
        commands[command](message, args);
    }
}