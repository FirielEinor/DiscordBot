exports.getRoles = getRoles;
exports.listRoles = listRoles;

const prefix = '!';


function getRoles(message, client) {

    const args = message.content.slice(prefix.length).split(' ', 1);
    const command = args.shift().toLowerCase();
    var tableRoles = message.content.substr(message.content.indexOf(' ') + 1).split(","); // we separate all the arguments in a table
    tableRoles.forEach(function (item, key) { // we trim all role asked by the user
        item = item.trim();
        tableRoles[key] = item;
    });
    let roles = []; // empty array to contain the roles to add or delete on the user

    if (tableRoles[0].toLowerCase() == "!" + command) {
        //message.channel.send("Veuillez indiquer au moins un rôle à modifier");
        listRoles(message, client);
        return [] ;
    }

    var tempRole = null; // to contain the potential roles on the server
    var errorRole = 0;
    var reply = "";

    tableRoles.forEach(function (item, key) {
        if(item == ""){
            return;
        }
        tempRole = message.guild.roles.cache.find(role => role.name == item);
        if (tempRole == null) { // first we check the role exists on the server
            reply += "Le rôle **" + item + "** n'existe pas sur ce serveur, faites une demande aux admins !\n";
            errorRole++;
        } else {
            roles.push(tempRole); //we add the temporary role in the role list
        }
    });

    if (errorRole) {
        message.channel.send(reply);
    }

    return roles;

}

function listRoles(message, client) {
    var userID = client.user.id;
    var allRoles = message.guild.roles.cache;
    var botMaxPosition = 0;
    var listDisplayRoles = "";

    // We find the highest position of the bot in hierarchy
    allRoles.forEach((item, key)=> {
        if (item.members.find(member => member.id == userID) != null && item.rawPosition > botMaxPosition){
            botMaxPosition = item.rawPosition;
        }
        console.log(item.managed);
    });

    // We display all roles that are below the bot in hierarchy
    allRoles.forEach((item,key) => {
        if(item.managed == true){
            delete allRoles[key];
            return;
        }
        if(item.rawPosition < botMaxPosition && item.rawPosition != 0){
            listDisplayRoles += "\n    - **" + item.name + "**";
        }
    });

    var reply = "Voici la liste des rôles que vous pouvez vous attribuer / supprimer : " + listDisplayRoles;
    message.channel.send(reply);
}