import React from "react";
import DragAndDrop from "../dragAndDrop/DragAndDrop";

const NewChannel = (props) =>{

    const createNewChannel = (source) =>{
        console.log(source);
        var channelData = 
        {   id: props.nextAvailableID,
            selectedMidi: props.defaultMidi,
            volume: props.defaultVolume,
            rate: props.defaultRate,
            isEnabled: props.defaultState,
            isPlaying: props.defaultIsPlaying,
            audioURL: source == null ? props.defaultAudioUrl : source,
            audioType: props.defaultAudioType,
            color: props.color()
        }
        props.addChannelHandler(channelData);
        props.setNextID(prev => prev + 1)
    }


    return(
        <div>
            <DragAndDrop createNewChannel={createNewChannel} />
        </div>
    )
}

export default NewChannel;