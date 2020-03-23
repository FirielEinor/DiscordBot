//module.exports = getRoles;

exports.getRoles = getRoles;

const prefix = '!';


function getRoles(message) {

    const args = message.content.slice(prefix.length).split(' ', 1);
    const command = args.shift().toLowerCase();
    var tableRoles = message.content.substr(message.content.indexOf(' ') + 1).split(","); // we separate all the arguments in a table
    tableRoles.forEach(function (item, key) { // we trim all role asked by the user
        item = item.trim();
        tableRoles[key] = item;
    });
    let roles = []; // empty array to contain the roles to add or delete on the user

    if (tableRoles[0].toLowerCase() == "!" + command) {
        message.channel.send("Veuillez indiquer au moins un rôle à modifier"); 
        return roles;
    }

    var tempRole = null; // to contain the potential roles on the server
    var errorRole = 0;
    var reply = "";

    tableRoles.forEach(function (item, key) {
        tempRole = message.guild.roles.cache.find(role => role.name == item);
        if (tempRole == null) { // first we check the role exists on the server
            reply += "Le rôle **" + item + "** n'existe pas sur ce serveur, faites une demande aux admins !\n";
            errorRole ++;
        } else {
            roles.push(tempRole); //we add the temporary role in the role list
        }
    });

    if(errorRole){
        message.channel.send(reply);
    }

    return roles;

}