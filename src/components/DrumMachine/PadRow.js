import { propTypes } from 'react-bootstrap/esm/Image';
import Pad from './Pad';
/**
 * @param {padClip} - e.g. Kick, Hi-Hat or any other sample that needs to be inserted into row
 */
function PadRow(props){
    const padToFind = props.audioClips.find((clip) => clip.id === props.padClip);
    // props.setPad(padToFind.id);
    const padArray = []
    // console.log(padArray);
    const loopPad = () => {
      for(let i=0; i<8;i++){
        padArray.push(<li><Pad key={padToFind.id} clip={padToFind} volume={props.volume} setPad={props.setPad}/></li>)
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