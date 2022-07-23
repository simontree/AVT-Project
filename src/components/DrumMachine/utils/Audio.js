import { audioContext } from '../../../App'
import { masterOutputNode } from '../../Master/Master'

/**
 * utility class to load audio files, decode audio-buffer
 * and create play-functionality to be used throughout app
 */
class Audio {
    constructor(path){
        if(!this.buffer) this.loadAudioFile(path)
    }

    async loadAudioFile(path){
        this.recorderNode = audioContext.createGain()
        this.recorderNode.gain.value = 1
        this.buffer = null
        this.path = path
        const response = await fetch(path)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.decodeAudioDataAsync(
            audioContext, arrayBuffer
        )
        this.buffer = audioBuffer
    }

    decodeAudioDataAsync(audioCtx, arrayBuffer){
        return new Promise((resolve, reject) => {
            audioCtx.decodeAudioData(
                arrayBuffer,
                buffer => resolve(buffer),
                e => reject(e)
            )
        })
    }

    // function to be called via useAudio hook
    play(gainValue = 1, rateValue = 1){
        audioContext.resume()
        const gain = audioContext.createGain()
        const audio = audioContext.createBufferSource()
        gain.gain.value = gainValue
        audio.playbackRate.value = rateValue
        audio.buffer = this.buffer
        audio.connect(gain)
        gain.connect(this.recorderNode)
        gain.connect(masterOutputNode)
        audio.start(0)
    }
}

export default Audio