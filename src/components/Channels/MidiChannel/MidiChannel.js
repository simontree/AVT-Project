import { useEffect, useState } from "react";

function MidiChannel(props){
    const [oldPlayState, setOldPlayState] = useState(false);
    const [first, setFirst] = useState(true);

    //Update the values of the parent channel, when some midi control is changed.
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
    }, [props.midiChanged])

    const togglePlay = () => {
        if(props.midiValues[props.channelID].play !== oldPlayState){
            props.handleTogglePlay();
            setOldPlayState((old) => !old)
        }
    }
}

export default MidiChannel;