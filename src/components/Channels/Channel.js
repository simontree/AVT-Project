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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ClearIcon from '@mui/icons-material/Clear';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SpeedIcon from '@mui/icons-material/Speed';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { AntSwitch } from "./Filters/AntSwitch";
import { FilterSection } from "./Filters/FilterSection";

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
    audioPlayer = document.getElementById(audioPlayerID);
    audioPlayer.play();
    setIsPlaying(true);
    setplayBtnTxt("Pause");
  };

  const pauseAudio = () => {
    audioPlayer = document.getElementById(audioPlayerID);
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

  const stopPlayback = () => {
    audioPlayer = document.getElementById(audioPlayerID)
    audioPlayer.pause()
    audioPlayer.currentTime = 0
    setIsPlaying(false)
  }

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
    handleHighpassInput(e.target.value);
  }
  const handleHighpassInput = (value) => {    
    setFilterHighGain(() =>{
      var updatedGain = value;
      highpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(document.getElementById("highpass checkbox" + channelID).checked, "highpass");
  };

  const lowpassFilterInput = (e) => { 
    handleLowpassInput(e.target.value);
  }
  const handleLowpassInput = (value) => {    
    setFilterLowGain(() =>{
      var updatedGain = value;
      lowpassGain.gain.value = updatedGain;
      return updatedGain;
    });
    filterCheck(document.getElementById("lowpass checkbox" + channelID).checked, "lowpass");
  };

  const bandpassFilterInput = (e) => { 
    handleBandpassInput(e.target.value);
  }
  const handleBandpassInput = (value) => {    
    setFilterBandGain(() =>{
      var updatedGain = value;
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

  const filterProps = {
    channelID,
    filterHighGain,
    highpassFilterInput,
    highpassSet,
    filterClick,
    filterBandGain,
    bandpassFilterInput,
    bandpassSet,
    filterClick,
    filterLowGain,
    lowpassFilterInput,
    lowpassSet
  }

  return (
    <Container
    id={channelID}
    sx={{
      backgroundColor: 'rgb(2, 40, 79)',
      margin: '20px',
      width: '320px',
      padding: '20px',
      borderRadius: '20px',
      border: 'solid 1px #3f6d91'
    }}>
      <Grid container
      direction="column"
      alignItems="center">
        <Grid container
        justifyContent="space-between"
        alignItems="center">
          <Grid item>
            <Switch 
            onChange={channelStateChange}
            checked={isChannelEnabled} />
          </Grid>
          <Grid item>
            <Typography>
            {"FileTitle " + channelID}
            </Typography>
          </Grid>
          <Grid item>
          <IconButton 
            onClick={destroyChannel}
            sx={{ 
              border: '1px solid #ef5350', 
              marginLeft: '15px', 
              ':hover': {backgroundColor: 'rgba(239, 83, 80, 0.3)'}}}>
            <ClearIcon fontSize="small" sx={{color: '#ef5350'}}/>
          </IconButton> 
          </Grid>
        </Grid>
        <Grid item
        width={200}
        justifyContent="space-between"
        sx={{marginBottom: '10px', marginTop: '10px'}}>
          <Slider
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => setPosition(value)}
          sx={{color: '#bbdefb', height: 4,}}
          />
          <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: -2,
            }}>
            <TinyText>{formatDuration(position)}</TinyText>
            <TinyText>-{formatDuration(duration - position)}</TinyText>
          </Box>
        </Grid>
        <Grid item sx={{marginBottom: '5px'}}>
          <IconButton
            onClick={playPauseClicked}
            sx={{border: '1px solid #bbdefb', marginRight: '15px', 
            ':hover': {backgroundColor: 'rgba(187, 222, 251, 0.2)'}}}>
                {(isPlaying) ?
                <PauseIcon
                fontSize="large"
                sx={{color: '#bbdefb'}}/> :
                <PlayArrowIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}
                />
                }
          </IconButton>
          <IconButton
            onClick={stopPlayback}  
            sx={{border: '1px solid #bbdefb',  
            ':hover': {backgroundColor: 'rgba(187, 222, 251, 0.2)'}}}>
                <StopIcon 
                fontSize="large"
                sx={{color: '#bbdefb'}}/>
          </IconButton>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <VolumeUp/>
          </Grid>
          <Grid item width={200}>
            <Slider
            size="small"
            min={0}
            max={100}
            value={volume}
            id="volRange"
            onChange={volSliderChange}
            valueLabelDisplay="auto"
            sx={{color: '#bbdefb', height: 4,}}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <SpeedIcon/>
          </Grid>
          <Grid item width={200}>
            <Slider
            size="small"
            min={0}
            max={3}
            step={0.1}
            value={rate}
            id="sSlider"
            onChange={rateSliderChange}
            valueLabelDisplay="auto"
            sx={{color: '#bbdefb', height: 4}}
            />
          </Grid>
        </Grid>
      </Grid>

      <FilterSection {...filterProps}/>

      <audio
        id={audioPlayerID}
        className="channelAudio"
        class="invisible" // for testing purpose hidden
        controls={true}
        autoPlay={false}
        onEnded={pauseAudio}
      >
        <source type={type} src={audioSourceURL} />
      </audio>

    </Container>
  )
}
export default Channel;
