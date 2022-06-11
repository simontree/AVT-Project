import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState} from "react";
import { audioContext, primaryGainControl } from "../App";

function Channel(){
  const channelID = "0"
  const channelGain = audioContext.createGain();
  channelGain.gain.setValueAtTime(0.9, 0);
  channelGain.connect(primaryGainControl);
  const [volume, setVolume] = useState(80);

  var [isPlaying, setIsPlaying] = useState(false);
  var [rate, setRate] = useState(1);
  var [src, setSrc] = useState(process.env.PUBLIC_URL + "Audios/sample4.mp3");
  var mediaElementSource;
  var audioPlayer;

  var [playBtnTxt, setplayBtnTxt] = useState("Play");
  var [rateTxt, setRateTxt] = useState("1");
  var [volumeTxt, setVolumeText] = useState("50");

  useEffect(()=>{
    audioPlayer = document.querySelector("audio.channel1");
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
  })

  const playAudio = () => {
    mediaElementSource.connect(channelGain);
    audioPlayer.play();
    setIsPlaying(true);
  };
  const pauseAudio = () => {
    mediaElementSource.disconnect();
    audioPlayer.pause();
    setIsPlaying(false);
  };
  const playPauseClicked = () => {
    isPlaying ? pauseAudio() : playAudio();
    setplayBtnTxt((prevText)=>{return isPlaying ? "Play" : "Pause"});
  };
  
  const channelStateChange = (event) => {
    console.log(event.target.checked);
  };

  const contextClicked = () => {
    console.log("Channel audioContext clicked.");
  };



  const volSliderChange = (event) => {
    setVolume(() => {
      const updatedVolume = event.target.value
      audioPlayer.volume = updatedVolume/100;
      return updatedVolume});
    setVolumeText(event.target.value.toString());
  };

  const speedSliderChange = (event) => {
    setRate(() => {
      const updatedRate = event.target.value;
      mediaElementSource.mediaElement.playbackRate = updatedRate;
      return updatedRate});
    setRateTxt(()=>rate.toString());
  };

  const midiChannelChange = (event) => {
    console.log(event.target.value);
  };

  const addFilterEvent = (event) => {
    console.log("Channel add filter clicked.");
  };
  //USE AUDIO TAG INSTEAD OF ONLY  CONTEXT STUFF
    return (
      
      <div className="channel">
        <audio className="channel1" controls={true} autoPlay={false}>
          <source type="audio/mp3" src={src} />
        </audio>
        <div className="channelTop">
          <div className="switchContainer">
            <label className="switch">
              <input type="checkbox" onClick={channelStateChange} />
              <span className="slider round"></span>
            </label>
          </div>
  
          <div className="fileTitle">
            <label>Placeholder for varrewrweerw</label>
          </div>
  
          <div className="channelContext">
            <button onClick={contextClicked}>...</button>
          </div>
        </div>
  
        <div className="channelPlay">
          <button className="playButton" onClick={playPauseClicked}>
            {playBtnTxt}
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
              id="volRange"
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
              step="1"
              onChange={speedSliderChange}
              onMouseUp={speedSliderChange}
              className="sSlider"
              id="sRange"
            ></input>
          </div>
          <div className="speedValue">
            <label>{rateTxt}</label>
          </div>
        </div>
  
        <div className="midiChannelContainer">
          <div className="midiLabel">
            <label>Midi Channel</label>
          </div>
          <div className="midiChannels">
            <input
              type="radio"
              id="m1"
              name="midiChannel"
              value="1"
              onChange={midiChannelChange}
            />
            <label htmlFor="m1">1</label>
            <input
              type="radio"
              id="m2"
              name="midiChannel"
              value="2"
              onChange={midiChannelChange}
            />
            <label htmlFor="m2">2</label>
            <input
              type="radio"
              id="m3"
              name="midiChannel"
              value="3"
              onChange={midiChannelChange}
            />
            <label htmlFor="m3">3</label>
            <input
              type="radio"
              id="m4"
              name="midiChannel"
              value="4"
              onChange={midiChannelChange}
            />
            <label htmlFor="m4">4</label>
          </div>
        </div>
  
        <hr className="breakLine"></hr>
  
        <div className="filterSection">
          <label className="filterTitle">Filters</label>
        </div>
        <div className="activeFilters">
          <div className="filter">
            <label value={"Name"}>Name</label>
          </div>
        </div>
        <div>
          <button
            className="addFilterButton"
            value={"Add Filter"}
            onClick={addFilterEvent}
          >
            Add Filter
          </button>
        </div>
      </div>
    );
};
export default Channel;
