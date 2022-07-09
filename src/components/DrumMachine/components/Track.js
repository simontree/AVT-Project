import React, { memo } from 'react'
import useAudio from '../hooks/useAudio'
import Note from './Note'

const Track = ({
    currentStepID,
    soundFilePath,
}) => {
    const [play] = useAudio(soundFilePath)
    
    const notes = [...Array].map((i) => {
        const isNoteOnCurrentStep = currentStepID === i
        const stepID = i

        return (
            <Note
                key={i}
                stepID={stepID}
                isNoteOnCurrentStep={isNoteOnCurrentStep}
                play={play}
            />
        )
    })

    return (
        <div className="track">
            <header className="track_title">{currentStepID}</header>
            <main className="track_notes">
                {notes}
            </main>
        </div>
    )
}

export default memo(Track)
