import React, { useEffect } from "react";
import Card from "../UI/Card";
import Channel from "./Channel";

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
    const handleDestroyChannel = (element) => {
        props.handleDestroyChannel(element);
    }
    const mapChannels = () => {
        if(channels.length > 0){
            channelsContent = channels.map((channel) =>(
                <Channel
                 id={channel.id}
                 selectedMidi={channel.selectedMidi}
                 volume={channel.volume}
                 rate={channel.rate}
                 isEnabled={channel.isEnabled}
                 isPlaying={channel.isPlaying}
                 audioURL={channel.audioURL}
                 backgroundColor={channel.color}
                 changeMidiChannel={changeMidiChannel}
                 destroyChannel={handleDestroyChannel}
                 audioType = {channel.audioType}
                 masterRate = {props.masterRate}
                 masterPlay = {props.masterPlay}
                />
            ))
        }
    }
    mapChannels();



    return(
        <div id="channelsContainer">
            <Card className="channels" >
            {channelsContent}
            </Card>
        </div>
    )
}

export default Channels;