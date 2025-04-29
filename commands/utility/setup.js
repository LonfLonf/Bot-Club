const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { execute } = require('./user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Magic')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: 'Central de Atendimento', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            .setDescription(
                '**Escolha uma opção** com base na sua necessida, alguns dos moderadores irem te atender em alguns minutos!:\n\n' +
                '📌 **Observações:**\n' +
                '• Por favor, tenha em mente que cada tipo de ticket é específico para lidar com o assunto selecionado.\n' +
                '• Evite abrir um ticket sem um motivo decente, caso for um ticket estupido será colocado no cantinho da vergonha!'
            )
            .setImage('https://i.pinimg.com/originals/3e/25/3d/3e253df12fb2f893b262702873774fd4.gif')
            .setFooter({ text: 'Feito por LonfTonf', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
        
        const channels = await interaction.client.channels.cache.get('1366872751800979548');

        channels.send({ embeds: [embed] });
    }

}

