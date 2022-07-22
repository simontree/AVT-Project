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

import {Box, Grid, Container, Typography} from '@mui/material'
import StopIcon from '@mui/icons-material/Stop'
import IconButton from '@mui/material/IconButton'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const defaultFilterStrength = 0.05;
const defaultFilterType = "lowpass";
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
  const [selectedMidi, setSelectedMidi] = useState(props.selectedMidi);
  const [color, setColor] = useState(props.backgroundColor);
  const [playBtnTxt, setplayBtnTxt] = useState("Play");
  const [filterGain, setFilterGain] = useState(0);

  var audioPlayer;
  var currentMidiChannel;
  var outputNode = audioContext.createGain();

  //Create lowpass filter and its gain node
  const lowpassFilter = createFilter(audioContext, 'highpass', 8000);
  const lowpassGain = audioContext.createGain();
  let lowpassSet = false;

  // var [filters, setFilters] = useState([]);
  // const [nextFilterID, setNextFilterID] = useState(0);
  // var biquadFilters = []

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
    // currentMidiChannel = document.querySelector(
    //   "#m" + selectedMidi + "" + channelID
    // );
    // currentMidiChannel.checked = true;
    audioPlayer.volume = 5 / 100;
    setColor(props.backgroundColor);
  }, []);

  useEffect(() => {
    setAudioPlayerID("audio" + channelID);
    audioPlayer = document.getElementById(audioPlayerID);
    setSelectedMidi(props.selectedMidi);
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

  useEffect(()=>{
    props.masterPlay ? playAudio() : pauseAudio();
  },[props.masterPlay])

  const handleMidiChannelChange = (event) => {
    const selectedValue = parseInt(event.target.value);
    const radioButtonID = event.target.id;
    props.changeMidiChannel(selectedValue, radioButtonID);
  };

  // const addFilterEvent = (filter) => {
  //   setFilters(prev =>{
  //     return [...filters, filter];
  //   });
  // };
  // const applyFilters = (filters) =>{
  //   //console.log(filters);
  //   outputNode.disconnect();
  //   mediaElementSource[channelID].disconnect();

  //   let i = 0;
  //   filters.forEach((filter)=>{
  //     if(filter.isFilterEnabled){
  //       biquadFilters[i] = audioContext.createBiquadFilter();
  //       biquadFilters[i].type = filter.type;
  //       switch(filter.type){
  //         case "lowpass":
  //           biquadFilters[i].frequency.value = 150;
  //           break;
  //         case "highpass":
  //           biquadFilters[i].frequency.value = 8000;
  //           break;
  //       }
  //       biquadFilters[i].gain.value = filter.strength;
  //       //console.log(biquadFilters[i])
        

  //       let filterGain = audioContext.createGain();
  //       filterGain.gain.value = filter.strength;

  //       filterGain.connect(outputNode);
  //       biquadFilters[i].connect(filterGain);
  //       mediaElementSource[channelID].connect(biquadFilters[i]);
  //       filterGain.connect(masterOutputNode);
  //       i++
  //     }
  //   })
  //   if(i==0) //outputNode.connect(masterOutputNode);
  //   console.log("filters applied: " + i)
  // }

  // const getNextFilterID = () => {
  //   setNextFilterID(prev => prev+1)
  //   return "filter" + channelID + "" + nextFilterID;
  // }

  function toggleOutputConnection () {
    if (!lowpassSet) {
      outputNode.connect(masterOutputNode);
    } else {
      outputNode.disconnect();
    }
  }

  const lowpassFilterInput = (e) => {    
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
      mediaElementSource[channelID].disconnect();
      lowpassGain.connect(outputNode);
      lowpassFilter.connect(lowpassGain);
      mediaElementSource[channelID].connect(lowpassFilter);
      console.log(mediaElementSource[channelID])
      lowpassSet = true;
      toggleOutputConnection();
      lowpassGain.connect(masterOutputNode);
    } else {
      lowpassSet = false;
      lowpassGain.disconnect();
      lowpassFilter.disconnect();
      mediaElementSource[channelID].connect(outputNode);
      toggleOutputConnection();
    }
  }

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
  });  

  const [position, setPosition] = useState(32);
  const duration = 200; // seconds

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

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
      <Grid container
      direction="column"
      alignItems="center">
        <Grid item width={250}>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{
            color: '#fff',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px 'rgb(255 255 255 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(position)}</TinyText>
          <TinyText>-{formatDuration(duration - position)}</TinyText>
        </Box>
        </Grid>
        <Grid item>
            <IconButton
            // onClick={togglePlayback}
            sx={{border: '1px solid #bbdefb', marginRight: '15px'}}>
                {/* {(isPlaying) ?
                <PauseIcon
                fontSize="large"
                sx={{
                    color: '#bbdefb'
                }}/> : */}
                <PlayArrowIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}
                />
                {/* } */}
            </IconButton>
            <IconButton
            // onClick={stopPlayback}
            sx={{border: '1px solid #bbdefb', marginRight: 2}}>
                <StopIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}/>
            </IconButton>
            </Grid>
        </Grid>

      <audio
        id={audioPlayerID}
        className="channelAudio"
        class="invisible"
        controls={true}
        autoPlay={false}
        onEnded={pauseAudio}
      >
        <source type={type} src={audioSourceURL} />
      </audio>
    </Container>

    // <div
    //   className="channel"
    //   id={channelID}
    //   style={{ backgroundColor: `${color}` }}
    // >
      
    //   <div className="channelTop">
    //     <div className="switchContainer">
    //       <label className="switch">
    //         <input
    //           type="checkbox"
    //           onChange={channelStateChange}
    //           checked={isChannelEnabled}
    //         />
    //         <span className="slider round"></span>
    //       </label>
    //     </div>

    //     <div className="fileTitle">
    //       <label>{"Placeholder" + channelID}</label>
    //     </div>

    //     <div className="channelContext">
    //       <button value={"..."} onClick={destroyChannel}>
    //         X
    //       </button>
    //     </div>
    //   </div>

    //   <div className="channelPlay">
    //     <button className="playButton" onClick={playPauseClicked}>
    //       {playBtnTxt}
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
    //         id="volRange"
    //         value={volume}
    //       ></input>
    //     </div>
    //     <div className="volValue">
    //       <label>{volume}</label>
    //     </div>
    //   </div>

    //  <div className="speedControl">
    //     <div className="speedIcon">
    //       <label>Sp</label>
    //     </div>
    //     <div className="speedSlider">
    //       <input
    //         type={"range"}
    //         min="0"
    //         max="3"
    //         step="0.1"
    //         onChange={speedSliderChange}
    //         onMouseUp={speedSliderChange}
    //         className="sSlider"
    //         id="sRange"
    //         value={rate}
    //       ></input>
    //     </div>
    //     <div className="speedValue">
    //       <label>{rate}</label>
    //     </div>
    //   </div>

    //   <div className="midiChannelContainer">
    //     <div className="midiLabel">
    //       <label>Midi Channel</label>
    //     </div>
    //     <div className="midiChannels" id={"radioButtons" + channelID}>
    //       <input
    //         type="radio"
    //         id={"m1" + channelID}
    //         name={"midiChannel" + channelID}
    //         value="1"
    //         onChange={handleMidiChannelChange}
    //       />
    //       <label htmlFor={"m1" + channelID}>1</label>
    //       <input
    //         type="radio"
    //         id={"m2" + channelID}
    //         name={"midiChannel" + channelID}
    //         value="2"
    //         onChange={handleMidiChannelChange}
    //       />
    //       <label htmlFor={"m2" + channelID}>2</label>
    //       <input
    //         type="radio"
    //         id={"m3" + channelID}
    //         name={"midiChannel" + channelID}
    //         value="3"
    //         onChange={handleMidiChannelChange}
    //       />
    //       <label htmlFor={"m3" + channelID}>3</label>
    //       <input
    //         type="radio"
    //         id={"m4" + channelID}
    //         name={"midiChannel" + channelID}
    //         value="4"
    //         onChange={handleMidiChannelChange}
    //       />
    //       <label htmlFor={"m4" + channelID}>4</label>
    //       <input
    //         type="radio"
    //         id={"m0" + channelID}
    //         name={"midiChannel" + channelID}
    //         value="0"
    //         onChange={handleMidiChannelChange}
    //       />
    //       <label htmlFor={"mx" + channelID}>X</label>
    //     </div>
    //   </div>

    //   <hr className="breakLine"></hr>

    //   <div className="filterSection">
    //     <label className="filterTitle">Filters (*￣3￣)╭</label>
    //   </div>
    //   <div id={"filtercontainer" + channelID}>
    //     <input className="ml-6 focus: ring-red-0/0" id={"lowpasscheckbox"+channelID} type="checkbox" onChange={lowpassFilterClick}/>
    //       <label className="font-bold"  htmlFor="lowpass">
    //         Highpass Filter
    //       </label>
    //       <br></br>
    //         <input className="mt-0.5 ml-11" id={ "lowpass" + channelID} type="range" min="0" max="2" step="0.01" value={filterGain} onInput={lowpassFilterInput}/>
    //   </div> 
    // </div>
  )
}
export default Channel;
