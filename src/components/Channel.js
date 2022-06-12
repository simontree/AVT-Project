import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState} from "react";
import { audioContext, primaryGainControl } from "../index";
import { element } from "prop-types";

function Channel(props){
  
  var [channelID, setChannelID] = useState(-1);
  var [audioID, setAudioID] = useState("base");
  const [volume, setVolume] = useState(50);
  const [midiChannel, setMidiChannel] = useState(0)
  var [isEnabled, setIsEnabled] = useState(true);

  var [isPlaying, setIsPlaying] = useState(false);
  var [rate, setRate] = useState(1);
  var [src, setSrc] = useState(process.env.PUBLIC_URL + "Audios/sample4.mp3");
  var mediaElementSource;
  var audioPlayer;

  var [playBtnTxt, setplayBtnTxt] = useState("Play");
  useEffect(() =>{
    setChannelID(props.requestChannelID());
    audioPlayer = document.querySelector("audio.channel");
    setAudioID("audio" + channelID);
    audioPlayer.className = "channel" + channelID;
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
  },[])

  useEffect(()=>{
    setAudioID("audio" + channelID);
    audioPlayer = document.getElementById(audioID);
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
    const selectedValue = event.target.value;
    const target = event.target.id;
    const radios = props.requestRadioButtons();
    radios.forEach(element => {
      if(element.checked && element.id != target && element.value == selectedValue && selectedValue!="0"){
        element.checked = false;
      }
    });
    setRadioButtons();
  };

  const setRadioButtons = () =>{
    var numberOfChannels = props.requestNumberOfChannels();
    var radios;
    var checked;
    for(var i = 0; i < numberOfChannels; i++){
      radios = Array.from(document.getElementById("radioButtons" + i).children)
      .filter((element) => {
        return element.localName === 'input';
      });
      checked = radios.filter((element) => {return element.checked})
      if(checked.length==0) radios[4].checked = true;
    }
  }


  const addFilterEvent = (event) => {
    console.log("Channel add filter clicked.");
  };
  //USE AUDIO TAG INSTEAD OF ONLY  CONTEXT STUFF
    return (
      
      <div className="channel">
        <audio id={audioID} className="channel" controls={true} autoPlay={false} onEnded={pauseAudio}>
          <source type="audio/mp3" src={src} />
        </audio>
        <div className="channelTop">
          <div className="switchContainer">
            <label className="switch">
              <input type="checkbox" onChange={channelStateChange} checked={isEnabled}/>
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
          <div className="midiChannels" id={"radioButtons"+channelID}>
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
              id={"mx" + channelID}
              name={"midiChannel" + channelID}
              value="0"
              onChange={midiChannelChange}
            />
            <label htmlFor={"mx" + channelID}>X</label>
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
