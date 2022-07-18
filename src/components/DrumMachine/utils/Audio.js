class Audio {

    constructor(path){
        const AudioContext = window.AudioContext || window.webkitAudioContext || window.MozAudioContext
        this.audioContext = new AudioContext()
        if(!this.buffer) this.loadAudioFile(path)
    }

    async loadAudioFile(path){
        this.recorderNode = this.audioContext.createGain()
        this.recorderNode.gain.value = 1
        this.buffer = null
        this.path = path
        const response = await fetch(path)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.decodeAudioDataAsync(
            this.audioContext, arrayBuffer
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

    play(gainValue = 1, rateValue = 1){
        this.audioContext.resume()
        const gain = this.audioContext.createGain()
        const audio = this.audioContext.createBufferSource()
        gain.gain.value = gainValue
        audio.playbackRate.value = rateValue
        audio.buffer = this.buffer
        audio.connect(gain)
        gain.connect(this.recorderNode)
        gain.connect(this.audioContext.destination)
        audio.start(0)
    }
}

export default Audio