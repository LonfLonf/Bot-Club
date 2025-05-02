const { Events, MessageFlags, EmbedBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, time, PermissionOverwrites, PermissionFlagsBits } = require('discord.js');
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

                    const modalfilter = (interaction) => interaction.customId === 'modalreport';

                    interaction.awaitModalSubmit({ modalfilter, time: 360_000, })
                        .then(async (result) => {
                            const response = result.fields.getTextInputValue('reportinput');

                            const channel = result.client.channels.cache.get('1366983996042510377');

                            const embed = new EmbedBuilder()
                                .setColor(0xFF0000)
                                .setTitle('Report')
                                .setAuthor({ name: user.username, iconURL: user.avatarURL() })
                                .setDescription(response)
                                .setTimestamp();

                            channel.send({ embeds: [embed] });
                            const categoryId = '1367679058627792998'

                            const newchannel = await result.guild.channels.create({
                                name: `reportby-${result.user.displayName}`,
                                type: 0,
                                parent: categoryId,
                                PermissionOverwrites: [
                                    {
                                        id: result.guild.id,
                                        deny: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                    },
                                    {
                                        id: result.user.id,
                                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                    },
                                    {
                                        id: 1365569549029605426, // Owner
                                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                    },
                                    {
                                        id: 1365569809533763635, // Moderator
                                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
                                    },
                                ]
                            })

                            const embedreport = new EmbedBuilder()
                                .setColor(0x0099FF)
                                .setAuthor({ name: 'Central de Atendimento', iconURL: 'https://i.imgur.com/mipSD3G.png' })
                                .setDescription(
                                    '**Canal de Denúncia** aberto com sucesso! Aqui você poderá relatar o ocorrido com detalhes:\n\n' +
                                    '📌 **O que você pode fazer aqui:**\n' +
                                    '• Envie vídeos, imagens, prints ou escreva o que aconteceu.\n' +
                                    '• Quanto mais claro for seu relato, mais fácil será resolvermos a situação.\n\n' +
                                    '⚖️ **E agora?**\n' +
                                    '• A equipe de moderação vai analisar tudo com cuidado.\n' +
                                    '• Vamos buscar a melhor solução possível, de forma justa e que resolva o problema da melhor forma pra você.\n\n' +
                                    '🚨 **Atenção:**\n' +
                                    '• Denúncias falsas ou sem sentido podem resultar em punições.\n' +
                                    '• Aqui é um espaço sério, então use com responsabilidade.'
                                )
                                .setImage('https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG1teGtlaHJyMnB3YndvYjQyMTFic3FscTNqM2h6NG41eng2MGg0cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/40F4fLvOkInEk/giphy.gif')
                                .setFooter({ text: 'Feito por LonfTonf', iconURL: 'https://i.imgur.com/mipSD3G.png' });

                            newchannel.send({ embeds: [embedreport] });

                            result.reply({ content: `Report enviado com sucesso no canal ${newchannel}`, ephemeral: true });
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