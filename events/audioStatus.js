const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    name: AudioPlayerStatus.Playing,
    async execute() {
        console.log('Audio player is in the Playing state!');
    }
}