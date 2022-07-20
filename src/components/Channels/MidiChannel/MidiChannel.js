import { useEffect, useState } from "react";

function MidiChannel(props){
    const [id, setID] = useState(props.id)
    const [midiValues, setMidiValues] = useState(props.midiValues[props.channelID]);

    useEffect(() =>{
        props.handleVolumeChange(props.midiValues[props.channelID].volume)
        console.log("midi values changed");
    }, [props.midiChanged])
}

export default MidiChannel;