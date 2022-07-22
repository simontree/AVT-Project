import "../Channels/ChannelCss/Channel.css";
import "../Channels/ChannelCss/Switch.css";
import "../Channels/ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";
import { Box, Button, Grid, Container, Slider, Typography} from '@mui/material'

export var masterOutputNode;
export var masterRate = 1;
function Master(props) {
  const [channelID] = useState(props.id);
  const [volume, setVolume] = useState(props.volume);
  const [rate, setRate] = useState(props.masterRate)
  const [color, setColor] = useState(props.backgroundColor);
  const [allPlaying, setAllPlaying] = useState(false);
  const [buttonTxt, setButtonTxt] = useState("All Play");
  //Initialization
  useEffect(() => {
    masterOutputNode = audioContext.createGain();
    masterOutputNode.gain.value = 0.35;
    masterOutputNode.connect(primaryGainControl);
    setColor(props.backgroundColor);
    setButtonTxt("All Pause");
  }, []);
  //Midi Play Pause pressed
  useEffect(() => {
    playPauseClicked();
  }, [props.masterPlayMidi]);

  const playPauseClicked = () => {
    props.masterPlayPause();
    playBtnTxt();
  };

  const playBtnTxt = () => {
    var updated;
    setButtonTxt((old) => {
      updated = old == "All Pause" ? "All Play" : "All Pause";
       return updated;
    });
  };

  const volSliderChange = (event) => {
    const updatedVolume = event.target.value;
    // setVolume(() => {
      masterOutputNode.gain.value = updatedVolume / 100;
    //    return updatedVolume;
    // });
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
      margin: '20px',
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
      <Box width={250}>
        <Typography gutterBottom>Volume</Typography>
        <Slider
        min={0}
        max={100}
        value={props.volume}
        id="vSlider"
        onChange={volSliderChange}
        valueLabelDisplay="auto"
        >
        </Slider>
      </Box>
      <Box width={250}>
        <Typography gutterBottom>Speed</Typography>
        <Slider
        defaultValue={1}
        min={0}
        max={3}
        value={props.masterRate}
        id="masterRateSlider"
        onChange={speedSliderChange}
        valueLabelDisplay="auto"
        >
        </Slider>
      </Box>
    </Container>
  );
}
export default Master;
