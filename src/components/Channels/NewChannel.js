import React, { useState } from "react";
import DragAndDrop from "../dragAndDrop/DragAndDrop";

const NewChannel = (props) =>{

    // const [channelCount, setChannelCount] = useState(0)
    const createNewChannel = (source, type, name) =>{
        var channelData = 
        {   id: props.nextID,
            selectedMidi: props.defaultMidi,
            volume: props.defaultVolume,
            rate: props.defaultRate,
            isEnabled: props.defaultState,
            isPlaying: props.defaultIsPlaying,
            audioURL: source == null ? props.defaultAudioUrl : source,
            audioType: type==null ? props.defaultAudioType : type,
            color: props.defineRandomColor(),
            name: name
        }
        props.addChannelHandler(channelData);
        props.setNextID(prev => prev + 1)
        props.setChannelCount(props.channelCount+1)
    }
    return(
        (props.channelCount < 4 ) ?
            <DragAndDrop createNewChannel={createNewChannel} />
            : <></>
    )
}

export default NewChannel;