const ping = require('./ping').default;
const eight_balls = require('./eight_balls');
const sondage = require('./sondage');
const random = require('./random.js');
const role = require('./role.js');
const roll = require('./roll');
module.exports = execute;

const commands = {
    'ping' : ping,
    '8ball' : eight_balls,
    'sondage' : sondage,
    'randomducul' : random,
    'role' : role,
    'roll' : roll
  };

  const prefix= '!'

function execute(message) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ', 1);
    const command = args.shift().toLowerCase();

    if (Object.keys(commands).includes(command)) {
        commands[command](message);
    }// TODO : add "I don't know that command" on a specific commit
}