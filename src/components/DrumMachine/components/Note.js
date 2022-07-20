import React, { useContext, useEffect, memo } from 'react'
import classNames from 'classnames'
import { Context } from '../hooks/useNoteContext'
import { Box, Button } from '@mui/material'

const Note = ({
    trackID,
    clipID,
    isClipOnCurrentPoint,
    isClipEnabled,
    play
}) => {

    const { toggleNote } = useContext(Context)
    const noteClassNames = classNames('note', {
        'on': isClipEnabled,
        'playing': isClipEnabled && isClipOnCurrentPoint
    })

    useEffect(() => {
        if(isClipEnabled && isClipOnCurrentPoint)
            play()
    }, [isClipEnabled, isClipOnCurrentPoint, play])

    const noteClicked = e => {
        // e.target.classList.toggle('on')
        toggleNote({trackID, clipID})
        play()
    }

    return (
        (isClipEnabled)?
            <Button  
            onClick={noteClicked}
            sx={{
                width: '30px',
                height: '50px',
                backgroundColor:'#1769aa',
                //disable hover-effect
                "&.MuiButtonBase-root:hover": {
                    bgcolor: "#1769aa"},
                border: '1px solid #000'
                }}
            >
                
                </Button> :
            <Button 
            outlined 
            onClick={noteClicked} 
            sx={{
                width: '30px',
                height: '50px',
                backgroundColor:'#4587bb',
                //disable hover-effect
                "&.MuiButtonBase-root:hover": {
                    bgcolor: "#4587bb"},
                border: '1px solid #000'
                }}
            >
                
                </Button>
        
        // <div
        //     className={noteClassNames}
        //     onClick={noteClicked}
        // />
    )
}

export default memo(Note)
