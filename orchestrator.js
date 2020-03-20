const ping = require('./ping').default;
const eight_balls = require('./eight_balls');
const sondage = require('./sondage');
const random = require('./random.js');
module.exports = execute;

const commands = {
    ping,
    '8ball' : eight_balls,
    'sondage' : sondage
  };

  const prefix= '!'

function execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ', 1);
    const command = args.shift().toLowerCase();

    if (Object.keys(commands).includes(command)) {
        commands[command](message);
    }
}