module.exports = execute;
const operator = "!role ";

function execute(message) {
    command = message.content.slice(operator.length,message.content.length);
    var args = command.split(" "); // array made of the options and the arguments of the command
    var option = args[0]; // we get the option of the command in a variable
    var reply = "";
    var user = message.member;
    var errorList = ""; // This is the list of the roles that return an error

    if (option != "ajouter" && option != "supprimer"){
        message.channel.send("veuillez choisir l'option \"ajouter\" ou \"supprimer\" puis la liste des rôles à modifier");return;
    }
    args.shift(); // we delete the option of the array so the arguments only remain
    if(args.length <= 0){
        message.channel.send("Veuillez indiquer au moins un rôle à modifier"); return;
    }
    let roles = []; // empty array ton contain the roles to add or delete on the user
    
    // let's start by checking the arguments are correct (roles exist)
    var roleErrors = 0;
	args.forEach(function(item, key){
        tempRole = message.guild.roles.cache.find(role => role.name == item);
        if(tempRole == null){
            reply += "Le rôle **" + item + "** que vous avez choisi n'existe pas sur ce serveur";
            roleErrors ++;
        }else{
            roles.push(tempRole); // on ajoute le role temporaire dans la liste des rôles à traiter
        }
    });

    // TODO : change this in different functions ?
	switch (option) {
		case 'ajouter' :
            roles.forEach(function (item, key){
                member = item.members.find(guildMember => guildMember.id == user.id);
                // member is undefined when the user doesn't have the role yet

                // we check that the user doesn't have yet the role
                if ( member != undefined){ 
                    errorList += item.name + " " ;
                }else{
                    addRole = message.member.roles.add(item) //we add the user to the role members
                    .then(() => {
                        reply += "Vous avez été ajouté.e au rôle **" + item.name + "** !\n";
                    })
                    .catch(() => { // this is in case the bot doesn't have permission to add the role
                        //reply += "Impossible de vous ajouter au role **" + item.name + "**\n";
                        console.error(user.user.username + " tried to add role " + item.name);
                    });
                }
            });
            if (errorList != ""){
                reply += "Les rôles suivants vous ont déjà été attribués : **" + errorList + "**\n";
            }
            message.channel.send(reply);
			break;
		case 'supprimer' :

			break;
		default :

	}
}
