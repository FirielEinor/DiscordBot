const randomFR = require("random-word-fr")

module.exports = (message) => {
    message.channel.send(randomFR() + " du Cul !");
}