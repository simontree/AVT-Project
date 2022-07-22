import React from "react";
import DragAndDrop from "../dragAndDrop/DragAndDrop";
import { Grid } from '@mui/material'

const NewChannel = (props) =>{

    const createNewChannel = (source, type) =>{
        //console.log(source + " " + type);
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
    }
    return(
        <Grid item>
            <DragAndDrop createNewChannel={createNewChannel} />
        </Grid>
    )
}

export default NewChannel;