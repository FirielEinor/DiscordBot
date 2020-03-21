module.exports = execute;
const operator = "!roll ";

function execute(message) {
    command = message.content.slice(operator.length,message.content.length);
    args = command.split(" "); // array made of the options and the arguments of the command
    option = args[0]; // we get the option of the command in a variable
    number = args[1]; // number of time we run the command
    reply = " \"Le maître du jeu lance ses dés d'un geste solennel ...\"\n";

    if (number > 15 || number < 1 || !parseInt(number, 15)){
        message.channel.send("veuillez choisir un nombre de dés compris entre 1 et 15\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
    }else if(option < 1 || option >100 || !parseInt(option, 10)){
        message.channel.send("veuillez choisir un nombre maximum sur le(s) dé(s) compris entre 1 et 100\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
    }else{
        let total = 0;
        for (let index = 0; index < number; index++) {
            dice = 1 + Math.floor(Math.random() * (option-1 + 1));
            total += dice;
            reply += " 🎲 **" + dice + "** ";
        }
        reply += "          *total de* **" + total + "**";
        message.channel.send(reply);
    }
}