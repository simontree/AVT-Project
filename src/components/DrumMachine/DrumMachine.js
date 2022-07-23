import React, {useEffect, useState} from 'react';
import useTimer from './hooks/useTimer';
import Toolbar from './components/Toolbar';
import ClipsHeader from './components/ClipsHeader'
import TrackList from './components/TrackList'
import { Provider } from './hooks/useNoteContext'
import './DrumMachine.css'
import { Grid, Container, Typography } from '@mui/material'

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
      <Container
      sx={{
        backgroundColor: 'rgb(2, 40, 79)',
        // marginLeft: '40px',
        marginTop: '20px',
        width: '900px',
        paddingTop: '20px',
        paddingBottom: '30px',
        borderRadius: '20px',
        border: 'solid 1px #3f6d91'
      }}>
        <Typography 
        variant="h5"
        sx={{
          textAlign: 'center', 
          marginBottom: 2,
          color: '#e3f2fd'}}>
          Drum Machine
        </Typography>
        <Grid container justifyContent='center'>
          <Toolbar {...toolBarProps}/>
        </Grid>
        <Grid container justifyContent='center'>
        <ClipsHeader count={totalSteps} {...trackListProps}/>
        <TrackList {...trackListProps}/>
        </Grid>
      </Container>
    </Provider>
  );
}

export default DrumMachine;
