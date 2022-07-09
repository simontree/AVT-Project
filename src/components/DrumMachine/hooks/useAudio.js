import {useState, useEffect, useCallback} from 'react';
import Audio from '../components/Audio'

const useAudio = (audioFilePath) =>{
    const [audio, setAudio] = useState({play: () => {}})
    const play = useCallback(() => audio.play(), [audio])   //useCallback() prevents re-rerendering unless its props change

    useEffect(() => {
        setAudio(new Audio(audioFilePath))
    }, [audioFilePath])

    return [play]
}

export default useAudio;