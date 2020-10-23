module.exports = execute;
const utils = require('./command.js');

function execute(message) {
    poll = utils.getArgs(message, ';'); // array made of the question and the answers to the poll
    label = poll.shift().trim(); // we get the introduction of the poll to display further
     // we delete the label of the array so the answers only remain
    poll.forEach(function (item, key) {
        if (item == "" || /^[ ]{1,}$/.test(item)) {
            delete poll[key]; return;
        }
        item = item.trim();
        poll[key] = item;
    })

    if (poll.length > 10) {
        message.channel.send("Les sondages n'acceptent pas plus de 10 réponses ... Merci de réessayer");
    } else {
        reply = "Un sondage a été initié par <@" + message.author.id + "> \n";
        reply = reply + label + "\n";

        // contains all unicode characters of keycap number emojis from 0 to 9
        var pollReact = ["\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3", "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3", "\u0030\u20E3"]

        poll.forEach(function (item, key) {
            // we create the reply with the aggregation of the emoji and the choices made by the user
            reply = reply + pollReact[key] + " " + item + "\n";
        });

        message.channel.send(reply) // we send the poll message ...
            .then(function (message) { // ... and we react with the appropriate emojis
                poll.forEach(function (item, key) {
                    message.react(pollReact[key]);
                });
            })
            .catch(console.error());
        message.delete();
    }
}
