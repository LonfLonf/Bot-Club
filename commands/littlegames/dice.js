const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('../utility/ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Row a Dice')
        .addStringOption(option =>
            option.setName('sidesDice')
                .setDescription('D4, D6, D8, D12, D20')
                .setRequired(true)
        ),
    async execute(interaction) {
        const response = interaction.options.getString('sidesDice').toUpperCase();
        let dice;

        switch (response) {
            case "D4":
                dice = Math.floor(Math.random() * 4) + 1;
                break;
            case "D6":
                dice = Math.floor(Math.random() * 6) + 1;
                break;
            case "D8":
                dice = Math.floor(Math.random() * 8) + 1;
                break;
            case "D12":
                dice = Math.floor(Math.random() * 12) + 1;
                break;
            case "D20":
                dice = Math.floor(Math.random() * 20) + 1;
                break;
            default:
                dice = "Tipo de dado inválido!";
                break;
        }

        interaction.reply({
            content: "Número: " + dice,
            ephemeral: false
        });

    }
}