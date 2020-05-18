module.exports = execute;
const utils = require('./command.js');

function execute(message) {
	the_content = utils.getArgs(message);
	message.channel.send(the_content);
        message.delete();
}
