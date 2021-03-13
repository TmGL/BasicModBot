const { GuildMember } = require('discord.js');
/**
 * @param {GuildMember} member 
 * @param {String} reason
 */

async function ban(member, reason, days) {
    if (!member) {
        throw new Error('No member specified');
    }

    if (reason && typeof reason !== 'string') {
        throw new Error('Reason must be string');
    }

    if (!member.bannable) {
        throw new Error('Member is not bannable');
    }

    return member.ban({ reason: reason, days: days && !isNaN(days) ? parseInt(days) : 0 });
}

module.exports = ban;
