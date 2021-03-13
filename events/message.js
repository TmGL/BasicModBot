const Discord = require('discord.js');
const { prefix } = require('../config.json');
const client = require('../index');

module.exports = {
    name: 'message',
    once: false,
    /** 
     * @param {Discord.Message} message 
     */
    run(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        if (command.guildOnly && message.channel.type == 'dm') return message.channel.send(`${message.author}, this command can not be done in DMs!`);

        try {
            command.execute(message, args, client);
        } catch (error) {
            console.error(`command.error.${command.name.toUpperCase()}:\n` + error.stack);
        }
    }
}
