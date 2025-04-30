const { Events, MessageFlags, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, time } = require('discord.js');
const { execute } = require('./ready');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {

        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'menu') {
                const choice = interaction.values[0];

                if (choice === 'sugestion') {
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
                } else if (choice === 'report') {

                    const modalreport = new ModalBuilder()
                        .setCustomId('modalreport')
                        .setTitle('Report');

                    const reportinput = new TextInputBuilder()
                        .setCustomId('reportinput')
                        .setLabel('Descreva em poucas palavras o ocorrido!')
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true);
                    
                    const actionReport = new ActionRowBuilder()
                        .addComponents(reportinput);
                    
                    modalreport.addComponents(actionReport);

                    const user = interaction.user;

                    await interaction.showModal(modalreport);

                    const modalfilter = ( interaction ) => interaction.customId === 'modalreport';

                    interaction.awaitModalSubmit({ modalfilter, time: 360_000, })
                    .then((result) => {
                        const response = result.fields.getTextInputValue('reportinput');

                        const channel = result.client.channels.cache.get('1366983996042510377');

                        const embed = new EmbedBuilder()
                            .setColor(0xFF0000)
                            .setTitle('Report')
                            .setAuthor({ name: user.username, iconURL: user.avatarURL() })
                            .setDescription(response)
                            .setTimestamp();

                        channel.send({ embeds: [embed] });

                        result.reply({ content: "Report enviada com sucesso!", ephemeral: true });
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            }
        }

        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found`);
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                } else {
                    await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
                }
            }
        }
    },
};