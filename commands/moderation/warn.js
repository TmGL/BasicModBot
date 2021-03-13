const Discord = require('discord.js');
const config = require('../../config.json');
const warn = require('../../functions/warn');

module.exports = {
    name: 'warn',
    descipriotn: 'Warns a user in the server',
    usage: `${config.prefix}warn <user> <reason>`,
    aliases: ['w'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    execute(message, args) {
        if (!message.member.permissions.has(['MANAGE_MESSAGES', 'MANAGE_ROLES'])) return;
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) throw new Error('No permissions to warn');
        if (!args[0]) return message.reply('please provide a valid member to warn!');
        if (!args[1]) return message.reply('please provide a valid reason!');
           
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const reason = args.slice(1).join(' ');

        if (!member) return message.reply('I cannot find the member specified!');

        warn(message.author, member, reason)
            .then(() => message.channel.send('Successfully warned ' + member.user.tag))
            .catch(err => console.error(err));
    }
}