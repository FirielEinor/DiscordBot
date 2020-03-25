const roleUtils = require('./role.js');

module.exports = execute;

function execute(message, client) {
    var reply = "";
    var roles = roleUtils.getRoles(message, client);
    if (roles.length == 0) {
        return;
    }
    var errorList = "";
    roles.forEach(async function (item, key) {
        var member = item.members.find(guildMember => guildMember.id == message.member.id);
        // member is undefined when the user doesn't have the role 

        if (member != undefined) {
            errorList += item.name + " ";
        } else {
            await message.member.roles.add(item) //we add the user to the role members
                .then(() => {
                    message.channel.send("Vous avez été ajouté.e au rôle **" + item.name + "** \n");
                })
                .catch((error) => { // this is in case the bot doesn't have permission to add the role
                    message.channel.send("Erreur : Impossible de vous ajouter au role **" + item.name + "**\n");
                });
        }
    });
    if (errorList != "") {
        reply += "Les rôles suivants vous sont déjà attribués : **" + errorList + "**\n";
        message.channel.send(reply);
    }

}