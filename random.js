const randomFR = require("random-word-fr")

module.exports = (message, args) => {
    message.channel.send(randomFR() + " du Cul !");
}