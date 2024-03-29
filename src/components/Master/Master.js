import "../Channels/ChannelCss/Channel.css";
import "../Channels/ChannelCss/Switch.css";
import "../Channels/ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";
import { Box, Button, Container, Slider, Typography} from '@mui/material'

export var masterOutputNode;
export var masterRate = 1;

function Master(props) {
  const [channelID] = useState(props.id);
  const [buttonTxt, setButtonTxt] = useState("Play all");
  const [initStateChangePrevented, setinitStateChangePrevented] = useState(false)

  //Initialization
  useEffect(() => {
    masterOutputNode = audioContext.createGain();
    masterOutputNode.gain.value=0.35;
    masterOutputNode.connect(primaryGainControl);
  }, []);
  //Midi Play Pause pressed
  useEffect(() => {
    if (initStateChangePrevented) {
      playPauseClicked();
    } else {
      setinitStateChangePrevented(true)
    }
  }, [props.masterPlayMidi]);

  const playPauseClicked = () =>{
    props.masterPlayPause();
  };

  useEffect(() => {
    playBtnTxt();
  }, [props.masterPlay])

  const playBtnTxt = () => {
    setButtonTxt(() => {
      if (props.masterPlay) {
        return "Pause all"
      } else {
        return "Play all"
      }
    });
  };

  const volSliderChange = (event) => {
    const updatedVolume = event.target.value;
    masterOutputNode.gain.value = updatedVolume / 100;
    console.log("master volume changed")
    props.updateMasterVolume(updatedVolume);
  };

  const speedSliderChange = (e) => {
    props.updateMasterRate(e.target.value)
  }

  useEffect(()=>{
    document.getElementById("masterRateSlider").value=props.masterRate;
  },[props.masterRate])


  return (
    <Container
    id={channelID}
    sx={{
      backgroundColor: 'rgb(2, 40, 79)',
      width: '300px',
      padding: '20px',
      borderRadius: '20px',
      border: 'solid 1px #3f6d91'
    }}>
      <Box width={250} sx={{textAlign: 'center'}}>
        <Button 
        variant="contained"
        onClick={playPauseClicked}>  
          {buttonTxt}
        </Button>
      </Box>
      <Box width={250} sx={{marginTop: '20px'}}>
        <Typography gutterBottom>Master-Volume</Typography>
        <Slider
        min={0}
        max={100}
        value={props.masterVolume}
        id="vSlider"
        onChange={volSliderChange}
        valueLabelDisplay="auto"
        />
      </Box>
      <Box width={250}>
        <Typography gutterBottom>Master-Tempo</Typography>
        <Slider
        // defaultValue={1.0}
        min={0}
        max={3}
        step={0.1}
        value={props.masterRate}
        id="masterRateSlider"
        onChange={speedSliderChange}
        valueLabelDisplay="auto"
        />
      </Box>
    </Container>
  );
}
export default Master;
