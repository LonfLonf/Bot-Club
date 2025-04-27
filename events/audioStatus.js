const { AudioPlayerStatus } = require('@discordjs/voice');

module.exports = {
    name: AudioPlayerStatus.Playing,
    once: false,
    async execute(oldState, newState) {
        console.log('Audio player is in the Playing state!');
    }
}