exports.getArgs = getArgs;
exports.getCommand = getCommand;

const prefix = '!';

function getArgs(message) {
    args = message.content.substr(message.content.indexOf(' ') + 1);
    return args;
}

function getCommand(message) {
    command = message.content.slice(prefix.length).substr(0, message.content.indexOf(' ')).toLowerCase();
    return command;
}