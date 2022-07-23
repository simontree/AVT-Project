import React, { useContext, memo } from 'react'
import { soundFiles } from '../audioClips'
import Track from './Track'
import { Context } from '../hooks/useNoteContext'
import { Container } from '@mui/material'

/**
 * @param currentClipID prop to get clip ID from DrumMachine.js
 * @returns all four tracks (kick, cowbell, snare, tom) to be used within DrumMachine.js
 */
const TrackList = ({ currentClipID }) => {
        const { clips: { clipList, notes }} = useContext(Context)
        const content = clipList.map((track, trackID) => {
            const { title, enabledNotes, soundFile } = track
            const filePath = soundFiles[soundFile]
            return (
            <Track
                key={title}
                trackID={+trackID}
                currentClipID={currentClipID}
                title={title}
                notes={notes}
                enabledNotes={enabledNotes}
                filePath={filePath}
            />)})

        return(
            <Container>
                {content}
            </Container>
        )
}

export default memo(TrackList)