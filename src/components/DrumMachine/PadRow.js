import Pad from './Pad';
/**
 * @param {padClip} - e.g. Kick, Hi-Hat or any other sample that needs to be inserted into row
 */
function PadRow(props){
    const padToFind = props.audioClips.find((clip) => clip.id === props.padClip);
    const padArray = []
    const loopPad = () => {
      for(let i=0; i<8;i++){
        padArray.push(<li>
          <button 
          key={padToFind.id} 
          className="pads p-4 m-3 box-border h-17 w-20"
          type="button" 
          role="switch" 
          aria-checked={props.ariaChecked} 
          onClick={props.play} 
          >
          <audio 
          className="clip" 
          id={padToFind.keyTrigger} 
          src={padToFind.url}
          />
          {padToFind.keyTrigger}
          </button>
          </li>
          )
      };
    };
    loopPad();

    return(
        <section>
            <ul class="grid grid-cols-10">
                <li class="mt-7">{props.padClip}</li>
            {padArray}
            </ul>
        </section>
    );
}

export default PadRow;