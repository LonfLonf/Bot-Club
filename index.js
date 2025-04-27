const fs = require('node:fs');
const path = require('node:path');
const { Client, GuildMember, Intents, Events, GatewayIntentBits, Collection, MessageFlags } = require('discord.js');
const { token } = require('./config.json');
const { createAudioPlayer } = require('@discordjs/voice');
const stackMusic = [];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent], });
const player = createAudioPlayer();

module.exports = { player };

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath);

for(const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
        player.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
        player.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);