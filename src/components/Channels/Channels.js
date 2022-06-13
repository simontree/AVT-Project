import React from "react";
import Card from "../UI/Card";
import Channel from "./Channel";

const Channels = (props) =>{

    const channels = props.channels;
    let channelsContent = <p>No Channels started</p>;

    const changeMidi = (num, radioID) => {
        //move up, change remap
        props.testChannelModification(num, radioID);
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
                 requestNumberOfChannels={props.requestNumberOfChannels}
                 requestRadioButtons={props.requestRadioButtons}
                 changeMidi={changeMidi}
                />
            ))
        }
    }
    mapChannels();



    return(
        <div>
            <Card className="channels">
            {channelsContent}
            </Card>
        </div>
    )
}

export default Channels;