import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState } from "react";
import { audioContext, primaryGainControl } from "../../App";
import { masterOutputNode, masterRate } from "../Master/Master";
import { element } from "prop-types";
import Filter from "./Filters/Filter";
import NewFilter from "./Filters/NewFilter";
import Filters from "./Filters/Filters";

const defaultFilterStrength = 0.05;
const defaultFilterType = "lowpass";
//Audio - (Filter-FilterGain)* - outputNode - PrimaryGain
var mediaElementSource = undefined;

function Channel(props) {
  const [channelID] = useState(props.id);
  const [audioPlayerID, setAudioPlayerID] = useState("base");
  const [volume, setVolume] = useState(props.volume);
  const [isEnabled, setIsEnabled] = useState(props.isEnabled);
  const [selectedMidi, setSelectedMidi] = useState(props.selectedMidi);
  const [color, setColor] = useState(props.backgroundColor);

  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [rate, setRate] = useState(props.rate);
  const [audioSourceURL, setAudioSourceURL] = useState(props.audioURL);
  const [type, setType] = useState(props.audioType);
  const [filterGain, setFilterGain] = useState(0);
  var thisMediaES;
  //if in public folder, use process.env.PUBLIC_URL +  first for URL
  var audioPlayer;
  var currentMidiChannel;

  var outputNode = audioContext.createGain();

  //Create lowpass filter and its gain node
  const lowpassFilter = createFilter(audioContext, 'highpass', 8000);
  const lowpassGain = audioContext.createGain();
  let lowpassSet = false;

  var [playBtnTxt, setplayBtnTxt] = useState("Play");

  var [filters, setFilters] = useState([]);
  const [nextFilterID, setNextFilterID] = useState(0);
  var biquadFilters = []

  function createFilter(audioContext, filterType, filterFrequency){
    const filter = audioContext.createBiquadFilter();

    filter.type = filterType;
    filter.frequency.value = filterFrequency;
    
    return filter
  }

  useEffect(() => {
    //console.log(audioSourceURL)
    setAudioPlayerID("audio" + channelID);
    outputNode.gain.value=0.35;
    outputNode.connect(masterOutputNode);
    audioPlayer = document.querySelector("#" + audioPlayerID);
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
    /*console.log("MediaElement Here:")
    console.log(mediaElementSource)*/
    mediaElementSource.connect(outputNode);
    currentMidiChannel = document.querySelector(
      "#m" + selectedMidi + "" + channelID
    );
    currentMidiChannel.checked = true;
    audioPlayer.volume = 5 / 100;
    setColor(props.backgroundColor);
  }, []);

  useEffect(() => {
    setAudioPlayerID("audio" + channelID);
    audioPlayer = document.getElementById(audioPlayerID);
    setSelectedMidi(props.selectedMidi);
    //applyFilters(filters);
  });

  const playAudio = () => {
    if (!isEnabled) return;
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    //mediaElementSource.connect(outputNode);
    //outputNode.connect(masterOutputNode);

    audioPlayer.play();
    setIsPlaying(true);
    setplayBtnTxt("Pause");
  };

  const pauseAudio = () => {
    //mediaElementSource.disconnect();
    //outputNode.disconnect();
    audioPlayer.pause();
    setIsPlaying(false);
    setplayBtnTxt("Play");
  };
  const playPauseClicked = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  const channelStateChange = (event) => {
    const isSliderOn = event.target.checked;
    setIsEnabled(() => {
      if (!isSliderOn) {
        pauseAudio();
        document.querySelector("#m0" + channelID).checked = true;
        //Block Buttons and sliders?
      }
      return isSliderOn;
    });
    /*console.log(
      "Channel " + channelID + " is " + (isSliderOn ? "enabled." : "disabled.")
    );*/
  };

  const destroyChannel = () => {
    pauseAudio();
    props.destroyChannel(document.getElementById(channelID));
  };

  const volSliderChange = (event) => {
    setVolume(() => {
      const updatedVolume = event.target.value;
      audioPlayer.volume = updatedVolume / 100;
      return updatedVolume;
    });
  };

  const speedSliderChange = (event) => {
    const updatedRate = event.target.value;
    handleRateChange(updatedRate)
  };

  const handleRateChange = (value) => {
    setRate(() => {
      const updatedRate = value;
      //console.log(mediaElementSource);
      //mediaElementSource.mediaElement.playbackRate = updatedRate * props.masterRate;
      audioPlayer.playbackRate = updatedRate * props.masterRate;
      return updatedRate;
    });
  }

  useEffect(()=>{
    handleRateChange(rate);
    console.log("Master Rate Changed:");
    console.log("Rate: " + rate);
    console.log("Master Rate: " + props.masterRate)
  },[props.masterRate])

  useEffect(()=>{
    console.log("MasterPlay: " + props.masterPlay);
    props.masterPlay ? playAudio() : pauseAudio();
  },[props.masterPlay])

  const midiChannelChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    const radioButtonID = event.target.id;
    props.changeMidi(selectedValue, radioButtonID);
  };

  const addFilterEvent = (filter) => {
    setFilters(prev =>{
      return [...filters, filter];
    });
  };
  const applyFilters = (filters) =>{
    //console.log(filters);
    outputNode.disconnect();
    mediaElementSource.disconnect();

    let i = 0;
    filters.forEach((filter)=>{
      if(filter.isFilterEnabled){
        biquadFilters[i] = audioContext.createBiquadFilter();
        biquadFilters[i].type = filter.type;
        switch(filter.type){
          case "lowpass":
            biquadFilters[i].frequency.value = 150;
            break;
          case "highpass":
            biquadFilters[i].frequency.value = 8000;
            break;
        }
        biquadFilters[i].gain.value = filter.strength;
        //console.log(biquadFilters[i])
        

        let filterGain = audioContext.createGain();
        filterGain.gain.value = filter.strength;

        filterGain.connect(outputNode);
        biquadFilters[i].connect(filterGain);
        mediaElementSource.connect(biquadFilters[i]);
        filterGain.connect(masterOutputNode);
        i++
      }
    })
    if(i==0) //outputNode.connect(masterOutputNode);
    console.log("filters applied: " + i)
  }

  const getNextFilterID = () => {
    setNextFilterID(prev => prev+1)
    return "filter" + channelID + "" + nextFilterID;
  }

  function toggleOutputConnection () {
    if (!lowpassSet) {
      outputNode.connect(masterOutputNode);
    } else {
      outputNode.disconnect();
    }
  }

  const lowpassFilterInput = (e) => {
    //console.log(document.getElementById("lowpasscheckbox" + channelID).checked);
    
    setFilterGain(() =>{
      var updatedGain = e.target.value;
      lowpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(!document.getElementById("lowpasscheckbox" + channelID).checked);
    filterCheck(document.getElementById("lowpasscheckbox" + channelID).checked);
  };

  const lowpassFilterClick = (e) => {
    filterCheck(e.currentTarget.checked);
  };
  const filterCheck = (isOn) =>{
    if (isOn) {
      lowpassGain.gain.value = filterGain;
      mediaElementSource.disconnect();
      lowpassGain.connect(outputNode);
      lowpassFilter.connect(lowpassGain);
      mediaElementSource.connect(lowpassFilter);
      lowpassSet = true;
      toggleOutputConnection();
      lowpassGain.connect(masterOutputNode);
    } else {
      lowpassSet = false;
      lowpassGain.disconnect();
      lowpassFilter.disconnect();
      mediaElementSource.connect(outputNode);
      toggleOutputConnection();
    }
  }

  return (
    <div
      className="channel"
      id={channelID}
      style={{ backgroundColor: `${color}` }}
    >
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
              checked={isEnabled}
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
            step="0.25"
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
        <div className="midiChannels" id={"radioButtons" + channelID}>
          <input
            type="radio"
            id={"m1" + channelID}
            name={"midiChannel" + channelID}
            value="1"
            onChange={midiChannelChange}
          />
          <label htmlFor={"m1" + channelID}>1</label>
          <input
            type="radio"
            id={"m2" + channelID}
            name={"midiChannel" + channelID}
            value="2"
            onChange={midiChannelChange}
          />
          <label htmlFor={"m2" + channelID}>2</label>
          <input
            type="radio"
            id={"m3" + channelID}
            name={"midiChannel" + channelID}
            value="3"
            onChange={midiChannelChange}
          />
          <label htmlFor={"m3" + channelID}>3</label>
          <input
            type="radio"
            id={"m4" + channelID}
            name={"midiChannel" + channelID}
            value="4"
            onChange={midiChannelChange}
          />
          <label htmlFor={"m4" + channelID}>4</label>
          <input
            type="radio"
            id={"m0" + channelID}
            name={"midiChannel" + channelID}
            value="0"
            onChange={midiChannelChange}
          />
          <label htmlFor={"mx" + channelID}>X</label>
        </div>
      </div>

      <hr className="breakLine"></hr>

      <div className="filterSection">
        <label className="filterTitle">Filters (*￣3￣)╭</label>
      </div>
      <div id={"filtercontainer" + channelID}>
        <input className="ml-6 focus: ring-red-0/0" id={"lowpasscheckbox"+channelID} type="checkbox" onChange={lowpassFilterClick}/>
          <label className="font-bold"  htmlFor="lowpass">
            Highpass Filter
          </label>
          <br></br>
            <input className="mt-0.5 ml-11" id={ "lowpass" + channelID} type="range" min="0" max="2" step="0.01" value={filterGain} onInput={lowpassFilterInput}/>
      </div>
    </div>
  );
}
export default Channel;
