class Audio {

    constructor(path){
        const AudioContext = window.AudioContext || window.webkitAudioContext || window.MozAudioContext
        this.audioCtx = new AudioContext()
        if(!this.buffer) this.loadAudioFile(path)
    }

    async loadAudioFile(path){
        this.audioNode = this.audioCtx.createGain()
        this.audioNode.gain.value = 1
        this.buffer = null
        this.path = path
        const response = await fetch(path)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await this.decodeAudioDataAsync(
            this.audioCtx, arrayBuffer
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
        this.audioCtx.resume()
        const gain = this.audioCtx.createGain()
        const sound = this.audioCtx.createBufferSource()
        gain.gain.value = gainValue
        sound.playbackRate.value = rateValue
        sound.buffer = this.buffer
        sound.connect(gain)
        gain.connect(this.audioNode)
        gain.connect(this.audioCtx.destination)
        sound.start(0)
    }
}

export default Audio