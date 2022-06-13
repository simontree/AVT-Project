import "./ChannelCss/Channel.css";
import "./ChannelCss/Switch.css";
import "./ChannelCss/Slider.css";
import React, { useEffect, useState} from "react";
import { audioContext, primaryGainControl } from "../../App";
import { element } from "prop-types";

function Channel(props){
  
  const [channelID, setChannelID] = useState(props.id);
  const [audioPlayerID, setAudioPlayerID] = useState("base");
  const [volume, setVolume] = useState(props.volume);
  const [isEnabled, setIsEnabled] = useState(props.isEnabled);
  const [selectedMidi, setSelectedMidi] = useState(props.selectedMidi)

  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [rate, setRate] = useState(props.rate);
  const [src, setSrc] = useState(process.env.PUBLIC_URL + "Audios/sample4.mp3");
  var mediaElementSource;
  var audioPlayer;
  var currentMidiChannel;

  var [playBtnTxt, setplayBtnTxt] = useState("Play");
  useEffect(() =>{
    setChannelID(props.id);
    setAudioPlayerID("audio" + channelID);
    audioPlayer = document.querySelector("#"+audioPlayerID);
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
    currentMidiChannel = document.querySelector("#m"+selectedMidi+""+channelID);
    currentMidiChannel.checked = true;
    audioPlayer.volume = 5/100;
  },[])

  useEffect(()=>{
    setAudioPlayerID("audio" + channelID);
    audioPlayer = document.getElementById(audioPlayerID);
    mediaElementSource = audioContext.createMediaElementSource(audioPlayer);
    setSelectedMidi(props.selectedMidi);
  })

  const playAudio = () => {
    if(!isEnabled) return;
    mediaElementSource.connect(primaryGainControl);
    audioPlayer.play();
    setIsPlaying(true);
    setplayBtnTxt("Pause");
    console.log(audioPlayer)
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
    const isSliderOn = event.target.checked;
    setIsEnabled(()=>{
      if(!isSliderOn){
        pauseAudio();
        document.querySelector("#m0"+channelID).checked=true;
        //Remove from midi
        //Block Buttons and sliders?
      }
      return isSliderOn;
    });
    console.log("Channel " + channelID + " is "+ (isSliderOn ? "enabled.":"disabled."))
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
    const selectedValue = parseInt(event.target.value);
    const radioButtonID = event.target.id;
    props.changeMidi(selectedValue,radioButtonID );
  }


  const addFilterEvent = (event) => {
    console.log("Channel add filter clicked.");
  };
  //USE AUDIO TAG INSTEAD OF ONLY  CONTEXT STUFF
    return (
      
      <div className="channel" id={channelID}>
        <audio id={audioPlayerID} className="channelAudio" controls={true} autoPlay={false} onEnded={pauseAudio}>
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
