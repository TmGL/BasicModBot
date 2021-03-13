const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const fs = require('fs');
const mongoose = require('mongoose');
const config = require('./config.json');

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
        }
        catch (error) {
            console.error(error.stack);
        }
    });
});

client.commands = new Discord.Collection();
fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dir}/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        }
    }
});

mongoose.connect(config.mongoUri, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.login(token);

module.exports = client;