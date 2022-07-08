import './App.css';
import React, { useEffect, useState } from 'react';
import Channels from "./components/Channels/Channels";
import NewChannel from './components/Channels/NewChannel';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';
import Channel from './components/Channels/Channel';
import Master from './components/Master/Master';

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
  const [masterPlay, setMasterPlay] = useState(false);

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

  var [midiIsUpdated, setMidiIsUpdated] = useState(false);

  const testChannelModification = (number, radioID) =>{
    console.log(radioID);
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
    setMidiIsUpdated(prev => !prev);
  }
  const setRadioButtons = () =>{
    var numberOfChannels = channels.length;
    var radios;
    var checked;
    for(var i = 0; i < numberOfChannels; i++){
      try{
        radios = Array.from(document.getElementById("radioButtons" + i).children)
        .filter((element) => {
          return element.localName === 'input';
        });
        checked = radios.filter((element) => {return element.checked})
        if(checked.length==0) {
          radios[4].checked = true;
        }
      }catch(error){
        console.log("Channel number: " + i);
        //console.log(error);
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
    // const currentChannelElements = Array.from(document.getElementsByClassName("channel"));
    // const currentChannels = currentChannelElements.map((element) => {
    //   var i=0;
    //   var elementid = element.id;
    //   var elementsSelectedMidi = Array.from(element.childNodes[5].childNodes[1].childNodes).filter((element) =>{
    //     i = i+1;
    //     if(i%2===0){
    //       return false;
    //     }
    //     return true;
    //   }).filter((element) => {return element.checked})[0].value;
    //   var elementVolume = element.childNodes[3].childNodes[1].childNodes[0].value;
    //   var elementRate = element.childNodes[4].childNodes[1].childNodes[0].value;
    //   var isElementEnabled = element.childNodes[1].childNodes[0].childNodes[0].childNodes[0].checked;
    //   var isElementPlaying = !element.childNodes[0].paused;
    //   var elementAudioURL = element.childNodes[0].currentSrc;
      
    //   return {
    //     id: elementid,
    //     selectedMidi: elementsSelectedMidi,
    //     volume: elementVolume,
    //     rate: elementRate,
    //     isEnabled: isElementEnabled,
    //     isPlaying: isElementPlaying,
    //     audioURL: elementAudioURL
    //   }
      
    // })
    // console.log(currentChannelElements)
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
      console.log(updatedMasterRate);
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
  let channel = getChannel(cmd, btnID);
  console.log("_________________________________________")
  console.log("\n" +
  "New Event (on Channel: "+channel+")==> Type: "+ cmd +
  ", Origin: "+btnID +
  ", Value: "+value);
}

const getChannel = (type, btnID) =>{
  if(btnID <52 && btnID >47){
     return btnID%4 + 1;
  }
  if(btnID > 17 && btnID <= 21){
    return (btnID-2)%4 +1;
  }
  if((type == 11 && btnID == 64)||
      ((type == 8 || type == 9) && btnID == 18)){
     return 0;
  }
}

  return (
    <div>
      <NewChannel
        nextAvailableID={nextID}
        defaultMidi={defaultMidi}
        defaultVolume={defaultVolume}
        defaultRate={defaultRate}
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
      volume={defaultVolume}
      rate={defaultRate}
      color={"#000000"}
      isPlaying={defaultIsPlaying}
      updateMasterRate = {updateMasterRate}
      masterRate = {masterRate}
      masterPlayPause = {masterPlayPause}
      >
      </Master>
    </div>
  );
}

export default App;
