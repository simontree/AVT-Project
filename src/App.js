import "./App.css";
import React, { useEffect, useState } from "react";
import Channels from "./components/Channels/Channels";
import NewChannel from "./components/Channels/NewChannel";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import Channel from "./components/Channels/Channel";
import Master from "./components/Master/Master";
import { masterOutputNode } from "./components/Master/Master";
import DrumMachine from "./components/DrumMachine/DrumMachine";
import {Box, Grid, Container, Typography} from '@mui/material'
import { arrayOf } from "prop-types";

export const audioContext = new AudioContext();
export const out = audioContext.destination;
export const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.4, 0);
primaryGainControl.connect(out);

const defaultMidi = 0;
const defaultVolume = 5;
const defaultRate = 1;
const defaultState = true;
const defaultIsPlaying = false;
const defaultAudioUrl = "Audios/sample4.mp3";
const defaultColor = "#FE80F0";

const DUMMY_CHANNELS = [
  {
    id: 0,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color: defaultColor,
  },
  {
    id: 1,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color: defaultColor,
  },
  {
    id: 2,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color: defaultColor,
  },
  {
    id: 3,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color: defaultColor,
  },
  {
    id: 4,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color: defaultColor,
  },
];

const defaultAudioType = "audio/mp3";
function App() {
  const [channels, setChannels] = useState([]);
  const [nextID, setNextID] = useState(0);
  const [masterRate, setMasterRate] = useState(1);
  const [masterPlay, setMasterPlay] = useState(false);
  const [masterVolume, setMasterVolume] = useState(10);
  const [masterPlayMidi, setMasterPlayMidi] = useState(0);
  const [midiValues, setMidiValues]= useState([
    {
      volume: 50,
      rate: 1,
      play: false,
      highFilter:0,
      bandFilter:0,
      lowFilter:0
    },
    {
      volume: 50,
      rate: 1,
      play: false,
      highFilter:0,
      bandFilter:0,
      lowFilter:0
    },
    {
      volume: 50,
      rate: 1,
      play: false,
      highFilter:0,
      bandFilter:0,
      lowFilter:0
    },
    {
      volume: 50,
      rate: 1,
      play: false,
      highFilter:0,
      bandFilter:0,
      lowFilter:0
    }
  ])
  const [midiChanged, setMidiChanged] = useState(0);
  const [channelsChanged, setChannelsChanged] = useState(false);

  const addChannelHandler = (channel) => {
    setChannels((prevChannels) => {
      console.log("prevChannels: "+prevChannels)
      return [...channels, channel];
    });
  };

  const destroyChannel = (element) => {
    setChannelCount(channelCount-1)
    setNextID(prev => prev-1)
    setChannels((prevChannels) => {
      for(let i=0; i < prevChannels.length; i++){
        if(prevChannels[i].id == element.id){
          prevChannels.splice(i,1);
        }
      }
      console.log(prevChannels)
      return channels;
    });
  };

  // console.log("channelIDToDelete: "+channelIDToDelete)

  // channelsContent.filter(channel => channel.id !== channelIDToDelete)
  // console.log("channels[] in channels.js: "+channelsContent)

  const defineRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const random = Math.random();
      const bit = (random * 16) | 0;
      color += bit.toString(16);
    }
    return color;
  };

  const updateMasterRate = (e) => {
    setMasterRate((old) => {
      const updatedMasterRate = e;
      return updatedMasterRate;
    });
  };
  const masterPlayPause = () => {
    setMasterPlay(old => !old);
    console.log("masterPlay: "+masterPlay)
  };

  useEffect(() => {
    initMidi();
  }, []);

  function initMidi() {
    console.log(window.isSecureContext);
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(midiSuccess, midiFailure);
    } else {
      midiFailure();
    }
  }

  let midiAccess;
  function midiSuccess(midi) {
    console.log("Midi is working!");

    midiAccess = midi;
    console.log(midi.inputs);
    var inputs = midi.inputs;
    for (var input of inputs.values()) {
      input.onmidimessage = onMidiMessage;
    }
  }

  function midiFailure() {
    console.log("Failure: Midi is not working!");
  }

  function onMidiMessage(event) {
    let cmd = event.data[0] >> 4;
    let btnID = event.data[1];
    let value = event.data[2];
    //console.log(btnID)
    let channel = getChannel(cmd, btnID, value);
    // console.log("_________________________________________")
    // console.log(
    //   "\n" +
    //     "New Event (on Channel: " +
    //     channel +
    //     ")==> Type: " +
    //     cmd +
    //     ", Origin: " +
    //     btnID +
    //     ", Value: " +
    //     value
    // );
  }

  const getChannel = (type, btnID, value) => {
    //console.log(channelsOnMidi);
    var index = 0;
    //Channels Volume
    if (btnID < 52 && btnID > 47 && type == 11) {
      index = btnID - 48;
      setMidiValues((old) => {
        old[index].volume = value / 1.27;
        return old;
      });
      setMidiChanged((old) => ++old);
      return (btnID % 4) + 1;
    }
    //Channels Rate
    if ((btnID > 17 && btnID <= 21) && type==11) {
      index = btnID - 18;
      setMidiValues((old) => {
        old[index].rate = Math.ceil((value*3) /12.7) / 10;
        return old;
      });
      setMidiChanged((old) => ++old);
      return ((btnID - 2) % 4) + 1;
    }
    //ChannelsPlay Pause
    if((btnID > 47 && btnID < 52) && type == 9){
      index = btnID - 48;
      setMidiValues((old) => {
        old[index].play = !old[index].play;
        return old;
      });
      setMidiChanged((old) => ++old);
      return ((btnID) % 4)+1;
    }
    //Channels HighFilter
    if ((btnID > 13 && btnID < 18) && type==11) {
      index = btnID - 14;
      setMidiValues((old) => {
        old[index].highFilter = Math.ceil((value*2) /12.7) / 10;
        return old;
      });
      setMidiChanged((old) => ++old);
      return ((btnID - 2) % 4) + 1;
    }
    //Channels LowFilter
    if ((btnID > 9 && btnID < 14) && type==11) {
      index = btnID - 10;
      setMidiValues((old) => {
        old[index].lowFilter = Math.ceil((value*2) /12.7) / 10;
        return old;
      });
      setMidiChanged((old) => ++old);
      return ((btnID - 2) % 4) + 1;
    }
    //Channels BandFilter
    if ((btnID > 5 && btnID < 10) && type==11) {
      index = btnID - 6;
      setMidiValues((old) => {
        old[index].bandFilter = Math.ceil((value*2) /12.7) / 10;
        return old;
      });
      setMidiChanged((old) => ++old);
      return ((btnID - 2) % 4) + 1;
    }

    //Master Play/Pause
    if (type == 9 && btnID == 18) {
      setMasterPlayMidi((old) => ++old);
      return 0;
    }

    //Master Volume
    if (type == 11 && btnID == 64) {
      setMasterVolume((old) => {
        return value / 1.27
      });
      return 0;
    }
    //Master Rate
    if (type == 11 && btnID == 1) {
      const mapped = (value * 3) / 127;
      updateMasterRate(Math.ceil(mapped * 10) / 10);
    }
  };

  const updateMasterVolume = (updated) => {
    setMasterVolume((old) => updated);
  };

  const [channelCount, setChannelCount] = useState(0)

  const getMyNextID = () =>{
    let channelsx = document.getElementsByClassName("channelElement");
    const arr = [].slice.call(channelsx)
    let nextID = -1;
    console.log(arr.length)
    for(let j = 0; j < 4; j++){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].id == j){
          break;
        }
        if(i == arr.length -1){
          return j;
        }
      }
    }
    if(nextID === -1) nextID = arr.length;
    console.log("Next ID:  " + nextID)
    return nextID;
  }

  const newChannelprops = {
    getMyNextID,
    defaultMidi,
    defaultVolume,
    defaultState,
    defaultIsPlaying,
    defaultAudioUrl,
    defaultRate,
    defineRandomColor,
    addChannelHandler,
    setNextID,
    channelCount,
    setChannelCount
  }

  const channelProps = {
    channels, 
    destroyChannel,
    masterRate,
    masterPlay,
    masterVolume,
    midiValues,
    midiChanged,
    setChannelsChanged,
    getMyNextID
  }

  const masterProps = {
    masterVolume,
    defaultRate,
    defaultIsPlaying,
    updateMasterRate,
    masterRate,
    masterPlayPause,
    updateMasterVolume,
    masterPlay,
    masterPlayMidi,
    id:'master',
    color:'#000000',
    addChannelHandler,  
    defaultAudioUrl,    //added for design purpose
    defaultColor,        //added for design purpose
    channels,
    channelsChanged
  }

  return (
    <Box sx={{ width: 1 }} marginTop={'30px'} marginLeft={'20px'}>
      <Box display="grid" gridTemplateColumns="repeat(16, 1fr)">
        <Box gridColumn="span 12">
          <Grid container direction='row'>
            <Grid container direction='row'>
              <Grid item>
              <Channels {...channelProps}/>
              </Grid>
              <Grid item>
              <NewChannel {...newChannelprops}/>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box gridColumn="span 4" sx={{transform: 'translateY(25%)'}}>
          <Box><Master {...masterProps} /></Box>
        </Box>
        <Box gridColumn="span 16">
          <Grid container
          justifyContent="center">
            <Grid item>
            <DrumMachine/>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
