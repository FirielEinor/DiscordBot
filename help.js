module.exports = execute;
const fs = require('fs');
const utils = require('./command.js');

function execute(message){
    if (fs.existsSync('./help.json')){
        var jsonString = fs.readFileSync('./help.json');
        var manual = JSON.parse(jsonString);
    }else{
        console.log("Error : Help command required when no help.json is accessible.");
        return;
    }

    args = utils.getArgs(message); // array made of the options and the arguments of the command

    if (manual[args] == undefined || args[0] == ''){
        message.channel.send(manual['default'].text);
        return;
    }

    message.channel.send(manual[args[0]].text);
    return;

}