module.exports = execute;

function execute(message) {
    text= message.content.slice(9,message.content.length);
    poll = text.split(";"); // array made of the question and the answers to the poll
    label = poll[0]; // we get the introduction of the poll to display further
    poll.shift(); // we delete the label of the array so the answers only remain

    if(poll.length > 6){
        message.channel.send("Les sondages n'acceptent pas plus de 6 réponses ... Merci de réessayer");
    }else{
        reply = "Un sondage a été initié par <@" + message.author.id + "> \n";
        reply = reply + label + "\n";

        let pollReact = []; // empty array of the emojis used for the answer to the poll

        //var pollReact = ["\u0030\u20E3","\u0031\u20E3","\u0032\u20E3","\u0033\u20E3","\u0034\u20E3","\u0035\u20E3", "\u0036\u20E3","\u0037\u20E3","\u0038\u20E3","\u0039\u20E3"]

        pollReact.push('🤘','✌️','🖖','✊','👍','🖐️');

        poll.forEach( function(item, key){

            // here we retrieve a random emoji that is not yet in the poll react array
            emoji = "";
            // we create the reply with the aggregation of the emoji and the choices made by the user
            reply = reply + pollReact[key] + " " + item + "\n";
        });

        message.channel.send(reply) // we send the poll message ...
        .then( function(message) { // ... and we react with the appropriate emojis
            poll.forEach(function(item, key){
                message.react(pollReact[key]);
            });
        })
        .catch(console.error());
    }
}