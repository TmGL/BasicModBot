const Discord = require('discord.js');
const client = require('../index.js');

module.exports = {
    name: 'ready',
    once: true,
    run() {
        client.user.setActivity('?help', { type: 'LISTENING' });
        console.log(`${client.user.tag} is now online!`);
    }
}