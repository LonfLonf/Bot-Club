const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a music')
    .addStringOption(option =>
      option.setName('play')
        .setDescription('Play a music')
        .setRequired(true)
    ),
  async execute(interaction, message) {

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return await interaction.reply('Please enter in a channel to play a music');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    })

  }
}
