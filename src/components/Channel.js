import './Channel.css'
import React from 'react';

function Channel() {

  return (
    <div className="channel">
      <div className='switchContainer'>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>

      <div className='fileTitle'>
        <p>Placeholder for var</p>
      </div>

      <div className='channelContext'>
        <button>...</button>
      </div>

      <div className='channelPlay'>
        <button className='playButton'>Play</button>
      </div>

      <div className='volIcon'>
        <p>Vol</p>
      </div>
      <div className='volSlider'>
        <input type={'range'} min='0' max='99' 
        className='vSlider' id="volRange"></input>
      </div>

      <div className='speedIcon'>
        <p>Sp</p>
      </div>
      <div className='speedSlider'>
        <input type={'range'} min='0' max='99' 
          className='vSlider' id="spRange"></input>
      </div>


      <div className='midiText'>Midi Channel</div>
      <label className='container' id='midiChannel1'>1
        <input type={'radio'} name="radio" ></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel2'>2
        <input type={'radio'} name="radio"></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel3'>3
        <input type={'radio'} name="radio"></input>
        <span class='checkmark'></span>
      </label>
      <label className='container' id='midiChannel4'>4
        <input type={'radio'} name="radio"></input>
        <span class='checkmark'></span>
      </label>

    </div>
  );
}

export default Channel;
/* */