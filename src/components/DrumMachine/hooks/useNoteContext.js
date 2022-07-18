import React, { useReducer, createContext } from 'react'
import { audioClips } from '../audioClips'

const Context = createContext({
    clips: {},
    toggleNote: () => {}
})

const appReducer = (state, action) => {
    switch (action.type) {
        case 'setNotes':
            let newClipList = state.clipList.map((track, clipID) => {
                if (action.clipID === clipID) {
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
    const [clips, dispatch] = useReducer(appReducer, { ...audioClips[1] }) 
    const toggleNote = ({ clipID, stepID }) => {
        let newEnabledNotes
        const enabledNotes = clips.clipList[clipID].enabledNotes  
        // index=-1 if note is turned off
        if (enabledNotes.indexOf(stepID) === -1) {      
            newEnabledNotes = [...enabledNotes, stepID]
        } else {
            newEnabledNotes = enabledNotes.filter(currentStep => currentStep !== stepID)
        }
        dispatch({    
            type: 'setNotes',
            value: newEnabledNotes,
            clipID
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
