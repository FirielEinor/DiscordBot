const ping = require('./ping').default;
const eight_balls = require('./eight_balls');
const sondage = require('./sondage');
const random = require('./random.js');
const addrole = require('./role/addrole.js');
const delrole = require('./role/delrole.js');
const setrole = require('./role/setrole.js');
const unsetrole = require('./role/unsetrole.js');
const roll = require('./roll');
module.exports = execute;

const commands = {
    'ping' : ping,
    '8ball' : eight_balls,
    'sondage' : sondage,
    'randomducul' : random,
    'addrole' : addrole,
    'delrole' : delrole,
    'setrole' : setrole,
    'unsetrole' : unsetrole,
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