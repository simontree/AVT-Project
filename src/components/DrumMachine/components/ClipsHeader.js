import React from 'react'
import '../DrumMachine.css'
import { Grid } from '@mui/material'

const ClipsHeader = ({ count = 0, currentClipID }) => {
    
    const isPlaying = (index) => {
        if(index === currentClipID){
            return true
        }else{
            return false
        }
    }

    /**
     * creates Array to show which notes are being played at a certain time
     */
    let content = [...Array(count)]
    .map((el, i) => 
    (<div className={isPlaying(i)? 'clip clip-playing': 'clip'} key={i + 1}><button/></div>))

    return (
        <Grid container direction='row' sx={{paddingLeft: '225px'}}>
            {content}
        </Grid>
    )
}

export default ClipsHeader