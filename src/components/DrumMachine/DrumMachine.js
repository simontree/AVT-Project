import Pad from './Pad';
import React, {useState} from 'react';

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

  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");

  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ");

    const interval = setInterval(() => {
      const audioTag = document.getElementById(recordArray[index]);
      audioTag.volume = volume;
      audioTag.currentTime = 0;
      audioTag.play();
      index++;
    }, 300);
    setTimeout(
      () => clearInterval(interval),
      300 * recordArray.length -1
    )
  };
    
  return (
    <div className="text-3xl text-center bg-blue-400">
      Drum Machine
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
        </>
      )}
    </div> 
  );
}

export default DrumMachine;