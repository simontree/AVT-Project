import React from 'react'
import '../DrumMachine.css'

const ClipsHeader = ({ count = 0, currentStepID }) => {
    
    const isPlaying = (index) => {
        if(index === currentStepID){
            return true
        }else{
            return false
        }
    }

    let content = [...Array(count)]
    .map((el, i) => (<div className={isPlaying(i)? 'step step-playing': 'step'} key={i + 1}><button/></div>))


    return (
        <div>
            {content}
        </div>
    )
}

export default ClipsHeader