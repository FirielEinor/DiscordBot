module.exports = execute;
const operator = "!roll ";

function execute(message) {
    command = message.content.slice(operator.length,message.content.length);
    args = command.split(" "); // array made of the options and the arguments of the command
    option = args[0]; // we get the option of the command in a variable
    number = args[1]; // number of time we run the command
    reply = " \"Le maître du jeu lance ses dés d'un geste solennel ...\"\n";

    if(option < 1 || option >100 || !parseInt(option, 10)){ // Si le nombre sur le dé n'a pas été choisi entre 1 et 100
            message.channel.send("veuillez choisir un nombre maximum sur le(s) dé(s) compris entre 1 et 100\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
    }else{
        if ( typeof number === !'undefined'){ // if something more has been passed
            if(number > 15 || number < 1 || !parseInt(number, 15)){ // and this thing is not a number between 1 and 15
                message.channel.send("veuillez choisir un nombre de dés compris entre 1 et 15\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
            }else{ // we loop as many times as the number of dices
                let total = 0; // this is to make the total of the amounts on all dices
                for (let index = 0; index < number; index++) {
                    dice = 1 + Math.floor(Math.random() * (option-1 + 1));
                    total += dice;
                    reply += " 🎲 **" + dice + "** ";
                }
                reply += "          *total de* **" + total + "**";
                message.channel.send(reply); // we return the dices and the total
            }
        }else{
            dice = 1 + Math.floor(Math.random() * (option-1 + 1));
            total += dice;
            reply += " 🎲 **" + dice + "** ";
            message.channel.send(reply); // we return the dice
        }  
    }
}