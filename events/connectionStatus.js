const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    name: VoiceConnectionStatus.Ready,
    once: false,
    async execute(oldState, newState) {
        console.log('Connection is in the Ready state!');
    }
}