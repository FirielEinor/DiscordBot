'use strict';
module.exports = execute;
const operator = "!role ";
const fs = require('fs');

function execute(message) {
    var command = message.content.slice(operator.length,message.content.length);
    var option = command.substr(0,command.indexOf(' '));// we put the option of the command in a variable
    var table = command.substr(command.indexOf(' ')+1);// we get the arguments of the command in a variable
    var table = table.split(","); // we separate all the arguments in a table
    var tableRoles = [];
    table.forEach(function(item, key){ // we trim all role asked by the user
        item = item.trim();
        tableRoles.push(item);
    });
    var reply = "";
    var user = message.member;
    var errorList = ""; // This is the list of the roles that return an error
    if (option != "ajouter" && option != "supprimer"){
        message.channel.send("veuillez choisir l'option \"ajouter\" ou \"supprimer\" puis la liste des rôles à modifier");return;
    }

    if(tableRoles.length <= 0){
        message.channel.send("Veuillez indiquer au moins un rôle à modifier"); return;
    }


    
    // let's start by checking the arguments are correct (roles exist)
    let manageRoles = []; // empty array ton contain the roles to add or delete on the user
    var roleErrors = 0;
    var tempRole = null;
    tableRoles.forEach(function(item, key){
        tempRole = message.guild.roles.cache.find(role => role.name == item);
        if(tempRole == null){ // first we check the role exists on the server
                message.channel.send("Le rôle **" + item + "** n'existe pas sur ce serveur, faites une demande aux admins !\n");
                roleErrors ++;
        }else{
            manageRoles.push(tempRole); //we add the temporary role in the role list
        }
    });



    // TODO : change this in different functions ?
	switch (option) {
		case 'ajouter' :
            manageRoles.forEach(function (item, key){
                var member = item.members.find(guildMember => guildMember.id == user.id);
                // member is undefined when the user doesn't have the role 

                if ( member != undefined){ 
                    errorList += item.name + " " ;
                }else{
                    var permissionError = false;
                    message.member.roles.add(item) //we add the user to the role members
                    .then((value) => {
                        setTimeout(function(){
                            message.channel.send("Vous avez été ajouté.e au rôle **" + item.name + "** !\n");
                            return;
                        }, 50);
                    })
                    .catch((error) => { // this is in case the bot doesn't have permission to add the role
                        setTimeout(function(){
                            message.channel.send("Impossible de vous ajouter au role **" + item.name + "**\n");
                            console.error(error);
                            console.error(user.user.username + " tried to add role " + item.name);
                        }, 50);
                    });
                }
            });
            if (errorList != ""){
                reply += "Les rôles suivants vous sont déjà attribués : **" + errorList + "**\n";
                message.channel.send(reply);
            }
            break;
            


		case 'supprimer' :
            manageRoles.forEach(function (item, key){
                var member = item.members.find(guildMember => guildMember.id == user.id);
                // member is undefined when the user doesn't have the role 

                // we check that the user doesn't have yet the role
                if ( member == undefined){ 
                    errorList += item.name + " " ;
                }else{
                    message.member.roles.remove(item) //we add the user to the role members
                    .then(() => {
                        setTimeout(function(){
                            message.channel.send("Vous avez été supprimé.e du rôle **" + item.name + "**\n");
                        }, 50);
                    })
                    .catch(() => { // this is in case the bot doesn't have permission to add the role
                        setTimeout(function(){
                            message.channel.send("Impossible de vous enlever le role **" + item.name + "**\n");
                            console.error(error);
                            console.error(user.user.username + " tried to delete role " + item.name);
                        }, 50);
                    });
                }
            });
            if (errorList != ""){
                reply += "Les rôles suivants ne vous sont pas attribués : **" + errorList + "**\n";
                message.channel.send(reply);
            }
			break;
		default :
    }
}