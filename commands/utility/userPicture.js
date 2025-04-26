const { SlashCommandBuilder, UserManager } = require('discord.js');
const user = require('./user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('infouser')
        .setDescription('Get the Picture, Banner and Description of any user')
        .addStringOption(option =>
            option.setName('type')
                .setDescription('Banner, Picture')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('User Id')
                .setRequired(true)
            ),
    async execute(interaction) {
        const type = interaction.options.getString('type');
        const userId = interaction.options.getString('userid');

        if (!type || !userId) {
            return await interaction.reply('usage: Type(banner, picture) ID(123456789)')
        }

        const clients = interaction.client;
        const user = await clients.users.fetch(userId);

        if (!user)
        {
            return await interaction.reply('User Not Found');
        }

        switch(type) { 
            case "banner":
                const bannerUrl = await user.bannerURL();
                return await interaction.reply(bannerUrl);
            case "picture":
                const pictureUrl = await user.avatarURL();
                return await interaction.reply(pictureUrl);
            default:
                return await interaction.reply('usage: Type(banner, picture) ID(123456789)')
        }
    }
};
