const roleUtils = require('./role.js');

module.exports = execute;

function execute(message) {
    var reply = "";
    var roles = roleUtils.getRoles(message);
    if (roles.length == 0) {
        return;
    }
    var errorList = "";
    roles.forEach(async function (item, key) {
        var member = item.members.find(guildMember => guildMember.id == message.member.id);
        // member is undefined when the user doesn't have the role 

        if (member == undefined) {
            errorList += item.name + " ";
        } else {
            await message.member.roles.remove(item) //we delete the user of the role members
                .then(() => {
                    message.channel.send("Vous avez été supprimé.e du rôle **" + item.name + "**\n");
                })
                .catch((error) => { // this is in case the bot doesn't have permission to add the role
                    message.channel.send("Erreur : Impossible de vous supprimer du rôle **" + item.name + "**\n");
                });
        }
    });
    if (errorList != "") {
        reply += "Les rôles suivants ne vous sont pas attribués : **" + errorList + "**\n";
        message.channel.send(reply);
    }

}