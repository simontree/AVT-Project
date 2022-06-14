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

    const changeMidi = (num, radioID) => {
        props.testChannelModification(num, radioID);
    }
    const handleDestroyChannel = (element) => {
        props.handleDestroyChannel(element);
    }
    const mapChannels = () => {
        if(channels.length > 0){
            //console.log(channels)
            channelsContent = channels.map((channel) =>(
                <Channel
                 id={channel.id}
                 selectedMidi={channel.selectedMidi}
                 volume={channel.volume}
                 rate={channel.rate}
                 isEnabled={channel.isEnabled}
                 isPlaying={channel.isPlaying}
                 audioURL={channel.audioURL}
                 requestNumberOfChannels={props.requestNumberOfChannels}
                 requestRadioButtons={props.requestRadioButtons}
                 backgroundColor={channel.color}
                 changeMidi={changeMidi}
                 destroyChannel={handleDestroyChannel}
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