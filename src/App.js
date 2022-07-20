import "./App.css";
import React, { useEffect, useState } from "react";
import Channels from "./components/Channels/Channels";
import NewChannel from "./components/Channels/NewChannel";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";
import Channel from "./components/Channels/Channel";
import Master from "./components/Master/Master";
import { masterOutputNode } from "./components/Master/Master";

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
  const [masterPlay, setMasterPlay] = useState(true);
  const [masterVolume, setMasterVolume] = useState(5 / 100);
  const [masterPlayMidi, setMasterPlayMidi] = useState(false);
  const [midiValues, setMidiValues]= useState([
    {
      volume: 0,
      rate: 0
    },
    {
      volume: 0,
      rate: 0
    },
    {
      volume: 0,
      rate: 0
    },
    {
      volume: 0,
      rate: 0
    }
  ])
  const [midiChanged, setMidiChanged] = useState(false);

  const addChannelHandler = (channel) => {
    setChannels((prevChannels) => {
      return [...channels, channel];
    });
  };

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
    setMasterPlay((old) => !old);
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
    if (btnID < 52 && btnID > 47) {
      index = btnID - 48
      setMidiValues((old) =>{
        old[index].volume = value/1.27;
        return old;
      })
      setMidiChanged((old) => !old)
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
      updateMasterRate(Math.ceil(mapped * 10) / 10);
      document.getElementById("masterSpeedValue").textContent =
        Math.ceil(mapped * 10) / 10;
    }
  };

  const updateMasterVolume = (updated) => {
    setMasterVolume((old) => updated);
  };

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
        setNextID={setNextID}
        addChannelHandler={addChannelHandler}
      />
      <Channels
        channels={channels}
        handleDestroyChannel={destroyChannel}
        masterRate={masterRate}
        masterPlay={masterPlay}
        midiValues={midiValues}
        midiChanged={midiChanged}
      ></Channels>
      <Master
        id={"master"}
        volume={masterVolume}
        rate={defaultRate}
        color={"#000000"}
        isPlaying={defaultIsPlaying}
        updateMasterRate={updateMasterRate}
        masterRate={masterRate}
        masterPlayPause={masterPlayPause}
        updateMasterVolume={updateMasterVolume}
        masterPlay={masterPlay}
        masterPlayMidi={masterPlayMidi}
      ></Master>
    </div>
  );
}

export default App;
