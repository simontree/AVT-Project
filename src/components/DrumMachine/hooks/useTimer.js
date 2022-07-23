import { useState, useEffect } from 'react'


const useTimer = (running) => {
    const [now, setNow] = useState(null)
    useEffect(() => {
        if (!running) {
            return  //returns null
        }
        // utility method to update timer to time of performance.now() - in ms
        requestAnimationFrame(() => setNow(performance.now()))
    }, [running, now])
    return running ? now : null
}

export default useTimer