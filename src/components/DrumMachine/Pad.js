import React, {useState} from 'react';

function Pad(props){

    const [ariaChecked, setAriaChecked] = useState("");

    const playSound = () => {
        const audioTag = document.getElementById(props.clip.keyTrigger);
        audioTag.currentTime = 0;
        audioTag.play();
        audioTag.volume = props.volume;
        !ariaChecked ? setAriaChecked(true) : setAriaChecked(false);
        props.setPad(audioTag);   // to check which pad is played within drummachine.js
    }

    return(
      <div>
        <button type="button" role="switch" aria-checked={ariaChecked} onClick={playSound} className="pads p-4 m-3 box-border h-17 w-20">
        <audio className="clip" id={props.clip.keyTrigger} src={props.clip.url}/>
        {props.clip.keyTrigger}
        </button>
      </div>
    )
};

export default Pad;