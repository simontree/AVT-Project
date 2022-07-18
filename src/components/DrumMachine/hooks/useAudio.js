import {useState, useEffect, useCallback} from 'react';
import Audio from '../utils/Audio'

const useAudio = (audioFilePath) =>{
    const [audio, setAudio] = useState({ play: () => { } })
    const play = useCallback(() => audio.play(), [audio])   
    useEffect(() => {
        setAudio(new Audio(audioFilePath))
    }, [audioFilePath])

    return [play]
}

export default useAudio;