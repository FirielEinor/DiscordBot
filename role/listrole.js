module.exports = execute;

const roleUtils = require('./role.js');

function execute(message, client){
    roleUtils.listRole(message, client);
}