module.exports = execute;
const prefix = '!';
const utils = require('../command.js');

String.prototype.cleanup = function () {
    return this.replace(/[^a-zA-Z0-9 +]+/g, "").trim();
}

function execute(message) {
    var serverRoles = message.guild.roles.cache;
    var reply = "";
    //const args = message.content.slice(prefix.length).split(' ', 1);
    //const command = args.shift().toLowerCase();
    const command = utils.getCommand(message);
    var roleAsked = utils.getArgs(message);

    if (roleAsked == "") {
        message.channel.send("Veuillez indiquer au moins un role pour en afficher la liste de membres");
        return;
    }

    tempRole = serverRoles.find(role => role.name.cleanup() == roleAsked);

    if (tempRole == null) {
        message.channel.send("Le rôle **" + roleAsked + "** n'existe pas sur ce serveur\nPour afficher les roles, utilisez la commande **!listrole**");
        return;
    }

    reply += "Voici la liste des membres du rôle **" + tempRole.name + "**\n";

    tempRole.members.forEach(function (item, key) {

        if (item.nickname == null) {
            reply += item.user.username + "  -  ";
        } else {
            reply += item.nickname + "  -  ";
        }
    });

    message.channel.send(reply);
    return;

}