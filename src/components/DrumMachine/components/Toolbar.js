import React, { memo } from 'react'
import '../DrumMachine.css'

const ToolBar = ({
    setStartTime,
    setPastLapsedTime,
    setBPM,
    isPlaying,
    startTime,
    BPM
}) => {

    function togglePlayback() {
        if (isPlaying) {
            setPastLapsedTime(l => l + performance.now() - startTime)
            setStartTime(null)
        } else {
            setStartTime(performance.now())
        }
    }

    function stopPlayback() {
        setPastLapsedTime(0)
        setStartTime(null)
    }

    function updateBPM(e) {
        setBPM(e.target.value)
    }

    return (
        <nav className="toolbar">
            <button className="form_element button_stop" style={{width:"70px"}} onClick={stopPlayback} aria-label="Stop">
                Stop
            </button>
            <button className="form_element button_play_pause" style={{width:"100px"}} onClick={togglePlayback} aria-label="Play / Pause">
                Play/Pause
            </button> 
            <input 
            className="form_element input_bpm" 
            id="bpm" 
            type="range" 
            value={BPM}
            max={200} 
            min={60}
            onChange={updateBPM} />
            <label className="label_bpm" htmlFor="bpm">{BPM} BPM</label>
        </nav>
    )
}

export default memo(ToolBar)
