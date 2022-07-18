import React, { useContext, useEffect, memo } from 'react'
import classNames from 'classnames'
import { Context } from '../hooks/useNoteContext'

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
        e.target.classList.toggle('on')
        toggleNote({trackID, clipID})
        play()
    }

    return (
        <div
            className={noteClassNames}
            onClick={noteClicked}
        />
    )
}

export default memo(Note)
