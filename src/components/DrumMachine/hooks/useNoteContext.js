import React, { useReducer, createContext } from 'react'
import { audioClips } from '../audioClips'

const Context = createContext({
    clips: {},
    toggleNote: () => {},
})

const appReducer = (state, action) => {
    switch (action.type) {
        case 'setNotes':
            let newClipList = state.clipList.map((track, trackID) => {
                if (action.trackID === trackID) {
                    return {
                        ...track,
                        enabledNotes: action.value
                    }
                } else {
                    return track
                }
            })
            return {
                ...state,
                clipList: newClipList
            }
        default:
            return state
    }
}

const Provider = ({ children }) => {
    const [clips, dispatch] = useReducer(appReducer, { ...audioClips[0] }) 

    const toggleNote = ({ trackID, clipID }) => {
        let newEnabledNotes
        const enabledNotes = clips.clipList[trackID].enabledNotes  
        // index=-1 if note is turned off
        if (enabledNotes.indexOf(clipID) === -1) {      
            newEnabledNotes = [...enabledNotes, clipID]
        } else {
            newEnabledNotes = enabledNotes.filter(currentStep => currentStep !== clipID)
        }
        dispatch({    
            type: 'setNotes',
            value: newEnabledNotes,
            trackID
        })
    }

    return (
        <Context.Provider value={{ clips, toggleNote }}>  
            {children}
        </Context.Provider>
    )
}

export {
    Provider,
    Context
}
