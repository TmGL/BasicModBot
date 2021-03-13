const Discord = require('discord.js');
const ban = require('../../functions/ban');
const config = require('../../config.json');

module.exports = {
    name: 'ban',
    description: 'Bans a member',
    usage: `${config.prefix}ban <user> [days] [reason]`,
    aliases: ['b'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    execute(message, args) {
        if (!message.member.permissions.has('BAN_MEMBERS')) return;
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) throw new Error('No permissions to ban');
        if (!args[0]) return message.reply('please provide a vaild member to ban!');
        
        const member = message.mentions.members.first() || message.guild.member(args[0]);
        const reason = args.slice(1).join(' ') || null;
        const days = parseInt(args[1]);
        if (!isNaN(days)) {
            reason = args.slice(2).join(' ');
        }

        if (!member) return message.channel.send('I cannot find the member specified!');
        if (!member.bannable) return message.reply(member.id === message.guild.ownerId ? 'that member is the owner of the server!' : 'that member has a higher role than me!');

        ban(member, reason, !isNaN(days) ? days : 0)
            .then(() => message.channel.send('Successfully banned ' + member.user.tag)) 
            .catch(err => console.error(err));
    }
}
