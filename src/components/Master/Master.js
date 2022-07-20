import "../Channels/ChannelCss/Channel.css";
import "../Channels/ChannelCss/Switch.css";
import "../Channels/ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";
import { Box, Grid, Container, Slider, Typography} from '@mui/material'

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
    setVolume(() => {
      masterOutputNode.gain.value = updatedVolume / 100;
       return updatedVolume;
    });
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
    sx={{
      backgroundColor: 'rgb(2, 40, 79)',
      margin: '20px',
      width: '300px',
      padding: '20px',
      borderRadius: '20px',
      border: 'solid 1px #3f6d91'
    }}>
      <Box width={200}>
        <Slider
        value={Math.ceil(props.masterRate*10)/10}
        id="masterRateSlider"
        min="0"
        max="3"
        step="0.1"
        onChange={speedSliderChange}
        onMouseUp={speedSliderChange}
        >
        </Slider>
      </Box>
    </Container>

    // <div
    //   className="channel"
    //   id={channelID}
    //   style={{ backgroundColor: `${color}` }}
    // >
    //   <div className="channelPlay">
    //     <button className="playButton" onClick={playPauseClicked}>
    //       {buttonTxt}
    //     </button>
    //   </div>
    //   <div className="volumeControl">
    //     <div className="volIcon">
    //       <label>Vol</label>
    //     </div>
    //     <div className="volSlider">
    //       <input
    //         type={"range"}
    //         min="0"
    //         max="100"
    //         onChange={volSliderChange}
    //         className="vSlider"
    //         id="olRange"
    //         value={props.volume}
    //       ></input>
    //     </div>
    //     <div className="volValue">
    //       <label id="masterVolumeText">{volume}</label>
    //     </div>
    //   </div>

    //   <div className="speedControl">
    //     <div className="speedIcon">
    //       <label>Sp</label>
    //     </div>
        
    //     <div className="speedValue">
    //       <label id="masterSpeedValue">{Math.ceil(props.masterRate*10)/10}</label>
    //     </div>
    //   </div>
    // </div>
  );
}
export default Master;
