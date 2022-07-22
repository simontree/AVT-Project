import React, { useEffect } from "react";
import Card from "../UI/Card";
import Channel from "./Channel";
import {Grid} from '@mui/material'

const Channels = (props) =>{

    var channels = props.channels;
    useEffect(()=>{
        channels = props.channels;
        mapChannels();
    },[props.channels])
    let channelsContent = <p>No Channels started</p>;

    const changeMidiChannel = (num, radioID) => {
        props.handleMidiChannelOrganization(num, radioID);
    }
    const destroyChannel = (element) => {
        props.destroyChannel(element);
    }
    const mapChannels = () => {
        if(channels.length > 0){
            channelsContent = channels.map((channel) =>(
                <Grid item>
                <Channel
                    key={channel.id}
                    id={channel.id}
                    channelName={channel.name}
                    selectedMidi={channel.selectedMidi}
                    volume={channel.volume}
                    rate={channel.rate}
                    isEnabled={channel.isEnabled}
                    isPlaying={channel.masterPlayisPlaying}
                    audioURL={channel.audioURL}
                    backgroundColor={channel.color}
                    changeMidiChannel={changeMidiChannel}
                    destroyChannel={destroyChannel}
                    audioType = {channel.audioType}
                    masterRate = {props.masterRate}
                    masterPlay = {props.masterPlay}
                    />
                </Grid>
            ))
        }
    }
    mapChannels();

    return(
        <Grid container direction='row' id="channelsContainer" className="channels" >
        {channelsContent}
        </Grid>
    )
}

export default Channels;