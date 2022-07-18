import React, { useContext, memo } from 'react'
import { soundFiles } from '../audioClips'
import Track from './Track'
import { Context } from '../hooks/useNoteContext'

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
            <div>
                {content}
            </div>
        )
}

export default memo(TrackList)