import React, { useEffect } from "react";
import Card from "../UI/Card";
import Channel from "./Channel";

const Channels = (props) =>{

    var channels = props.channels;
    useEffect(()=>{
        channels = props.channels;
        console.log("hi")
        mapChannels2();
    },[props.channels])
    let channelsContent = [];

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
    const mapChannels2 = () =>{
        if(channels.length > 0) {
            for(var i = 0; i < channels.length; i++){
                channelsContent[i] = <Channel
                    id={props.channels[i].id}
                    selectedMidi={props.channels[i].selectedMidi}
                    volume={props.channels[i].volume}
                    rate={props.channels[i].rate}
                    isEnabled={props.channels[i].isEnabled}
                    isPlaying={props.channels[i].isPlaying}
                    audioURL={props.channels[i].audioURL}
                    backgroundColor={props.channels[i].color}
                    changeMidiChannel={changeMidiChannel}
                    destroyChannel={handleDestroyChannel}
                    audioType = {props.channels[i].audioType}
                    masterRate = {props.masterRate}
                    masterPlay = {props.masterPlay}
                    midiValues = {props.midiValues}
                />
            }
        }
    }
    mapChannels2();



    return(
        <div id="channelsContainer">
            <Card className="channels" >
            {channelsContent}
            </Card>
        </div>
    )
}

export default Channels;