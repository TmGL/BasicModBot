const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'invite',
    description: 'Invite link for the bot',
    usage: `${config.prefix}invite`,
    aliases: ['inv'],
    guildOnly: false,
    /**
     * @param {Discord.Message} message
     */
    execute(message) {
        return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Invite Link!')
                .setDescription(`[Click here to invite!](${config.invite})`)
                .setColor('RANDOM')
        );
    }
}
