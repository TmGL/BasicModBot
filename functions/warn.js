const util = require('../util/index');
const { warnSchema } = util;
const { User, GuildMember } = require('discord.js');

/**
 * @param {User} author
 * @param {GuildMember} member 
 * @param {String} reason
 */
module.exports = async function (author, member, reason) {
    if (!member) {
        throw new Error('No member specified');
    }

    if (!reason) {
        throw new Error('No reason specified');
    }

    if (typeof reason !== 'string') {
        throw new Error('Reason must be string');
    }

    const warning = {
        author: author.tag,
        timestamp: new Date().getTime(),
        reason: reason
    }

    await warnSchema.findOneAndUpdate({
        Guild: member.guild.id,
        Member: member.id
    }, {
        Guild: member.guild.id,
        Member: member.id,
        $push: {
            warnings: warning
        }
    }, {
        upsert: true
    });
}