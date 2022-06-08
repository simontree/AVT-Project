import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../App";

const Channel = () => {
  const [volume, setVolume] = useState(80);
  const channelGain = audioContext.createGain();
  channelGain.gain.setValueAtTime(0.8, 0);
  channelGain.connect(primaryGainControl);

  //Global variables
  var startTime = 0;
  var offsetToResume = 0;
  var pauseTime = 0;
  var isPlaying = false;
  var rate = 1;
  var isPlaying = false;
  let src = process.env.PUBLIC_URL + "Audios/sample4.mp3"
  let source;

  
  const playAudio = () => {
    const audioPlayer = document.querySelector("audio.channel1");
    source = audioContext.createMediaElementSource(audioPlayer);
    source.connect(channelGain);
    console.log(source);
    audioPlayer.play();
    isPlaying = true;
  };
  const pauseAudio = () => {
    source.disconnect();
    const audioPlayer = document.querySelector("audio.channel1");
    audioPlayer.pause();
    isPlaying = false;
  };

  const channelStateChange = (event) => {
    console.log(event.target.checked);
  };

  const contextClicked = () => {
    console.log("Channel audioContext clicked.");
  };

  const playPauseClicked = async () => {
    if(isPlaying){
      pauseAudio();
    }else{
      playAudio();
    }
    console.log("Channel PlayPause clicked. " + isPlaying);
  };

  const volSliderChange = (event) => {
    const value = event.target.value;
    setVolume(value);
    primaryGainControl.gain.setValueAtTime(
      volume / 100,
      audioContext.currentTime
    );
    console.log(value);
  };

  const speedSliderChange = (event) => {
    const value = event.target.value;
    console.log(source.mediaElement.playbackRate)
    source.mediaElement.playbackRate = value;
    document.querySelector(".speedValue label").textContent = value;
  };

  const midiChannelChange = (event) => {
    console.log(event.target.value);
  };

  const addFilterEvent = (event) => {
    console.log("Channel add filter clicked.");
  };
//USE AUDIO TAG INSTEAD OF ONLY  CONTEXT STUFF
  return (
    <div className="channel2">
      <audio
      className="channel1"
      controls={true}
      autoPlay={false}
      >
        <source type="audio/mp3" src = {src} />  
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
          Play
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
            className="sSlider"
            id="sRange"
          ></input>
        </div>
        <div className="speedValue">
          <label>5</label>
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
