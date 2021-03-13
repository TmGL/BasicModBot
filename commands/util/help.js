const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Help for the bot',
    usage: `${config.prefix}help`,
    aliases: ['h', 'commands'],
    guildOnly: false,
    /**
     * @param {Discord.Client} client
     * @param {Discord.Message} message
     * @param {String[]} args
     */
    execute(message, args, client) {
        const all = new Discord.MessageEmbed()
            .setTitle('All Commands')
            .addField('Moderation', '`ban`, `kick`, `mute`, `unmute`')
            .addField('Util', '`ping`, `help`')
            .setColor('RANDOM');

        if (!args[0]) {
            return message.channel.send(all);
        } else {
           const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
           if (!command) return message.channel.send(all);

           const cmdEmbed = new Discord.MessageEmbed()
                .setTitle(`${command.name.charAt(0).toUpperCase() + command.name.slice(1)}`)
                .addField('Description', command.description)
                .addField('Usage', `\`${command.usage}\``)
                .addField('Aliases', command.aliases ? command.aliases.join(', ') : 'None')
                .setFooter('[] = optional, <> = required')
                .setColor('RANDOM');
         
            return message.channel.send(cmdEmbed);
        }
    }
}
