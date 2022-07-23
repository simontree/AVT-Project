import {useState, useEffect, useCallback} from 'react';
import Audio from '../utils/Audio'

/**
 * custom-hook to be used throughout app, especially in Track.js
 * to pass play-function as prop to each of all 32 Notes
 * @param audioFilePath
 * @returns 
 */
const useAudio = (audioFilePath) =>{
    const [audio, setAudio] = useState({ play: () => { } })
    const play = useCallback(() => audio.play(), [audio])   
    useEffect(() => {
        setAudio(new Audio(audioFilePath))
    }, [audioFilePath])
    return [play]
}

export default useAudio;