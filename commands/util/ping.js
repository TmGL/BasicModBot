const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'ping',
    description: 'Shows the latency of the bot in miliseconds',
    usage: `${config.prefix}ping`,
    aliases: ['ms'],
    /**
     * @param {Discord.Message} message
     */
    execute(message) {
        message.channel.send('Pinging...')
        .then(msg => msg.edit(`:table_tennis: Pong! \`${msg.createdTimestamp - message.createdTimestamp}ms\``))
        .catch(err => console.error(err));
    }
}
