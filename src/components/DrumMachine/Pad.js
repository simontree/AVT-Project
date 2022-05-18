import React, {useState} from 'react';

function Pad({clip, volume, setRecording}){

    const [ariaChecked, setAriaChecked] = useState(false);

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        const button = document.querySelector('button');
        audioTag.currentTime = 0;
        audioTag.play();
        audioTag.volume = volume;
        !ariaChecked ? setAriaChecked(true) : setAriaChecked(false);
    }

    return(
      <div>
        <button role="switch" aria-checked={ariaChecked} onClick={playSound} className="btn bg-slate-500 p-4 m-3 box-border h-17 w-20">
        <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
        {clip.keyTrigger}
        </button>
      </div>
    )
};

export default Pad;