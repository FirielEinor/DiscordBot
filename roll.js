module.exports = execute;
const utils = require('./command.js');

function execute(message) {
    args = utils.getArgs(message, ' '); 
    dice = args[0].trim(); 

    if (args[1] != undefined) {
        var number = args[1].trim();
    } else {
        var number = args[1];
    }
    reply = "";
    let total = 0;

    if (dice < 1 || dice > 100 || !parseInt(dice, 10)) { // Si le nombre sur le dé n'a pas été choisi entre 1 et 100
        message.channel.send("veuillez choisir un nombre maximum sur le(s) dé(s) compris entre 1 et 100\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
    } else {
        if (typeof number !== 'undefined') { // if something more has been passed
            if (number > 15 || number < 1 || !parseInt(number, 15)) { // and this thing is not a number between 1 and 15
                message.channel.send("veuillez choisir un nombre de dés compris entre 1 et 15\n _!roll [ nombre max sur le dé ] [ nombre de dés ]_");
            } else { // we loop as many times as the number of dices
                let total = 0; // this is to make the total of the amounts on all dices
                for (let index = 0; index < number; index++) {
                    roll = 1 + Math.floor(Math.random() * (dice));
                    total += roll;
                    reply += " 🎲 **" + roll + "** ";
                }
                reply += "          *total de* **" + total + "**";
                message.channel.send(reply); // we return the dices and the total
            }
        } else {
            roll = 1 + Math.floor(Math.random() * (dice - 1 + 1));
            total += roll;
            reply += " 🎲 **" + roll + "** ";
            message.channel.send(reply); // we return the dice
        }
    }
}

