const Discord = require('discord.js');
const { durationParser } = require('../../util/index');
const mute = require('../../functions/mute');
const unmute = require('../../functions/unmute');
const config = require('../../config.json');

module.exports = {
    name: 'mute',
    description: 'Mutes a member',
    usage: `${config.prefix}mute <user> [time] [reason]`,
    aliases: ['m'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    execute(message, args) {
        if (!message.member.permissions.has(['MANAGE_ROLES', 'MANAGE_MESSAGES'])) return;
        if (!message.guild.me.permissions.has('MANAGE_ROLES')) throw new Error('No permissions to mute');
        if (!args[0]) return message.reply('please provide a vaild member to mute!');

        const role = message.guild.roles.cache.find(r => r.name === 'Muted');
        const member = message.mentions.members.first() || message.guild.member(args[0]);
        const reason = args.slice(1).join(' ') || null;

        if (!role) throw new Error('Muted role was not found');
        if (!member) return message.channel.send('I cannot find the member specified!');
        if (!role.editable) throw new Error('Muted role is not editable');

        let parsedDuration;
        if (args[1]) {
            if (!isNaN(args[1])) {
                parsedDuration = durationParser(args[1] + ' minutes');
            } else {
                parsedDuration = durationParser(args[1]);
            }
        }

        if (!member.roles.cache.has(role.id)) {
            mute(member, role, reason)
                .then(() => message.channel.send('Successfully muted ' + member.user.tag))
                .catch(err => console.error(err));

            if (parsedDuration) {
                setTimeout(() => {
                    unmute(member, role, 'Automatically unmuted after time.');
                }, parsedDuration);
            }

            return;
        }

        return message.reply('that user is already muted!');
    }
}
