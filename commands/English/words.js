const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { request, errors } = require('undici');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('words')
        .setDescription('Receive a few words to translate')
        .addIntegerOption(option =>
            option.setName('qtdwords')
                .setDescription('1 -> 5')
                .setMinValue(1)
                .setMaxValue(5)
                .setRequired(true)
        ),
    async execute(interaction, message) {
        const qtdWords = interaction.options.getInteger('qtdwords');

        if (qtdWords > 5) {
            return await interaction.reply('1 -> 5');
        }

        const query = new URLSearchParams({ qtdWords })

        const url = `https://lonftaka-gbg2g5hca8b2h2b0.brazilsouth-01.azurewebsites.net/api/Words/${qtdWords}` 

        const result = await request(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await result.body.json();
        const englishWords = data.map(x => x.englishWord);

        const modal = new ModalBuilder()
            .setCustomId('wordsmodal')
            .setTitle('Translate the words - Only Spaces');

        const wordsInput = new TextInputBuilder()
            .setCustomId('wordsinput')
            .setLabel(englishWords.join(', '))
            .setRequired(true)
            .setPlaceholder('Coloque as traduções aqui')
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(wordsInput);

        modal.addComponents(firstActionRow);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === `wordsmodal`;

        interaction.awaitModalSubmit({ filter, time: 120_000, })
            .then((modalInteraction) => {
                const response = modalInteraction.fields.getTextInputValue('wordsinput');
                const responseSplit = response.split(' ');
                let responseFormatted = '\n';
                let correctAnswers = 0;

                for (let i = 0; i < englishWords.length; i++) {
                    if (responseSplit[i]?.toLowerCase() === data[i].portugueseTranslation.toLowerCase()) {
                        responseFormatted += `✅ **${englishWords[i]}** → **${responseSplit[i]}**\n`;
                        correctAnswers++;
                    } else {
                        responseFormatted += `❌ **${englishWords[i]}** → **${responseSplit[i]}**\n`;
                    }
                }

                modalInteraction.reply({
                    content: `✅ **Resultados:**
                
                - Respostas corretas: **${correctAnswers}/${englishWords.length}**
                
                📝 **Detalhes das suas respostas:**
                
                ${responseFormatted}
                
                `,
                    ephemeral: true
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
