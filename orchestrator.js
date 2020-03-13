const ping = require('./ping');
const eight_balls = require('./eight_balls');
module.exports = execute;

const commands = {
    ping,
    '8ball' : eight_balls
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