exports.getArgs = getArgs;
exports.getCommand = getCommand;

const prefix = '!';

function getArgs(message, separator = null) {
    var command = getCommand(message);
    var args = message.content.substr(command.length + 2);
    if (separator != null) {
        args = args.split(separator);
    }
    return args;
}

function getCommand(message) {
    // .substr(0, message.content.indexOf(' ')).toLowerCase()
    command = message.content.slice(prefix.length).split(' ', 1);
    return command[0];
}