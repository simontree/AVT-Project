import React, { memo } from 'react'
import useAudio from '../hooks/useAudio'
import Note from './Note'
import '../DrumMachine.css'
import { Grid, Typography } from '@mui/material'

const Track = ({
    trackID,
    currentClipID,
    title,
    notes,
    enabledNotes,
    filePath,
}) => {
    const [play] = useAudio(filePath)
    
    const trackNotes = [...Array(notes)].map((el, i) => {
        const isClipEnabled = enabledNotes.indexOf(i) !== -1
        const isClipOnCurrentPoint = currentClipID === i
        const clipID = i

        return (
            <Note
                key={i}
                trackID={trackID}
                clipID={clipID}
                isClipEnabled={isClipEnabled}
                isClipOnCurrentPoint={isClipOnCurrentPoint}
                play={play}
            />
        )
    })

    return (
    <Grid container
    direction="row"
    justifyContent="space-evenly">
        <Grid 
        item xs={1}>
        <Typography 
        variant="h6" 
        sx={{ 
            textAlign: 'right',
            fontWeight: '700',
            marginRight: '-40px', 
            transform: 'translateY(50%)',
            color: '#bbdefb'}}>
            {title} 
        </Typography>
        </Grid>
        <Grid item xs={8}>
        {trackNotes}
        </Grid>
    </Grid>
    )
}

export default memo(Track)
