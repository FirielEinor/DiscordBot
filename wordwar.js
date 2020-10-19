module.exports = execute;
const utils = require('./command.js');
var ongoingww = [];

/**
 * This function aims to do word wars inside a discord channel.
 * Someone launches a wordwar and other people can join in by clicking on the react icon.
 * First argument is the time of duration of the wordwar.
 * Second argument is the waiting time before the wordwar.
**/
function execute (message, client) {
    if (ongoingww.includes(message.author.id)){
        message.channel.send("<@" + message.author.id +"> a déjà une wordwar en cours, merci de patienter pour en relancer une nouvelle !")
        return;
    }else{
        ongoingww.push(message.author.id);
        args = utils.getArgs(message, ' ');
        if(args[0] != null){
            wwtimer = args[0];
        }else{
            wwtimer = 20; // Default duration time of a ww is 20 minutes
        }
        if(args[1] != null){
            wwdelay = args[1];
        }else{
            wwdelay = 2; // Default waiting time before a ww is 2 minutes
        }

        message.channel.send("Une wordwar a été initiée par <@" + message.author.id + "> . Elle commencera dans " + wwdelay + " minutes et durera " + wwtimer + " minutes.\nCliquez sur l'emote de réaction pour y prendre part. Si vous ne désirez plus y participer, il vous suffit d'enlever votre réaction.")
            .then(function(message){
                message.react('✅');
                setTimeout(()=> {
                    message.channel.send("La wordwar commence. Vous pouvez toujours la rejoindre si vous le désirez. Bonne chance à tou.te.s !!")
                        var participantTab = [];
                        setTimeout(function(){
                            reaction = message.reactions.cache.find(r => r.name = '✅');

                            users = reaction.users.cache;
                            users.forEach(element => {
                                participantTab += '<@' + element.id + '> '
                            });
                            participantTab += '\n La wordwar est maintenant terminée, merci d\'y avoir participé \!';
                            message.channel.send(participantTab);
                            }, wwtimer * 60000);
                        ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                }, wwdelay * 60000);
            });
    }
}