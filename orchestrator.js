const ping = require('./ping');
const eight_balls = require('./eight_balls');
const sondage = require('./sondage');
const dire = require('./say.js');
const random = require('./random.js');
const addrole = require('./role/addrole.js');
const delrole = require('./role/delrole.js');
const setrole = require('./role/setrole.js');
const unsetrole = require('./role/unsetrole.js');
const listrole = require('./role/listrole.js');
const listmembers = require('./role/listmembers.js');
const roll = require('./roll.js');
const help = require('./help.js');
const wordwar = require('./wordwar.js');
const music = require('./music.js');
const utils = require('./command.js');
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
    'listrole' : listrole,
    'roll' : roll,
    'help' : help,
    'listmembers' : listmembers,
    'dire' : dire,
    'wordwar' : wordwar,
    'music' : music
  };

  const prefix= '!'

function execute(message, client) {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    message.content = message.content.replace(/ +/g, ' ');

    const command = utils.getCommand(message);

    if (Object.keys(commands).includes(command)) {
        commands[command](message, client);
    }// TODO : add "I don't know that command" on a specific commit
}
