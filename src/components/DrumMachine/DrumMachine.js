import React, {useEffect, useState} from 'react';
import useTimer from './hooks/useTimer';
import Toolbar from './components/Toolbar';
import ClipsHeader from './components/ClipsHeader'
import TrackList from './components/TrackList'
import { Provider } from './hooks/useNoteContext'
import './DrumMachine.css'

function DrumMachine() {

  const [BPM, setBPM] = useState(128);
  const [startTime, setStartTime] = useState(null);
  const [pastLapsedTime, setPastLapsedTime] = useState(0);
  const [currentClipID, setCurrentClipID] = useState(null);

  const baseBpmOneSecond = 60;
  const barSteps = 8;
  const barBeats = 4;
  const sequenceBars = 1;
  const totalSteps = barSteps * sequenceBars;
  const totalBeats = barBeats * sequenceBars;
  const sequenceTime = baseBpmOneSecond / BPM * 1000 * totalBeats;
  const clipTime = sequenceTime / totalSteps
  const isPlaying = startTime
  const playerTime = useTimer(isPlaying)
  const lapsedTime = isPlaying ? Math.max(0, playerTime - startTime) : 0
  const totalLapsedTime = pastLapsedTime + lapsedTime

  useEffect(() => {
    if(isPlaying){
      setCurrentClipID(Math.floor(totalLapsedTime / clipTime) % totalSteps)
    } else{
      setCurrentClipID(null)
    }
  },[isPlaying, clipTime, totalLapsedTime, totalSteps])

  const toolBarProps = {
    setStartTime,
    setPastLapsedTime,
    setBPM,
    isPlaying,
    startTime,
    BPM
  }

  const trackListProps = {
    currentClipID
  }
  
  return (
    <Provider>
    <div className='drummachine'>
    <h1>Drum Machine</h1>
      <div className='drummachine_header'>
        <Toolbar {...toolBarProps}/>
      </div>
      <ClipsHeader count={totalSteps} {...trackListProps}/>
      <div className='drummachine_content'>
        <TrackList {...trackListProps}/>
      </div>
    </div>
    </Provider>
  );
}

export default DrumMachine;
