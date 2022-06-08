import logo from './logo.svg';
import './App.css';
import Channel from './components/Channel';
import { useState } from 'react';

let audioContext = new AudioContext();
let out = audioContext.destination;
let primaryGainControl = audioContext.createGain();

function App() {
  const [FILE, setFILE] = useState();
  const [gainVal, setGainVal] = useState();
  const playSong = async (FILE_URL, gainValue) =>{
    setFILE("./chicken.wav");
    setGainVal(gainValue);
    console.log(FILE + " " + gainVal.gain.value);
    const response = await  fetch(FILE);
    
    const soundBuffer = await response.arrayBuffer();
    console.log(soundBuffer);
    const songBuffer = await audioContext.decodeAudioData(soundBuffer);  

    const songSource = audioContext.createBufferSource();
    songSource.buffer = songBuffer;
    songSource.connect(primaryGainControl);
    songSource.start();
    songSource.stop(audioContext.currentTime+1);
  }

  return (
    <div>
      <Channel playSong={playSong}></Channel>
    </div>
  );
}

export default App;
