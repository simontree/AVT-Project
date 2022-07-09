import React, {useEffect, useState} from 'react';
import useTimer from './hooks/useTimer';
import Toolbar from './components/Toolbar';
import Steps from './components/Steps'
import TrackList from './components/TrackList'

function DrumMachine() {

  const baseBpmOneSecond = 60;
  const barSteps = 8;
  const barBeats = 4;
  const sequenceBars = 2;
  const totalSteps = barSteps * sequenceBars;
  const totalBeats = barBeats * sequenceBars;

  const [bpm, setBpm] = useState(80);
  const [startTime, setStartTime] = useState(null);
  const [pastLapsedTime, setPastLapsedTime] = useState(0);
  const [currentStepID, setCurrentStepID] = useState(null);

  const sequenceTime = baseBpmOneSecond / bpm * 1000 * totalBeats;
  const stepTime = sequenceTime / totalSteps;
  const isSequencePlaying = startTime !== null
  const playerTime = useTimer(isSequencePlaying)
  const lapsedTime = isSequencePlaying ? Math.max(0, playerTime - startTime) : 0
  const totalLapsedTime = pastLapsedTime + lapsedTime

  useEffect(() => {
    if(isSequencePlaying){
      setCurrentStepID(Math.floor(totalLapsedTime / stepTime) % totalSteps)
    } else{
      setCurrentStepID(null)
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
    currentStepID
  }
  
  return (
    <div>
    <h1>Drum Machine</h1>
    <Toolbar {...toolBarProps}/>
      <Steps count={totalSteps}/>
      <div>
        <TrackList {...trackListProps}/>
      </div>
    </div>
  );
}

export default DrumMachine;
