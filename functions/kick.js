const { GuildMember } = require('discord.js');
/**
 * @param {GuildMember} member 
 * @param {String} reason
 */

async function kick(member, reason) {
    if (!member) {
        throw new Error('No member specified');
    }

    if (reason && typeof reason !== 'string') {
        throw new Error('Reason must be string');
    }

    if (!member.kickable) {
        throw new Error(' Member is not kickable');
    }

    return member.kick(reason);
}

module.exports = kick;
