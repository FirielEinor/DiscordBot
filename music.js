const ytdl = require('ytdl-core-discord')

module.exports = (message, args) => {

    if (message.member.voice.channel) {
        message.member.voice.channel.join().then(async connection => {
            connection.play(await ytdl(args[0]))
        });
    } else {
        message.reply('You need to join a voice channel first!');
    }
}