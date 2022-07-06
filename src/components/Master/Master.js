import "../Channels/ChannelCss/Channel.css";
import "../Channels/ChannelCss/Switch.css";
import "../Channels/ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";

export var masterOutputNode;
function Master(props) {
  const [channelID] = useState(props.id);
  const [volume, setVolume] = useState(props.volume);
  const [color, setColor] = useState(props.backgroundColor);

  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [rate, setRate] = useState(props.rate);

  useEffect(() => {
    
    masterOutputNode = audioContext.createGain();
    masterOutputNode.gain.value=0.35;
    masterOutputNode.connect(primaryGainControl);
    setColor(props.backgroundColor);
  }, []);

  const playPauseClicked = () =>{
    console.log("hi");
  }
  const playBtnTxt = () =>{
    console.log("hi");
  }
  const volSliderChange = (event) => {
    setVolume(() => {
      const updatedVolume = event.target.value;
      masterOutputNode.gain.value = updatedVolume/100;
      return updatedVolume;
    });
  };
  const speedSliderChange = () =>{
    console.log("hi");
  }


  return (
    <div
      className="channel"
      id={channelID}
      style={{ backgroundColor: `${color}` }}>
      <div className="channelPlay">
        <button className="playButton" onClick={playPauseClicked}>
          {"Button"}
        </button>
      </div>
      <div className="volumeControl">
        <div className="volIcon">
          <label>Vol</label>
        </div>
        <div className="volSlider">
          <input
            type={"range"}
            min="0"
            max="100"
            onChange={volSliderChange}
            className="vSlider"
            id="olRange"
            value={volume}
          ></input>
        </div>
        <div className="volValue">
          <label>{volume}</label>
        </div>
      </div>

      <div className="speedControl">
        <div className="speedIcon">
          <label>Sp</label>
        </div>
        <div className="speedSlider">
          <input
            type={"range"}
            min="0"
            max="3"
            step="0.25"
            onChange={speedSliderChange}
            onMouseUp={speedSliderChange}
            className="sSlider"
            id="masterRange"
            value={rate}
          ></input>
        </div>
        <div className="speedValue">
          <label>{rate}</label>
        </div>
      </div>


    </div>
  );
}
export default Master;
