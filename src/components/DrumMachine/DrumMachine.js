import React, {useEffect, useState} from 'react';
import useTimer from './hooks/useTimer';
import Toolbar from './components/Toolbar';
import ClipsHeader from './components/ClipsHeader'
import TrackList from './components/TrackList'
import { Provider } from './hooks/useNoteContext'
import './DrumMachine.css'

function DrumMachine() {

  const baseBpmOneSecond = 60;
  const barSteps = 8;
  const barBeats = 4;
  const sequenceBars = 1;
  const totalSteps = barSteps * sequenceBars;
  const totalBeats = barBeats * sequenceBars;

  const [bpm, setBpm] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [pastLapsedTime, setPastLapsedTime] = useState(0);
  const [currentClipID, setCurrentClipID] = useState(null);

  const sequenceTime = baseBpmOneSecond / bpm * 1000 * totalBeats;
  const stepTime = sequenceTime / totalSteps;
  const isSequencePlaying = startTime !== null
  const playerTime = useTimer(isSequencePlaying)
  const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
  const totalLapsedTime = pastLapsedTime + lapsedTime

  useEffect(() => {
    if(isSequencePlaying){
      setCurrentClipID(Math.floor(totalLapsedTime / stepTime) % totalSteps)
    } else{
      setCurrentClipID(null)
    }
  },[isSequencePlaying, stepTime, totalLapsedTime, totalSteps])

  const toolBarProps = {
    setStartTime,
    setPastLapsedTime,
    setBpm,
    isSequencePlaying,
    startTime,
    bpm
  }

  const trackListProps = {
    currentClipID
  }
  
  return (
    <Provider>
    <div>
    <h1>Drum Machine</h1>
    <Toolbar {...toolBarProps}/>
      <ClipsHeader count={totalSteps} {...trackListProps}/>
      <div>
        <TrackList {...trackListProps}/>
      </div>
    </div>
    </Provider>
  );
}

export default DrumMachine;
