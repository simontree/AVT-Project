import Pad from './Pad';
/**
 * @param {padClip} - e.g. Kick, Hi-Hat or any other sample that needs to be inserted into row
 */
function PadRow({audioClips, padClip, volume}){
    const padToFind = audioClips.find((clip) => clip.id === padClip);
    const padArray = []
    const loopPad = () => {
      for(let i=0; i<8;i++){
        padArray.push(<li><Pad key={padToFind.id} clip={padToFind} volume={volume}/></li>)
      };
    };
    loopPad();

    return(
        <section>
            <ul class="grid grid-cols-10">
                <li class="mt-7">{padClip}</li>
        {padArray}
        </ul>
        </section>
    );
}

export default PadRow;