const Discord = require('discord.js');
const unmute = require('../../functions/unmute');
const config = require('../../config.json');

module.exports = {
    name: 'unmute',
    description: 'Unmutes a member',
    usage: `${config.prefix}unmute <user> [reason]`,
    aliases: ['um'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    execute(message, args) {
        if (!message.member.permissions.has(['MANAGE_ROLES', 'MANAGE_MESSAGES'])) return;
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) throw new Error('No permissions to unmute');
        if (!args[0]) return message.reply('please provide a vaild member to mute!');

        const role = message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = message.mentions.members.first() || message.guild.member(args[0]);
        const reason = args.slice(1).join(' ');

        if (!role) throw new Error('Muted role was not found');
        if (!member) return message.channel.send('I cannot find the member specified!');
        if (!role.editable) throw new Error('Muted role is not editable');

        if (member.roles.cache.has(role.id)) {
            unmute(member, role, reason)
                .then(() => message.channel.send('Successfully unmuted ' + member.user.tag))
                .catch(err => console.error(err));
        }

        return message.reply('that user is not muted!');
    }
}