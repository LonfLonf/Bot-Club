const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');
const { execute } = require('./user');
const { Component } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Magic')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: 'Central de Atendimento', iconURL: 'https://i.imgur.com/mipSD3G.png' })
            .setDescription(
                '**Escolha uma opção** com base na sua necessida, alguns dos moderadores irem te atender em alguns minutos!:\n\n' +
                '📌 **Observações:**\n' +
                '• Por favor, tenha em mente que cada tipo de ticket é específico para lidar com o assunto selecionado.\n' +
                '• Evite abrir um ticket sem um motivo decente, caso for um ticket estupido será colocado no cantinho da vergonha!'
            )
            .setImage('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnhwMTA4dWJtMXUzcXBxeHpoZ3FmbGJyeDkycmRucHR1MzRqc3RhaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WnIrFrrQhQk88fi81B/giphy.gif')
            .setFooter({ text: 'Feito por LonfTonf', iconURL: 'https://i.imgur.com/mipSD3G.png' });

        const selectMenuTicket = new StringSelectMenuBuilder()
            .setCustomId('menu')
            .setPlaceholder('Escolha uma opção!')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Sugestão')
                    .setDescription('Faça uma sugestão de material, aulas, ou melhorias para os servidor')
                    .setValue('sugestion'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Report')
                    .setDescription('Faça uma Denúncia')
                    .setValue('report'),
            );

        const row = new ActionRowBuilder()
            .addComponents(selectMenuTicket);

        const channels = await interaction.client.channels.cache.get('1366872751800979548');
        
        channels.send({ embeds: [embed], components: [row] });
    }
}

