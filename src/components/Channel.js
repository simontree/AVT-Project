import './Channel.css'
import React from 'react';

const Channel = (props) => {

  const channelStateChange = (event) =>{
    console.log(event.target.checked);
  }
  const contextClicked = () =>{
    console.log("Channel context clicked.");
  }
  const playPauseClicked = () =>{
    console.log("Channel PlayPause clicked.");
  }
  const volSliderChange = (event) =>{
    console.log(event.target.value);
  }
  const speedSliderChange = (event) =>{
    console.log(event.target.value);
  }
  const midiChannelChange = (event) =>{
    console.log(event.target.value)
  }

  return (
    <div className="channel">
      <div className='switchContainer'>
        <label className="switch">
          <input type="checkbox" onClick={channelStateChange}/>
          <span className="slider round"></span>
        </label>
      </div>

      <div className='fileTitle'>
        <p>Placeholder for var</p>
      </div>

      <div className='channelContext'>
        <button onClick={contextClicked}>...</button>
      </div>

      <div className='channelPlay'>
        <button className='playButton' onClick={playPauseClicked}>Play</button>
      </div>

      <div className='volIcon'>
        <p>Vol</p>
      </div>
      <div className='volSlider'>
        <input type={'range'} min='0' max='99' onChange={volSliderChange}
        className='vSlider' id="volRange"></input>
      </div>

      <div className='speedIcon'>
        <p>Sp</p>
      </div>
      <div className='speedSlider'>
        <input type={'range'} min='0' max='99' onChange={speedSliderChange}
          className='vSlider' id="Range"></input>
      </div>


      <label className='midiText' >MidiChannel</label>
      <label className='container' id='midiChannel1'>1
        <input type={'radio'} name="radio" value={1} onClick={midiChannelChange}></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel2'>2
        <input type={'radio'} name="radio" value={2} onClick={midiChannelChange}></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel3'>3
        <input type={'radio'} name="radio" value={3} onClick={midiChannelChange}></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel4'>4
        <input type={'radio'} name="radio" value={4} onClick={midiChannelChange}></input>
        <span class='checkmark'></span>
      </label>

    </div>
  );
}

export default Channel;
/* */