const Discord = require('discord.js');
const kick = require('../../functions/kick');
const config = require('../../config.json');

module.exports = {
    name: 'kick',
    description: 'Kicks a member',
    usage: `${config.prefix}kick <user> [reason]`,
    aliases: ['k'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    execute(message, args) {
        if (!message.member.permissions.has('KICK_MEMBERS')) return;
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) throw new Error('No permission to kick');
        if (!args[0]) return message.reply('please provide a vaild member to kick!');
        
        const member = message.mentions.members.first() || message.guild.member(args[0]);
        const reason = args.slice(1).join(' ');

        if (!member) return message.channel.send('I cannot find the member specified!');
        if (!member.bannable) return message.reply(member.id === message.guild.ownerId ? 'That member is the owner of the server!' : 'That member has a higher role than me!');
        
        kick(member, reason)
            .then(() => message.channel.send('Successfully kicked ' + member.user.tag))
            .catch(err => console.error(err));
    }
}
