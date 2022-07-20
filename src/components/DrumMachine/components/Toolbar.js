import React, { memo } from 'react'
import '../DrumMachine.css'
import { Box } from '@mui/material'
import StopIcon from '@mui/icons-material/Stop'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import Slider from '@mui/material/Slider'

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
            <IconButton 
            className="form_element button_stop" 
            onClick={stopPlayback}
            >
                <StopIcon/>
            </IconButton>
            <IconButton 
            className="form_element button_play_pause" 
            onClick={togglePlayback}
            >
                {(isPlaying) ?
                <PauseIcon/> :
                <PlayArrowIcon/>}
            </IconButton>
            <Box width={200} sx={{marginLeft: 5, textAlign: 'center'}}>
                {BPM} BPM
                <Slider
                value={BPM}
                onChange={updateBPM}
                min={60}
                max={200}
                 /> 
            </Box> 
            {/* <input 
            className="form_element input_bpm" 
            id="bpm" 
            type="range" 
            value={BPM}
            max={200} 
            min={60}
            onChange={updateBPM} />
            <label 
            className="label_bpm" 
            htmlFor="bpm">{BPM} BPM</label> */}
        </nav>
    )
}

export default memo(ToolBar)
