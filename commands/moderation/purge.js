const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'purge',
    description: 'Clears the specified amount of messages.',
    usage: `${config.prefix}purge <amount>`,
    aliases: ['clear'],
    guildOnly: true,
    /**
     * @param {Discord.Message} message
     * @param {String[]} args
     * @param {Discord.Client} client 
     */
    execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) return;
        if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) throw new Error('No permission to purge');
        if (!args[0]) return message.reply('please specifiy the amount of messages to purge!');

        const amount = parseInt(args[0]);
        if (isNaN(amount)) return message.reply('please specifiy a valid number!');
        if (amount > 100) return message.reply('you can only purge 100 messages at once!');

        message.delete()
            .then(async () => {
                try {
                    await message.channel.bulkDelete(amount);
                    await message.channel.send(`Cleared \`${amount}\` messages!`);
                } catch (err) {
                    message.channel.send('There was an error! This is most likely because the messages you are trying to delete are over 2 weeks old.');
                }
            })
            .catch((err) => console.error(err));
    }
}