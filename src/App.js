import './App.css';
import Channel from './components/Channel';
import { useState } from 'react';

export const audioContext = new AudioContext();
export const out = audioContext.destination;
export const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05,0);

function App() {
  const [FILE, setFILE] = useState();
  const [gainVal, setGainVal] = useState();
  const a = process.env.REACT_APP_PUBLIC_URL;
  console.log(a)
  return (
    <div>
      <Channel></Channel>
    </div>
  );
}

export default App;
