import React, { useEffect } from "react";
import Card from "../UI/Card";
import Channel from "./Channel";
import {Grid} from '@mui/material'

const Channels = (props) =>{

    var channels = props.channels;
    useEffect(()=>{
        channels = props.channels;
        mapChannels2();
    },[props.channels])
    let channelsContent = [];

    const destroyChannel = (element) => {
        props.destroyChannel(element);
    }

    const mapChannels2 = () =>{
        if(channels.length > 0) {
            for(var i = 0; i < channels.length; i++){
                channelsContent[i] = <Channel
                    key={props.channels[i].id}
                    id={props.channels[i].id}
                    channelName={props.channels[i].name}
                    selectedMidi={props.channels[i].selectedMidi}
                    volume={props.channels[i].volume}
                    rate={props.channels[i].rate}
                    isEnabled={props.channels[i].isEnabled}
                    isPlaying={props.channels[i].isPlaying}
                    audioURL={props.channels[i].audioURL}
                    backgroundColor={props.channels[i].color}
                    destroyChannel={destroyChannel}
                    audioType = {props.channels[i].audioType}
                    masterRate = {props.masterRate}
                    masterPlay = {props.masterPlay}
                    masterVolume = {props.masterVolume}
                    midiValues = {props.midiValues}
                    midiChanged = {props.midiChanged}
                    setChannelsChanged = {props.setChannelsChanged}
                />
            }
        }
    }
    mapChannels2();

    return(
        <Grid container direction='row' id="channelsContainer" className="channels" >
        {channelsContent}
        </Grid>
    )
}

export default Channels;