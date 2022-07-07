import "../Channels/ChannelCss/Channel.css";
import "../Channels/ChannelCss/Switch.css";
import "../Channels/ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";

export var masterOutputNode;
export var masterRate = 1;
function Master(props) {
  const [channelID] = useState(props.id);
  const [volume, setVolume] = useState(props.volume);
  const [color, setColor] = useState(props.backgroundColor);

  const [allPlaying, setAllPlaying] = useState(false);
  const [buttonTxt, setButtonTxt] = useState("All Play")
  useEffect(() => {
    
    masterOutputNode = audioContext.createGain();
    masterOutputNode.gain.value=0.35;
    masterOutputNode.connect(primaryGainControl);
    setColor(props.backgroundColor);
  }, []);

  const playPauseClicked = () =>{
    props.masterPlayPause();
    playBtnTxt();
  }
  const playBtnTxt = () =>{
    setButtonTxt((old)=>{
      var updated = old == "All Pause" ? "All Play" : "All Pause";
      return updated;
    })
  }
  const volSliderChange = (event) => {
    setVolume(() => {
      const updatedVolume = event.target.value;
      masterOutputNode.gain.value = updatedVolume/100;
      return updatedVolume;
    });
  };
  const speedSliderChange = (event) =>{
    const updatedRate = event.target.value;
    props.updateMasterRate(updatedRate);
  }


  return (
    <div
      className="channel"
      id={channelID}
      style={{ backgroundColor: `${color}` }}>
      <div className="channelPlay">
        <button className="playButton" onClick={playPauseClicked}>
          {buttonTxt}
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
            value={props.masterRate}
          ></input>
        </div>
        <div className="speedValue">
          <label>{props.masterRate}</label>
        </div>
      </div>


    </div>
  );
}
export default Master;
