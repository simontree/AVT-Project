import './ChannelCss/Channel.css';
import './ChannelCss/Switch.css';
import './ChannelCss/Slider.css';
import React from 'react';

const Channel = (props) => {
  const audioContext = new AudioContext();
  const primaryGainControl = audioContext.createGain();
  primaryGainControl.gain.setValueAtTime(0.15,0);

  var isPlaying = false;

  console.log(audioContext.sampleRate);
  const FILE_URL = "271417__soneproject__hats-6.wav";

  const channelStateChange = (event) =>{
    console.log(event.target.checked);
  }
  const contextClicked = () =>{
    console.log("Channel context clicked.");
  }
  const playPauseClicked = async () =>{
    props.playSong(FILE_URL, primaryGainControl);
    /*const oscl = audioContext.createOscillator();
    oscl.type="sine";
    oscl.frequency.setValueAtTime(300, audioContext.currentTime);

    primaryGainControl.connect(audioContext.destination);
    oscl.connect(primaryGainControl);
    oscl.start();
    oscl.stop(audioContext.currentTime+1);*/
    console.log("Channel PlayPause clicked. " + isPlaying);
  }
  const volSliderChange = (event) =>{
    const updatedVolume = event.target.value/100;
    primaryGainControl.gain.setValueAtTime(updatedVolume,audioContext.currentTime);
    console.log(event.target.value);
  }
  const speedSliderChange = (event) =>{
    console.log(event.target.value);
  }
  const midiChannelChange = (event) =>{
    console.log(event.target.value)
  }
  const addFilterEvent = (event) =>{
    console.log("Channel add filter clicked.");
  }

  return (
    <div className="channel2">
      <div className='channelTop'>
        <div className='switchContainer'>
          <label className="switch">
            <input type="checkbox" onClick={channelStateChange}/>
            <span className="slider round"></span>
          </label>
        </div>
        
        <div className='fileTitle'>
          <label>Placeholder for varrewrweerw</label>
        </div>

        <div className='channelContext'>
          <button onClick={contextClicked}>...</button>
        </div>
      </div>

      <div className='channelPlay'>
        <button className='playButton' onClick={playPauseClicked}>Play</button>
      </div>

      <div className='volumeControl'>
        <div className='volIcon'>
          <label>Vol</label>
        </div>
        <div className='volSlider'>
          <input type={'range'} min='0' max='99' onChange={volSliderChange}
          className='vSlider' id="volRange"></input>
        </div>
        <div className='volValue'>
          <label>5</label>
        </div>
      </div>

      <div className='speedControl'>
        <div className='speedIcon'>
          <label>Sp</label>
        </div>
        <div className='speedSlider'>
          <input type={'range'} min='0' max='99' onChange={speedSliderChange}
          className='sSlider' id="sRange"></input>
        </div>
        <div className='speedValue'>
          <label>5</label>
        </div>
      </div>
      
      <div className='midiChannelContainer'>
        <div className='midiLabel'>
          <label>Midi Channel</label>
        </div>
        <div className='midiChannels'>
          <input type="radio" id="m1" name="midiChannel" value="1" onChange={midiChannelChange}/>
          <label htmlFor="m1">1</label>
          <input type="radio" id="m2" name="midiChannel" value="2" onChange={midiChannelChange}/>
          <label htmlFor="m2">2</label>
          <input type="radio" id="m3" name="midiChannel" value="3" onChange={midiChannelChange}/>
          <label htmlFor="m3">3</label>
          <input type="radio" id="m4" name="midiChannel" value="4" onChange={midiChannelChange}/>
          <label htmlFor="m4">4</label>
        </div>
      </div>

      <hr className='breakLine'></hr>

      <div className='filterSection'>
        <label className='filterTitle'>Filters</label>
      </div>
      <div className='activeFilters'>
        <div className='filter'>
          <label value={'Name'}>Name</label>

        </div>
      </div>
      <div>
        <button className='addFilterButton' value={'Add Filter'}
        onClick={addFilterEvent}>
           Add Filter
        </button>
      </div>

    </div>
  );
}

export default Channel;
