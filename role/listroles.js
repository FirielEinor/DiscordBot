module.exports = execute;

function execute(message) {
    var allRoles = Array.from(message.guild.roles.cache.values);
    allRoles.forEach((item, key)=> {
        if(item.permissions){

        }
    });

}