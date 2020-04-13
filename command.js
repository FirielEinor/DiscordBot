exports.getArgs = getArgs;
exports.getCommand = getCommand;

const prefix = '!';

function getArgs(message, separator = null) {
    var command = getCommand(message);
    var text = message.content.substr(command.length + 2);
    var args = [];
    if (separator != null) {
        args = text.split(separator);
        args.forEach(function(item, key) {
            args[key] = item.trim();
        });
        return args;
    }
    args.push(text.trim());
    return args;
}

function getCommand(message) {
    // .substr(0, message.content.indexOf(' ')).toLowerCase()
    command = message.content.slice(prefix.length).split(' ', 1);
    return command[0];
}