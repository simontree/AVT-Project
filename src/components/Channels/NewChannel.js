import React, { useState } from "react";
import DragAndDrop from "../dragAndDrop/DragAndDrop";

const NewChannel = (props) =>{

    const [channelCount, setChannelCount] = useState(0)

    const createNewChannel = (source, type) =>{
       
        var channelData = 
        {   id: props.nextID,
            selectedMidi: props.defaultMidi,
            volume: props.defaultVolume,
            rate: props.defaultRate,
            isEnabled: props.defaultState,
            isPlaying: props.defaultIsPlaying,
            audioURL: source == null ? props.defaultAudioUrl : source,
            audioType: type==null ? props.defaultAudioType : type,
            color: props.defineRandomColor()
        }
        props.addChannelHandler(channelData);
        props.setNextID(prev => prev + 1)
        setChannelCount(channelCount+1)
        console.log("channelCount: "+channelCount)
    }
    return(
        (channelCount < 4 ) ?
            <DragAndDrop createNewChannel={createNewChannel} />
            : <></>
    )
}

export default NewChannel;