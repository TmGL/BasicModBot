const Discord = require('discord.js');
const config = require('../../config.json');
const { warnSchema } = require('../../util/index');

module.exports = {
    name: 'warnings',
    description: 'Lists the warnings for the provided member.',
    usage: `${config.prefix}warnings <user>`,
    aliases: ['warns'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message 
     * @param {String[]} args 
     */
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
        if (!args[0]) return message.reply('please provide a valid member to warn!');

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.reply('I cannot find the member specified!');

        const res = await warnSchema.findOne({
            Guild: message.guild.id,
            Member: member.user.id
        });

        if (res) {
            let reply = `Warnings for ${member.user.tag} \n\n`;

            for (const warning of res.warnings) {
                const { author, timestamp, reason } = warning;

                reply += `By ${author} on ${new Date(
                    timestamp
                ).toLocaleDateString()} for "${reason}" \n\n`;
            }

            return message.channel.send(new Discord.MessageEmbed()
                    .setDescription(reply)
                    .setColor('RANDOM')
                    .setTimestamp()
                );
        }

        return message.reply('that user has not been warned in this server!');
    }
}