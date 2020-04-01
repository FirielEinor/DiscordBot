module.exports = execute;

const responses = [
    "Pas régulièrement.",
    "Dans cette économie actuelle ?!",
    "On s'en fout, non ?",
    "C'est pas faux.",
    "Il dit qu'il voit pas le rapport.",
    "J'ai pas regardé dans le tiroir ...",
    "M'enfin ?!",
    "Est ce bien nécessaire ?",
    "Ce serait affligeant.",
    "Je ne crois pas non.",
    "Qu'est ce que t'insinues ?",
    "Je demanderais à ma maman.",
    "Elle a dit non !",
    "Dans une certaine mesure.",
    "Avec l'accord du pédiatre !",
    "Seulement si tu te laves les mains.",
    "Vous pouvez répéter la question ?",
    "Bon sang, mais c'est bien sûr !",
    "Mais vous êtes fous !",
    "Mais evidemment !",
    "Bizarrement, oui.",
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
