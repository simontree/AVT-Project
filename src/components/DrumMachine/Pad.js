import Button from 'react-bootstrap/Button';

function Pad({clip}){

    const playSound = () => {
        const audioTag = document.getElementById(clip.keyTrigger);
        audioTag.currentTime = 0;
        audioTag.play();
    }

    return(
      <div>
        <Button onClick={playSound} className="btn bg-slate-500 p-4 m-3">
        <audio className="clip" id={clip.keyTrigger} src={clip.url}/>
        {clip.keyTrigger}
        </Button>
      </div>
    )
};

export default Pad;