module.exports = execute;

const responses = [
    "Essaye plus tard",
    "Essaye encore",
    "Une chance sur deux",
    "Pas d'avis",
    "Repose ta question",
    "D'après moi oui ",
    "C'est certain",
    "Très probable",
    "Sans aucun doute",
    "Tu peux compter dessus",
    "C'est non",
    "Peu probable",
    "Faut pas rêver",
    "N'y compte pas",
    "Impossible",
]

function execute(message) {
    const i = Math.floor(Math.random() * responses.length);
    const reply = responses[i];
    message.channel.send(reply);
}