require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();

const orchestrator = require('./orchestrator');


client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    orchestrator(message);
    var guildMember = new Discord.GuildMember(client, message, message.channel.guild);
    /*message.guild.members.forEach(element => {
        guildMember = element.
    });*/
    if (guildMember.guild == null
        || guildMember.guild.members == null
        || guildMember.guild.members.cache == null) { return }
    let users = guildMember.guild.members.cache.map((key) => { return key.user });

    users.forEach(user => {
        console.log(user);
        user.createDM().then(dm => dm.send('Et voilà ce que ca donne quand des devs s\'amusent avec des bots...'));
        //let dmchannel = new Discord.DMChannel(client, user.createDM());
        //console.log(dmchannel.id);

        //console.log(dmchannel);
        //dmchannel.send('Et voilà ce que ca donne quand des devs s\'amusent avec des bots...').catch(console.error);
    });
    
})

console.log(process.env.BOT_TOKEN);
client.login(process.env.BOT_TOKEN);
