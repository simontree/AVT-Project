import React, { memo } from 'react'
import '../DrumMachine.css'

const ToolBar = ({
    setStartTime,
    setPastLapse,
    setBPM,
    isSequencePlaying,
    startTime,
    BPM
}) => {

    function togglePlayback() {
        if (isSequencePlaying) {
            setPastLapse(l => l + performance.now() - startTime)
            setStartTime(null)
        } else {
            setStartTime(performance.now())
        }
    }

    function stopPlayback() {
        setPastLapse(0)
        setStartTime(null)
    }

    function updateBPM(e) {
        setBPM(e.target.value)
    }

    return (
        <nav className="toolbar">
            <button className="form_element button_stop" onClick={stopPlayback} aria-label="Stop">
                <svg width="14" height="14" viewBox="0 0 14 14">
                    <rect className="button_icon_path" x="2" y="2" width="10" height="10" />
                </svg>

            </button>
            <button className="form_element button_play_pause" onClick={togglePlayback} aria-label="Play / Pause">
                Play/Pause
            </button> 
            <input className="form_element input_bpm" id="bpm" type="text" value={BPM} onChange={updateBPM} />
            <label className="label_bpm" htmlFor="bpm">BPM</label>
        </nav>
    )
}

export default memo(ToolBar)
