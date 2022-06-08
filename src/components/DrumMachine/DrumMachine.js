import Pad from './Pad';
import React, {useState} from 'react';
import PadRow from './PadRow';

//TODO: audioclips auslagern später
const audioClips =  [ 
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function DrumMachine() {

  // for cross browser compatibility
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  const [bpm, setBpm] = useState(80);

  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");
  const [speed, setSpeed] = useState(0.5);

  //for sequencer
  const lookahead = 25.0;         // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1;  // How far ahead to schedule audio (sec)

  let currentNote = 0;
  let nextNoteTime = 0.0; // when the next note is due.

  function nextNote() {
      const secondsPerBeat = 60.0 / bpm;
      nextNoteTime += secondsPerBeat; // Add beat length to last beat time
      // Advance the beat number, wrap to zero
      currentNote++;
      if (currentNote === 8) {
              currentNote = 0;
      }
  }

  const notesInQueue = [];

  const [pad, setPad] = useState("");

  console.log("pad: "+pad);

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");
    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, speed * 600);
    setTimeout(
      () => clearInterval(interval),
      600 * speed * recordArray.length -1
    )
  };
    
  return (
    <div className="text-3xl text-center bg-blue-400">
      Drum Machine - Final
      <br/>
      <section class="controls-main">
        <label for="bpm">BPM</label>
        <input 
        name="bpm" 
        id="bpm" 
        type="range" 
        min="50" 
        max="180" 
        onChange={(e) => setBpm(e.target.value)}
        value={bpm} 
        step="1" />
        <span id="bpmval">{bpm}</span>
        <button class="ml-10" data-playing="false">Play</button>
      </section>
          <PadRow audioClips={audioClips} padClip={"Kick"} volume={volume} setPad={setPad}/>
          <PadRow audioClips={audioClips} padClip={"Clap"} volume={volume} setPad={setPad}/>
      <br/>
      <hr/>
      <br/>
      Drum Machine - All Clips and Random features
      <div className="flex">
      {audioClips.map(clip => (
        <Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording}/>
      ))}</div>
      <br/>
      <h4>Volume</h4>
        <input 
        type="range" 
        step="0.01" 
        onChange={(e) => setVolume(e.target.value)}
        value={volume} 
        max="1" 
        min="0"/> 
      <h3>{recording}</h3>
      {/* check if recording is not empty, if so show buttons*/}
      {recording && (
        <>
        <button onClick={playRecording} class="bg-green-500 rounded-full p-2 text-base text-white mt-5 hover:rounded-lg ">
          Play</button>
        <button onClick={() => setRecording("")} class="bg-red-500 rounded-full p-2 text-base text-white hover:rounded-lg">
          Clear</button>
          <br/>
          <h4 class="mt-5">Speed</h4>
        <input 
          type="range" 
          step="0.01" 
          onChange={(e) => setSpeed(e.target.value)}
          value={speed} 
          max="1.2" 
          min="0.1"/> 
        </>
      )}
    </div> 
  );
}

export default DrumMachine;
