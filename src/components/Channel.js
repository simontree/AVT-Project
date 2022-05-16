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
      </div>
      <div className='speedIcon'>
        <p>Sp</p>
      </div>
      <div className='speedSlider'>
      </div>
      <div className='midiText'>Midi Channel</div>
      <div className='midiChannel1'>O</div>
      <div className='midiChannel2'>O</div>
      <div className='midiChannel3'>O</div>
      <div className='midiChannel4'>O</div>

    </div>
  );
}

export default Channel;
/* */