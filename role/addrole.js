module.exports = execute;
const utils = require('../command.js');
const roleUtils = require('./role.js');

/**TODO : check that the role doesn't exist yet
 * 
 * 
 **/
async function execute(message) {
    if(message.member.hasPermission("ADMINISTRATOR") != true){
        message.channel.send("Vous devez être administrateur sur ce serveur pour utiliser cette commande");
        return;
    }

    var args = utils.getArgs(message, ";");

    if(args[0] == "" || args[0] == undefined){
        message.channel.send("Veuillez au moins indiquer le nom du channel que vous souhaitez ajouter");
        return;
    }

    var roleExists = message.guild.roles.cache.find(role => role.name == args[0]);

    if(roleExists != undefined){
        message.channel.send("Veuillez choisir un nom de role qui n'existe pas encore");
        return;
    }


    var newRole = {
        data: {
            name: args[0],
        }
    };
    if (args[1] != "") {
        newRole.reason = args[1];
    }
    if (args[2] != "") {
        newRole.data.color = args[2];
    }

    await message.guild.roles.create(newRole).then(function () {
        message.channel.send("le rôle **" + args[0] + "** a bien été créé");
    });


}