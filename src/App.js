import './App.css';
import React, { useEffect, useState } from 'react';
import Channels from "./components/Channels/Channels";
import NewChannel from './components/Channels/NewChannel';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import Channel from './components/Channels/Channel';
import Master from './components/Master/Master';
import { masterOutputNode } from './components/Master/Master';

export const audioContext = new AudioContext();
export const out = audioContext.destination;
export const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.4, 0);
primaryGainControl.connect(out);

const defaultMidi= 0;
const defaultVolume = 5;
const defaultRate = 1;
const defaultState = true;
const defaultIsPlaying = false;
const defaultAudioUrl = "Audios/sample4.mp3";
const defaultColor = "#FE80F0"


const DUMMY_CHANNELS = [
  {
    id: 0,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color:defaultColor
  },
  {
    id: 1,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color:defaultColor
  },
  {
    id: 2,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color:defaultColor
  },
  {
    id: 3,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color:defaultColor
  },
  {
    id: 4,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
    color:defaultColor
  },
];

const defaultAudioType = "audio/mp3"
function App() {

  const [channels, setChannels] = useState([]);
  const [nextID, setNextID] = useState(5);
  const [masterRate, setMasterRate] = useState(1);
  const [masterPlay, setMasterPlay] = useState(true);
  const [masterVolume, setMasterVolume] = useState(5/100);
  const [masterPlayMidi, setMasterPlayMidi] = useState(false);
  var [midiIsUpdated, setMidiIsUpdated] = useState(false);

  const addChannelHandler = (channel) => {
    setChannels(prevChannels => {
      return [...channels,channel];
    });
  };

  const requestRadioButtons = () => {
    const radioButtons = channels.map((channel) => ({
      id: channel.id,
      selectedMidi: channel.selectedMidi,
    }));
    return radioButtons;
  };
  const requestNumberOfChannels = () => {return channels.length;}
  const testChannelModification = (number, radioID) =>{
    var radios = Array.from(document.querySelectorAll("input[type='radio']"))
      .filter((element) => {return element.checked});
    setChannels((prev)=>{
        radios.forEach(element => {
            if(element.id != radioID && element.value == number && number!="0"){
              element.checked = false;         
            }
          });
        setRadioButtons();
        return prev;
      })
      radios = Array.from(document.querySelectorAll("input[type='radio']"))
      .filter((element) => {return element.checked});
    setMidiIsUpdated((prev) => {
      console.log(radios)
      //console.log(radios[0].id[2]) //To get Channel ID and Midi channel selected
      let midiChannel;
      let channel;
      radios.forEach(element => {
        midiChannel = element.id[1];
        channel = document.getElementById(element.id[2]);
        // console.log("Channel:")
        // console.log(channel);
        // console.log("At:")
        // console.log(midiChannel);
    //TODO: Map "App channels" to "Midi channels" UseState?
    //And modify values like master. 
      });

      return !prev
    });
  }
  const setRadioButtons = () =>{
    var numberOfChannels = channels.length;
    var radios;
    var checked;
    for(var i = 5; i < numberOfChannels+5; i++){
      try{
        radios = Array.from(document.getElementById("radioButtons" + i).getElementsByTagName("input"))
        .filter((element) => {
          return element.localName === 'input';
        });
        checked = radios.filter((element) => {return element.checked})
        if(checked.length==0) {
          radios[4].checked = true;
        }
      }catch(error){
        console.log(error);
      }
    }
  }
  useEffect(()=>{
    try{
      var radios = Array.from(document.querySelectorAll("input[type='radio']"))
      .filter((element) => {return element.checked});
      for(var i = 0; i < channels.length; i++){
        channels[i].selectedMidi = parseInt(radios[i].value)
      }
    }catch(error){
      //console.log(error);
    }
  },[midiIsUpdated])

  const  destroyChannel = (element) =>{
    document.getElementById("channelsContainer").childNodes[0].removeChild(element)
  }

  const defineRandomColor = () =>{
    let color = '#';
    for (let i = 0; i < 6; i++){
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += (bit).toString(16);
    };
    return color;
  }

  const updateMasterRate = (e) =>{
    setMasterRate((old) =>{
      const updatedMasterRate = e;
      return updatedMasterRate;
    })
  }
  const masterPlayPause = () =>{
    setMasterPlay((old) => !old)
  }

  useEffect(()=>{
    initMidi();
  },[])

  function initMidi() {

    console.log(window.isSecureContext)
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(
            midiSuccess,
            midiFailure
        );
    } else {
        midiFailure();
    }
}

let midiAccess;
function midiSuccess(midi) {
  console.log('Midi is working!');

  midiAccess = midi;
  console.log(midi.inputs)
  var inputs = midi.inputs;
  for (var input of inputs.values()) {
      input.onmidimessage = onMidiMessage;
  }
}

function midiFailure() {
  console.log('Failure: Midi is not working!');
}

function onMidiMessage(event) {
  let cmd = event.data[0] >> 4;
  let btnID = event.data[1];
  let value = event.data[2];
  let channel = getChannel(cmd, btnID, value);
  // console.log("_________________________________________")
  console.log("\n" +
  "New Event (on Channel: "+channel+")==> Type: "+ cmd +
  ", Origin: "+btnID +
  ", Value: "+value);
}

const getChannel = (type, btnID, value) =>{
  if(btnID <52 && btnID >47){

     return btnID%4 + 1;
  }
  if((type == 9) && btnID == 18){
    setMasterPlayMidi(old => !old)
    return 0;
  }
  if(btnID > 17 && btnID <= 21){ 

    return (btnID-2)%4 +1;
  }
  if(type == 11 && btnID == 64){
    setMasterVolume(old => value/1.27);
    const mapped = (value/1.27)
    masterOutputNode.gain.value = mapped/100;
    document.getElementById("masterVolumeText").textContent = Math.ceil(mapped);
    return 0;
  }
  if(type == 11 && btnID == 6){
    const mapped = (value*3)/127;
    setMasterRate(old => mapped);
    updateMasterRate(mapped);
    document.getElementById("masterSpeedValue").textContent = Math.ceil(mapped*10)/10;
  }
  
}

const updateMasterVolume = (updated)=>{
  setMasterVolume(old => updated)
}

  return (
    <div>
      <NewChannel
        nextAvailableID={nextID}
        defaultMidi={defaultMidi}
        defaultVolume={defaultVolume}
        defaultState={defaultState}
        defaultIsPlaying={defaultIsPlaying}
        defaultAudioUrl={defaultAudioUrl}
        defaultAudioType={defaultAudioType}
        color={defineRandomColor}
        addChannelHandler={addChannelHandler}
        setNextID={setNextID}
      />
      <Channels 
        channels={channels}
        requestRadioButtons={requestRadioButtons}
        requestNumberOfChannels={requestNumberOfChannels}
        testChannelModification={testChannelModification}
        handleDestroyChannel={destroyChannel}
        masterRate = {masterRate}
        masterPlay = {masterPlay}
      ></Channels>
      <Master
      id={"master"}
      volume={masterVolume}
      rate={defaultRate}
      color={"#000000"}
      isPlaying={defaultIsPlaying}
      updateMasterRate = {updateMasterRate}
      masterRate = {masterRate}
      masterPlayPause = {masterPlayPause}
      updateMasterVolume = {updateMasterVolume}
      masterPlay = {masterPlay}
      masterPlayMidi ={masterPlayMidi}
      >
      </Master>
    </div>
  );
}

export default App;
