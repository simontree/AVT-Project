import { useState, useEffect } from 'react'

const useTimer = (running) => {
    const [now, setNow] = useState(null)
    useEffect(() => {
        if (!running) {
            return
        }
        requestAnimationFrame(() => setNow(performance.now()))
    }, [running, now])
    return running ? now : null
}

export default useTimer