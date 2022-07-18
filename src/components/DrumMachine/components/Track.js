import React, { memo } from 'react'
import useAudio from '../hooks/useAudio'
import Note from './Note'
import '../DrumMachine.css'

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
        <div className="track">
            <header className="track_title">{title}</header>
            <main className="track_notes">
                {trackNotes}
            </main>
        </div>
    )
}

export default memo(Track)
