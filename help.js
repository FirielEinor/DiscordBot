module.exports = execute;
const operator = "!roll ";
const fs = require('fs');

function execute(message){
    if (fs.existsSync('./help.json')){
        var jsonString = fs.readFileSync('./help.json');
        var manual = JSON.parse(jsonString);
    }else{
        console.log("Error : Help command required when no help.json is accessible.")
        return;
    }

    command = message.content.slice(operator.length,message.content.length);
    args = command.split(" "); // array made of the options and the arguments of the command

    if (manual[args] == undefined || args[0] == ''){
        message.channel.send(manual['default'].text);
        return;
    }

    message.channel.send(manual[args[0]].text);
    return;

}