import './App.css';
import React, { useEffect, useState } from 'react';
import Channels from "./components/Channels/Channels";
import NewChannel from './components/Channels/NewChannel';
import { toBeChecked } from '@testing-library/jest-dom/dist/matchers';

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
  },
  {
    id: 1,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
  },
  {
    id: 2,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
  },
  {
    id: 3,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
  },
  {
    id: 4,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl,
  },
];

function App() {

  const [channels, setChannels] = useState([]);
  const [nextID, setNextID] = useState(5);
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
    console.log(channels);
  },[midiIsUpdated])

  useEffect(()=>{
  })

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
        addChannelHandler={addChannelHandler}
        setNextID={setNextID}
      />
      <Channels 
        channels={channels}
        requestRadioButtons={requestRadioButtons}
        requestNumberOfChannels={requestNumberOfChannels}
        testChannelModification={testChannelModification}
        handleDestroyChannel={destroyChannel}
      ></Channels>
      
    </div>
  );
}

export default App;
