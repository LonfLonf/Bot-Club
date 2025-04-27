const { player } = require('../../index');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause the stopped music'),
    async execute(interaction) {
        player.unpause()
        return await interaction.reply('Unpausing the stopped music');
    }
}