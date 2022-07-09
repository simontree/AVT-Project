import React, { memo } from 'react'
import audioClips from '../audioClips'
import Track from './Track'

const TrackList = ({ currentStepID }) => {

        const soundFilePath = audioClips

        return (
            <Track
                key={currentStepID}
                currentStepID={currentStepID}
                soundFilePath={soundFilePath}
            />
        )
}

export default memo(TrackList)