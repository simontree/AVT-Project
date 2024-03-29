import React, { useContext, useEffect, memo } from 'react'
import { Context } from '../hooks/useNoteContext'
import { Button } from '@mui/material'

const Note = ({
    trackID,
    clipID,
    isClipOnCurrentPoint,
    isClipEnabled,
    play
}) => {

    const { toggleNote } = useContext(Context)

    /**
     * to just play clips that are enabled at current time
     */
    useEffect(() => {
        if(isClipEnabled && isClipOnCurrentPoint)
            play()
    }, [isClipEnabled, isClipOnCurrentPoint, play])

    const noteClicked = e => {
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
                border: '1px solid #104976'
                }}
            /> :    //else
            <Button 
            onClick={noteClicked} 
            sx={{
                width: '30px',
                height: '50px',
                backgroundColor:'#4587bb',
                //disable hover-effect
                "&.MuiButtonBase-root:hover": {
                    bgcolor: "#4587bb"},
                border: '1px solid #104976'
                }}
            />
    )
}

export default memo(Note)
