const { Role, GuildMember } = require('discord.js');
/**
 * @param {GuildMember} member
 * @param {Role} role 
 * @param {String} reason
 */

async function mute(member, role, reason) {
    if (!member) {
        throw new Error('No member specified');
    }

    if (!role) {
        throw new Error('No role specified');
    }

    if (reason && typeof reason !== 'string') {
        throw new Error('Reason must be string');
    }

    if (!role.editable) {
        throw new Error('Role is not editable');
    }

    return member.roles.add(role, reason);
}

module.exports = mute;
