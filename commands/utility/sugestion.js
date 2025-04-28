const { EmbedBuilder, ActionRowBuilder, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { execute } = require('./user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sugestion')
        .setDescription('Give a sugestion'),
    async execute(interaction, client) {

        const modal = new ModalBuilder()
            .setCustomId('modalsugestion')
            .setTitle('Sugestion');

        const sugestionInput = new TextInputBuilder()
            .setCustomId('sugestioninput')
            .setLabel("Qual é a sua sugestão?")
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

        const sugestionActionRow = new ActionRowBuilder().addComponents(sugestionInput);

        modal.addComponents(sugestionActionRow);

        const user = interaction.user;

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === `modalsugestion`;

        interaction.awaitModalSubmit({ filter, time: 240_000, })
            .then((result) => {
                const response = result.fields.getTextInputValue('sugestioninput');

                const channel = result.client.channels.cache.get('1366221063859605544');

                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Sugestão')
                    .setAuthor({ name: user.username, iconURL: user.avatarURL() })
                    .setDescription(response)
                    .setTimestamp();

                channel.send({ embeds: [embed] });

                result.reply({ content: "Sugestão enviada com sucesso!", ephemeral: true });
            }).catch((err) => {
                console.log(err);
            });
    }
}