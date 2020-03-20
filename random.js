const randomFR = require("random-word-fr")

console.log("prout");
module.exports = (message, args) => {
    message.channel.send(randomFR() + " du Cul !");
}