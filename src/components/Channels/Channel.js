import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";
import { masterOutputNode, masterRate } from "../Master/Master";
import MidiChannel from "./MidiChannel/MidiChannel";

var mediaElementSource = [];

function Channel(props) {
  const [channelID] = useState(props.id);
  const [isChannelEnabled, setIsEnabled] = useState(props.isEnabled);
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [audioPlayerID, setAudioPlayerID] = useState("base");
  const [audioSourceURL, setAudioSourceURL] = useState(props.audioURL);
  const [type, setType] = useState(props.audioType);
  const [volume, setVolume] = useState(props.volume);
  const [rate, setRate] = useState(props.rate);
  const [color, setColor] = useState(props.backgroundColor);
  const [playBtnTxt, setplayBtnTxt] = useState("Play");
  const [filterHighGain, setFilterHighGain] = useState(0);
  const [filterLowGain, setFilterLowGain] = useState(0);
  const [filterBandGain, setFilterBandGain] = useState(0);

  var audioPlayer;
  var outputNode = audioContext.createGain();

  //Create highpass filter and its gain node
  const highpassFilter = createFilter(audioContext, 'highpass', 8000);
  const highpassGain = audioContext.createGain();
  const [highpassSet, setHighpassSet] = useState(false);
  //Create lowpass filter and its gain node
  const lowpassFilter = createFilter(audioContext, 'lowpass', 150);
  const lowpassGain = audioContext.createGain();
  const [lowpassSet, setLowpassSet] = useState(false);
  //Create bandpass filter and its gain node
  const bandpassFilter = createFilter(audioContext, 'bandpass', 400);
  const bandpassGain = audioContext.createGain();
  const [bandpassSet, setbandpassSet] = useState(false);

  function createFilter(audioContext, filterType, filterFrequency){
    const filter = audioContext.createBiquadFilter();

    filter.type = filterType;
    filter.frequency.value = filterFrequency;
    
    return filter
  }

  //Initialization
  useEffect(() => {
    setAudioPlayerID("audio" + channelID);
    outputNode.gain.value=0.35;
    outputNode.connect(masterOutputNode);
    audioPlayer = document.querySelector("#" + audioPlayerID);
    mediaElementSource[channelID] = audioContext.createMediaElementSource(audioPlayer);
    mediaElementSource[channelID].connect(outputNode);
    audioPlayer.volume = 5 / 100;
    setColor(props.backgroundColor);
  }, []);

  useEffect(() => {
    setAudioPlayerID("audio" + channelID);
    audioPlayer = document.getElementById(audioPlayerID);
  });

  const playAudio = () => {
    if (!isChannelEnabled) return;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    audioPlayer.play();
    setIsPlaying(true);
    setplayBtnTxt("Pause");
  };

  const pauseAudio = () => {
    audioPlayer.pause();
    setIsPlaying(false);
    setplayBtnTxt("Play");
  };

  const playPauseClicked = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  useEffect(()=>{
    props.masterPlay ? playAudio() : pauseAudio();
  },[props.masterPlay])

  const channelStateChange = (event) => {
    const isSliderOn = event.target.checked;
    setIsEnabled(() => {
      if (!isSliderOn) {
        pauseAudio();
      }
      return isSliderOn;
    });
  };

  const destroyChannel = () => {
    pauseAudio();
    props.destroyChannel(document.getElementById(channelID));
  };

  const volSliderChange = (event) => {
    handleVolumeChange(event)
  };

  const handleVolumeChange = (event) =>{
    setVolume(() => {
      const updatedVolume = event.target.value;
      audioPlayer.volume = updatedVolume / 100;
      return updatedVolume;
    });
  }
  const handleVolumeChangeFromMidi = (value) =>{
    setVolume(() => {
      const updatedVolume = Math.ceil(value);
      audioPlayer.volume = updatedVolume / 100;
      return updatedVolume;
    });
  }

  const rateSliderChange = (event) => {
    const updatedRate = event.target.value;
    handleRateChange(updatedRate)
  };

  const handleRateChange = (value) => {
    setRate(() => {
      const updatedRate = value == undefined ? 1 : value;
      const realRate = value * Math.ceil(props.masterRate*10)/10;
      console.log(realRate)
      audioPlayer.playbackRate = updatedRate * props.masterRate;
      return updatedRate;
    });
  }

  useEffect(()=>{
    handleRateChange(rate);
  },[props.masterRate])


  //Disconnect output node if a filter is activated
  function toggleOutputConnection () {
    if (!highpassSet || !lowpassSet || !bandpassSet) {
      outputNode.connect(masterOutputNode);
    } else {
      outputNode.disconnect();
    }
  }
  const highpassFilterInput = (e) => {    
    setFilterHighGain(() =>{
      var updatedGain = e.target.value;
      highpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(document.getElementById("highpass checkbox" + channelID).checked, "highpass");
  };
  const lowpassFilterInput = (e) => {    
    setFilterLowGain(() =>{
      var updatedGain = e.target.value;
      lowpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(document.getElementById("lowpass checkbox" + channelID).checked, "lowpass");
  };
  const bandpassFilterInput = (e) => {    
    setFilterBandGain(() =>{
      var updatedGain = e.target.value;
      bandpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(document.getElementById("bandpass checkbox" + channelID).checked, "bandpass");
  };


  //Manage filters, when a filter checkbox is clicked
  const filterClick = (e) => {
    var id = e.target.id;
    var filterType = id.split(" ");
    console.log(filterType[0]);
    filterCheck(e.currentTarget.checked, filterType[0]);
  };

  //Connect filters as needed when called
  const filterCheck = (isOn, filterType) =>{
    var highSet;
    var lowSet;
    var bandSet;
    switch(filterType){
      case "highpass":
        setHighpassSet(isOn);
        highSet = isOn;
        lowSet = lowpassSet;
        bandSet = bandpassSet;
        break;
      case "lowpass":
        setLowpassSet(isOn);
        highSet = highpassSet;
        lowSet = isOn;
        bandSet = bandpassSet;
        break;
      case "bandpass":
        setbandpassSet(isOn);
        highSet = highpassSet;
        lowSet = lowpassSet;
        bandSet = isOn;
        break;
    }
    mediaElementSource[channelID].disconnect();

      if (highSet) {
        console.log("highpass on")
        highpassGain.gain.value = filterHighGain;
        highpassGain.connect(outputNode);
        highpassFilter.connect(highpassGain);
        mediaElementSource[channelID].connect(highpassFilter);
        highpassGain.connect(masterOutputNode);
      } else {
        console.log("highpass off")
        highpassGain.disconnect();
        highpassFilter.disconnect();
      }

      if (lowSet) {
        console.log("lowpass on")
        lowpassGain.gain.value = filterLowGain;
        lowpassGain.connect(outputNode);
        lowpassFilter.connect(lowpassGain);
        mediaElementSource[channelID].connect(lowpassFilter);
        lowpassGain.connect(masterOutputNode);
      } else {
        console.log("lowpass off")
        lowpassGain.disconnect();
        lowpassFilter.disconnect();
      }


      if (bandSet) {
        console.log("bandpass on")
        bandpassGain.gain.value = filterBandGain;
        bandpassGain.connect(outputNode);
        bandpassFilter.connect(bandpassGain);
        mediaElementSource[channelID].connect(bandpassFilter);
        bandpassGain.connect(masterOutputNode);
      } else {
        console.log("bandpass off")
        bandpassGain.disconnect();
        bandpassFilter.disconnect();
      }



    if(!highSet&&!lowSet&&!bandSet){
      console.log("all off")
      mediaElementSource[channelID].connect(outputNode);
    }
    toggleOutputConnection();
  }


  return (
    <div
      className="channel"
      id={channelID}
      style={{ backgroundColor: `${color}` }}
    >
      <MidiChannel
        midiValues={props.midiValues}
        midiChanged = {props.midiChanged}
        handleVolumeChange={handleVolumeChangeFromMidi}
        handleRateChange={handleRateChange}
        handleTogglePlay={playPauseClicked}
        channelID={channelID}
      />
      <audio
        id={audioPlayerID}
        className="channelAudio"
        controls={true}
        autoPlay={false}
        onEnded={pauseAudio}
      >
        <source type={type} src={audioSourceURL} />
      </audio>
      <div className="channelTop">
        <div className="switchContainer">
          <label className="switch">
            <input
              type="checkbox"
              onChange={channelStateChange}
              checked={isChannelEnabled}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="fileTitle">
          <label>{"Placeholder" + channelID}</label>
        </div>

        <div className="channelContext">
          <button value={"..."} onClick={destroyChannel}>
            X
          </button>
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
            step="0.1"
            onChange={rateSliderChange}
            onMouseUp={rateSliderChange}
            className="sSlider"
            id="sRange"
            value={props.rate}
          ></input>
        </div>
        <div className="speedValue">
          <label>{rate}</label>
        </div>
      </div>

      <hr className="breakLine"></hr>

      <div className="filterSection">
        <label className="filterTitle">Filters (*￣3￣)╭</label>
      </div>
      <div id={"filtercontainer" + channelID}>
        <input
          className="ml-6 focus: ring-red-0/0"
          id={"highpass checkbox" + channelID}
          type="checkbox"
          onChange={filterClick}
        />
        <label className="font-bold" htmlFor="highpass">
          Highpass Filter
        </label>
        <br></br>
        <input
          className="mt-0.5 ml-11"
          id={"highpass" + channelID}
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={filterHighGain}
          onInput={highpassFilterInput}
        />
        <br></br>
        <input
          className="ml-6 focus: ring-red-0/0"
          id={"lowpass checkbox" + channelID}
          type="checkbox"
          onChange={filterClick}
        />
        <label className="font-bold" htmlFor="lowpass">
          Lowpass Filter
        </label>
        <br></br>
        <input
          className="mt-0.5 ml-11"
          id={"lowpass" + channelID}
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={filterLowGain}
          onInput={lowpassFilterInput}
        />
        <br></br>

        <input
          className="ml-6 focus: ring-red-0/0"
          id={"bandpass checkbox" + channelID}
          type="checkbox"
          onChange={filterClick}
        />
        <label className="font-bold" htmlFor="bandpass">
          bandpass Filter
        </label>
        <br></br>
        <input
          className="mt-0.5 ml-11"
          id={"bandpass" + channelID}
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={filterBandGain}
          onInput={bandpassFilterInput}
        />
      </div>
    </div>
  );
}
export default Channel;
