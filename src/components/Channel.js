import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState} from "react";
import { audioContext, primaryGainControl } from "../index";

function Channel(){
  const channelID = "0"
  const [volume, setVolume] = useState(50);

  var [isEnabled, setIsEnabled] = useState(false);

  var [isPlaying, setIsPlaying] = useState(false);
  var [rate, setRate] = useState(1);
  var [src, setSrc] = useState(process.env.PUBLIC_URL + "Audios/sample4.mp3");
  var mediaElementSource;
  var audioPlayer;

  var [playBtnTxt, setplayBtnTxt] = useState("Play");

  useEffect(()=>{
    audioPlayer = document.querySelector("audio.channel1");
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
  })

  const playAudio = () => {
    console.log(isEnabled)
    if(!isEnabled) return;
    mediaElementSource.connect(primaryGainControl);
    audioPlayer.play();
    setIsPlaying(true);
    setplayBtnTxt("Pause");
  };
  const pauseAudio = () => {
    mediaElementSource.disconnect();
    audioPlayer.pause();
    setIsPlaying(false);
    setplayBtnTxt("Play");
  };
  const playPauseClicked = () => {
    isPlaying ? pauseAudio() : playAudio();
  };
  
  const channelStateChange = (event) => {
    const state = event.target.checked;
    setIsEnabled(()=>{
      if(!state){
        pauseAudio();
        //Remove from midi
        //Block Buttons and sliders?
      }
      return state;
    });
  };

  const contextClicked = () => {
    console.log("Channel audioContext clicked.");
  };



  const volSliderChange = (event) => {
    setVolume(() => {
      const updatedVolume = event.target.value
      audioPlayer.volume = updatedVolume/100;
      return updatedVolume});
  };

  const speedSliderChange = (event) => {
    setRate(() => {
      const updatedRate = event.target.value;
      mediaElementSource.mediaElement.playbackRate = updatedRate;
      return updatedRate});
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
              step="1"
              onChange={speedSliderChange}
              onMouseUp={speedSliderChange}
              className="sSlider"
              id="sRange"
              value={rate}
            ></input>
          </div>
          <div className="speedValue">
            <label>{rate}</label>
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
