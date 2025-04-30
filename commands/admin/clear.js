const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { execute } = require('../utility/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear the chat')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        await interaction.channel.messages.fetch({ limit: 20 })
        .then(message => message.forEach(msg => msg.delete()))
        .catch(console.error);

        await interaction.reply({ content: "⚠️ Deleting...", ephemeral: true });
    }
}