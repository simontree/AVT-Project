import React from 'react'
import '../DrumMachine.css'

const ClipsHeader = ({ count = 0, currentClipID }) => {
    
    const isPlaying = (index) => {
        if(index === currentClipID){
            return true
        }else{
            return false
        }
    }

    let content = [...Array(count)]
    .map((el, i) => (<div className={isPlaying(i)? 'clip clip-playing': 'clip'} key={i + 1}><button/></div>))

    return (
        <div className='clips'>
            {content}
        </div>
    )
}

export default ClipsHeader