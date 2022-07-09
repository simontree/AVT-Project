import React, { useEffect, memo } from 'react'
import classNames from 'classnames'

const Note = ({
    stepID,
    play
}) => {

    const noteClassNames = classNames('note')

    useEffect(() => {
            play()
    }, [play])

    const noteClicked = e => {
        e.target.classList.toggle('on')
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
