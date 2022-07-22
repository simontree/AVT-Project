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
  const [masterVolume, setMasterVolume] = useState(40);
  const [masterPlayMidi, setMasterPlayMidi] = useState(false);
  const [midiIsUpdated, setMidiIsUpdated] = useState(false);

  const addChannelHandler = (channel) => {
    setChannels((prevChannels) => {
      return [...channels, channel];
    });
  };

  const handleMidiChannelOrganization = (number, radioID) => {
    //Make an array of selected radio buttons
    var radios = Array.from(
      document.querySelectorAll("input[type='radio']")
    ).filter((element) => {
      return element.checked;
    });
    //Deselect values of other channels if they are the same as the one just selected
    //Except if it´s the X
    setChannels((prev) => {
      radios.forEach((element) => {
        if (element.id != radioID && element.value == number && number != "0") {
          element.checked = false;
        }
      });
      setRadioButtons();
      return prev;
    });
    setMidiIsUpdated(!midiIsUpdated);
    requestChannelsOnMidi();
//------------------------------------------------------------

  };

  const requestChannelsOnMidi = () =>{
    let channelsOnMidi = [];
    //Updated array of selected radio buttons
    const radios = Array.from(
      document.querySelectorAll("input[type='radio']")
    ).filter((element) => {
      return element.checked;
    });
      
    // Array of channels and their respective midi channel (The index)
    const channelsFromRadios = radios.
        filter((radio) =>{
          return radio.id[1]!=0
        }).
        map(radio => document.getElementById(radio.id[2]));

    let temp = [];
    let selected=[];
    let reorganized =[];
    channelsFromRadios.forEach(channel => {
      temp = [];

      var radiosOfChannel = channel.children[5].children[1]
      for(var i = 0; i <radiosOfChannel.childElementCount; i += 2 ){
        temp.push(radiosOfChannel.children[i])
      }

      temp.forEach((element)=>{
        if(element.checked){
          selected.push(element);
        }
      })
      
    });

    selected.forEach(element => {
      reorganized[element.id[1]-1] = element;
    });
    // console.log("Reorganized:");
    // console.log(reorganized);
    channelsOnMidi = reorganized.map(radio => document.getElementById(radio.id[2]))
    // console.log("Selected Channels:")
    // console.log(channelsOnMidi);

    return channelsOnMidi;
  }


  const setRadioButtons = () => {
    var numberOfChannels = channels.length;
    var radios;
    var checked;
    for (var i = 0; i < numberOfChannels; i++) {
      try {
        radios = Array.from(
          document
            .getElementById("radioButtons" + i)
            .getElementsByTagName("input")
        ).filter((element) => {
          return element.localName === "input";
        });
        checked = radios.filter((element) => {
          return element.checked;
        });
        if (checked.length == 0) {
          radios[4].checked = true;
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    try {
      var radios = Array.from(
        document.querySelectorAll("input[type='radio']")
      ).filter((element) => {
        return element.checked;
      });
      for (var i = 0; i < channels.length; i++) {
        channels[i].selectedMidi = parseInt(radios[i].value);
      }
    } catch (error) {
      //console.log(error);
    }
  };
  useEffect(() => {

  }, [midiIsUpdated]);

  const destroyChannel = (element) => {
    document
      .getElementById("channelsContainer")
      .childNodes[0].removeChild(element);
  };

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
    let channel = getChannel(cmd, btnID, value);
    // console.log("_________________________________________")
    console.log(
      "\n" +
        "New Event (on Channel: " +
        channel +
        ")==> Type: " +
        cmd +
        ", Origin: " +
        btnID +
        ", Value: " +
        value
    );
  }

  const getChannel = (type, btnID, value) => {
    const channelsOnMidi = requestChannelsOnMidi();
    //console.log(channelsOnMidi);
    var index = 0;
    //Channels
    if (btnID < 52 && btnID > 47) {
      index = btnID - 48;
      console.log(channelsOnMidi)
      return (btnID % 4) + 1;
    }
    //Master Play/Pause
    if (type == 9 && btnID == 18) {
      setMasterPlayMidi((old) => !old);
      return 0;
    }
    //Channels
    if (btnID > 17 && btnID <= 21) {
      return ((btnID - 2) % 4) + 1;
    }
    //Master Volume
    if (type == 11 && btnID == 64) {
      setMasterVolume((old) => value / 1.27);
      const mapped = value / 1.27;
      masterOutputNode.gain.value = mapped / 100;
      document.getElementById("masterVolumeText").textContent =
        Math.ceil(mapped);
      return 0;
    }
    //Master Rate
    if (type == 11 && btnID == 6) {
      const mapped = (value * 3) / 127;
      setMasterRate((old) => mapped);
      updateMasterRate(mapped);
      document.getElementById("masterSpeedValue").textContent =
        Math.ceil(mapped * 10) / 10;
    }
  };

  const updateMasterVolume = (updated) => {
    setMasterVolume((old) => updated);
  };

  const newChannelprops = {
    nextID,
    defaultMidi,
    defaultVolume,
    defaultState,
    defaultIsPlaying,
    defaultAudioUrl,
    defineRandomColor,
    addChannelHandler,
    setNextID
  }

  const channelProps = {
    channels, 
    handleMidiChannelOrganization,
    destroyChannel,
    masterRate,
    masterPlay
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
    addChannelHandler,  //added for design purpose
    defaultAudioUrl,    //added for design purpose
    defaultColor        //added for design purpose
  }

  return (
    <Box sx={{ width: 1 }} margin={'10px'}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
        <Box gridColumn="span 8">
          <Grid container direction='row'>
          <Channels {...channelProps}/>
          <NewChannel {...newChannelprops}/>
          </Grid>
        </Box>
        <Box gridColumn="span 4">
          <Box><Master {...masterProps} /></Box>
        </Box>
        <Box gridColumn="span 8">
          <Box><DrumMachine/></Box>
        </Box>
        <Box gridColumn="span 4">
          <Box>Visualization coming soon..</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
