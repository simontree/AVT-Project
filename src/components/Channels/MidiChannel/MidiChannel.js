import { useEffect, useState } from "react";

function MidiChannel(props){
    const [id, setID] = useState(props.id)
    const [midiValues, setMidiValues] = useState(props.midiValues[props.channelID]);
    const [oldPlayState, setOldPlayState] = useState(false);
    const [first, setFirst] = useState(true);

    useEffect(() =>{
        props.handleVolumeChange(props.midiValues[props.channelID].volume)
        props.handleRateChange(props.midiValues[props.channelID].rate)
        togglePlay();
        if(!first)
        {
            props.handleHighpassInput(props.midiValues[props.channelID].highFilter)
            props.handleLowpassInput(props.midiValues[props.channelID].lowFilter)
            props.handleBandpassInput(props.midiValues[props.channelID].bandFilter)
        }
        setFirst(false);
        //console.log("midi values changed");
    }, [props.midiChanged])

    
    const togglePlay = () => {
        if(props.midiValues[props.channelID].play != oldPlayState){
            props.handleTogglePlay();
            setOldPlayState((old) => !old)
        }
    }
}

export default MidiChannel;