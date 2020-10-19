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
        if(args.length == 0){
                wwtimer = 20; // Default duration time of a ww is 20 minutes
                wwdelay = 2; // Default waiting time before a ww is 2 minutes
        } else {
            if(isNormalInteger(args[0])){
                if(args[0] > 30){
                    message.channel.send("Le temps d'une wordwar ne peux pas excéder **30 minutes** sur ce channel. Merci de réessayer !");
                    ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                    return;
                }else if(args[0] < 1){
                    message.channel.send("Le temps d'une wordwar ne peux pas être inférieur à **1 minute** sur ce channel. Merci de réessayer !")
                    ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                    return;
                }
                wwtimer = args[0];
            }else{
                message.channel.send("Le temps d'une wordwar doit être un entier positif compris entre **1 minute** et **30 minutes**. Merci de réessayer !")
                ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                return;
            }            //  && Number.isInteger(args[1])
            if(args[1] != null){
                if(isNormalInteger(args[1])){
                    if(args[0] > 15){
                        message.channel.send("Le temps d'attente d'une wordwar ne peux pas excéder **10 minutes** sur ce channel. Merci de réessayer !");
                        ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                        return;
                    }else if(args[0] < 1){
                        message.channel.send("Le temps d'attente d'une wordwar ne peux pas être inférieur à **1 minute** sur ce channel. Merci de réessayer !")
                        ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                        return;
                    }
                    wwdelay = args[1];
                }else{
                    message.channel.send("Le temps d'attente d'une wordwar doit être un entier positif compris entre **1 minute** et **15 minutes**. Merci de réessayer !")
                    ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                    return;
                }
            }else{
                wwdelay = 2;
            }
        }
        //  && Number.isInteger(args[0])

        authorid = message.author.id;
        message.channel.send("Une wordwar a été initiée par <@" + message.author.id + "> . Elle commencera dans " + wwdelay + " minutes et durera " + wwtimer + " minutes.\nCliquez sur l'emote de réaction pour y prendre part. Si vous ne désirez plus y participer, il vous suffit d'enlever votre réaction.")
            .then(function(message){
                message.react('✅');
                setTimeout(()=> {
                    reaction = message.reactions.cache.find(r => r.name = '✅');
                    users = reaction.users.cache;
                    var participantStart = "";
                    users.forEach(element => {
                        participantStart += '<@' + element.id + '> '
                    });
                    message.channel.send("\nLa wordwar initiée par <@" + authorid + "> commence. Vous pouvez toujours la rejoindre si vous le désirez. Bonne chance à tou.te.s !!\n" + participantStart)
                        var participantTab = [];
                        setTimeout(function(){
                            participantTab += 'La wordwar initiée par <@' + authorid + '> est maintenant terminée, merci d\'y avoir participé \!\n';
                            reaction = message.reactions.cache.find(r => r.name = '✅');
                            users = reaction.users.cache;
                            users.forEach(element => {
                                participantTab += '<@' + element.id + '> '
                            });
                            message.channel.send(participantTab);
                            }, wwtimer * 60000);
                        ongoingww.splice(ongoingww.indexOf(message.author.id), 1);
                }, wwdelay * 60000);
            });
    }
}

function isNormalInteger(str) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}