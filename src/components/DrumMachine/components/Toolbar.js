import React, { memo } from 'react'
import '../DrumMachine.css'
import { Box, Grid, Typography } from '@mui/material'
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
        <Grid container
        justifyContent='center'
        sx={{marginBottom: '10px'}}>
            <Grid item>
            <IconButton
            onClick={stopPlayback}
            sx={{border: '1px solid #bbdefb', marginRight: 2}}>
                <StopIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}/>
            </IconButton>
            </Grid>
            <Grid item>
            <IconButton
            onClick={togglePlayback}
            sx={{border: '1px solid #bbdefb'}}>
                {(isPlaying) ?
                <PauseIcon
                fontSize="large"
                sx={{
                    color: '#bbdefb'
                }}/> :
                <PlayArrowIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}/>}
            </IconButton>
            </Grid>
            <Grid item>
            <Box width={200} 
                sx={{marginLeft: 5, textAlign: 'center', color: '#bbdefb'}}>
                <Slider
                value={BPM}
                onChange={updateBPM}
                min={60}
                max={200}
                sx={{color: '#bbdefb'}}/> 
            </Box> 
            </Grid>
            <Grid item>
            <Typography 
            variant='h5'
            sx={{
            marginLeft: 5, 
            color: '#bbdefb',
            fontWeight: '600'}}>
                {BPM} BPM
            </Typography>
            </Grid>
        </Grid>
    )
}

export default memo(ToolBar)
