module.exports = execute;
const utils = require('../command.js');
const roleUtils = require('./role.js');

async function execute(message) {
    args = utils.getArgs(message);
    var roleExists = message.guild.roles.cache.find(role => role.name == args[0]);
    if(roleExists == undefined){
        message.channel.send("Le rôle **" + args[0] + "** n'existe pas, il ne peut pas être supprimé");
        return;
    }

    roleExists.delete();
    message.channel.send("Le rôle **" + args[0] + "** a bien été supprimé");
    return;
}