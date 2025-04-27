const { player } = require('../../index');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause the playing music'),
    async execute(interaction) {
        player.pause()
        return await interaction.reply('Pausing the music');
    }
}