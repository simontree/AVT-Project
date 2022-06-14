import React from "react";

const NewChannel = (props) =>{

    const createNewChannel = () =>{
        var channelData = 
        {   id: props.nextAvailableID,
            selectedMidi: props.defaultMidi,
            volume: props.defaultVolume,
            rate: props.defaultRate,
            isEnabled: props.defaultState,
            isPlaying: props.defaultIsPlaying,
            audioURL: props.defaultAudioUrl,
            color: props.color()
        }
        props.addChannelHandler(channelData);
        props.setNextID(prev => prev + 1)
    }


    return(
        <div>
            <button onClick={createNewChannel}>Add Channel</button>
        </div>
    )
}

export default NewChannel;