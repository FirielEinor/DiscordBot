module.exports = execute;
const operator = "!role ";

function execute(message) {
    command = message.content.slice(operator.length,message.content.length);
    args = command.split(" "); // array made of the options and the arguments of the command
    option = args[0]; // we get the option of the command in a variable
    reply = "";

    if (option != "ajouter" && option != "supprimer"){
        message.channel.send("veuillez choisir l'option \"ajouter\" ou \"supprimer\" puis la liste des rôles à modifier");return;
    }
    args.shift(); // we delete the option of the array so the arguments only remain
    if(args.length <= 0){
        message.channel.send("Veuillez indiquer au moins un rôle à modifier"); return;
    }
    let roles = []; // empty array ton contain the roles to add or delete on the user
    
    // let's start by checking the arguments are correct (roles exist)
    var errorMessage = "Les rôles que vous avez choisi n'existent pas sur ce serveur (";
    var roleErrors = 0;
	args.forEach(function(item, key){
        tempRole = message.guild.roles.cache.find(role => role.name == item);
        if(tempRole == null){
            errorMessage += " " + item + " ";
            roleErrors ++;
        }else{
            roles.push(tempRole);
        }
    });
    errorMessage += ")\n";
    user = message.member;
    errorList = ""; // This is the list of the role already attributed when you want to add or not included when you want to delete
	switch (option) {
		case 'ajouter' :
            roles.forEach(function (item, key){
                member = item.members.find(guildMember => guildMember.id == user.id);

                // we check that the user doesn't have yet the role or that the role is not empty
                if ( member != undefined || item.members.size != 0){ 
                   errorList += " " + item.name + " " ;
                }else{
                    message.member.roles.add(item);
                    reply += "Vous avez été ajouté.e au rôle " + item.name + " !\n";
                }
            });
            if (errorList != ""){
                errorMessage += "Le rôle " + errorList + " vous est déjà attribué.\n";
            }
            reply += errorMessage;
            message.channel.send(reply);
			break;
		case 'supprimer' :

			break;
		default :

	}
}
