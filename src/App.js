import './App.css';
import { useEffect, useState } from 'react';
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

const DUMMY_CHANNELS = [
  {
    id: 0,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl
  },
  {
    id: 1,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl
  },
  {
    id: 2,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl
  },
  {
    id: 3,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl
  },
  {
    id: 4,
    selectedMidi: defaultMidi,
    volume: defaultVolume,
    rate: defaultRate,
    isEnabled: defaultState,
    isPlaying: defaultIsPlaying,
    audioURL: defaultAudioUrl
  },
];

function App() {

  const [channels, setChannels] = useState(DUMMY_CHANNELS);
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
      radios = Array.from(document.getElementById("radioButtons" + i).children)
      .filter((element) => {
        return element.localName === 'input';
      });
      checked = radios.filter((element) => {return element.checked})
      if(checked.length==0) {
        radios[4].checked = true;
      }
    }
  }
  useEffect(()=>{
    var radios = Array.from(document.querySelectorAll("input[type='radio']"))
    .filter((element) => {return element.checked});
    for(var i = 0; i < channels.length; i++){
      channels[i].selectedMidi = parseInt(radios[i].value)
    }
    console.log(channels);
  },[midiIsUpdated])

  return (
    <div>
      <Channels 
        channels={channels}
        requestRadioButtons={requestRadioButtons}
        requestNumberOfChannels={requestNumberOfChannels}
        testChannelModification={testChannelModification}
      ></Channels>
      <NewChannel
        nextAvailableID={channels.length}
        defaultMidi={defaultMidi}
        defaultVolume={defaultVolume}
        defaultRate={defaultRate}
        defaultState={defaultState}
        defaultIsPlaying={defaultIsPlaying}
        defaultAudioUrl={defaultAudioUrl}
        addChannelHandler={addChannelHandler}
      />
    </div>
  );
}

export default App;
