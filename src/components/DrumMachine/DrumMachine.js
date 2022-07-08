import React, {useState} from 'react';
import PadRow from './PadRow';

//TODO: audioclips auslagern später
const audioClips =  [ 
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function DrumMachine() {

  const audioCtx = new AudioContext();

  const [bpm, setBpm] = useState(80);

  const [volume, setVolume] = useState(1);
  const [recording, setRecording] = useState("");


  //for sequencer
  const lookahead = 25.0;         // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1;  // How far ahead to schedule audio (sec)
  let currentNote = 0;
  let nextNoteTime = 0.0; // when the next note is due.
  let timerID;

  const scheduler = () => {
    // while there are notes that will need to play before the next interval,
    // schedule them and advance the pointer.
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime ) {
        scheduleNote(currentNote, nextNoteTime);
        nextNote();
    }
    timerID = window.setTimeout(scheduler, lookahead);
  }

  const nextNote = () => {
      const secondsPerBeat = 60.0 / bpm;
      nextNoteTime += secondsPerBeat; // Add beat length to last beat time
      // Advance the beat number, wrap to zero
      currentNote++;
      if (currentNote === 8) {
              currentNote = 0;
      }
  }

  // Create a queue for the notes that are to be played, with the current time that we want them to play:
  const notesInQueue = [];

  let soundSample;

  const scheduleNote = (beatNumber, time) => {
    notesInQueue.push({note: beatNumber, time: time});
    if(document.getElementById("Kick").querySelectorAll("button")[beatNumber].getAttribute("aria-checked") === "true"){
      console.log("play kick")
      play(audioCtx, soundSample, time)
    }
  }

  var lastNoteDrawn = 7;

  const pads = document.querySelectorAll(".pads");
  const [ariaChecked, setAriaChecked] = useState("");

  const draw = () => {
    let drawNote = lastNoteDrawn;
    let currentTime = audioCtx.currentTime;

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        drawNote = notesInQueue[0].note;
        notesInQueue.splice(0,1);   // remove note from queue
    }

    // We only need to draw if the note has moved.
    if (lastNoteDrawn !== drawNote) {
        pads.forEach(element => {
            console.log("element: "+element)
            element.children[lastNoteDrawn].style.borderColor = 'hsla(0, 0%, 10%, 1)';
            element.children[drawNote].style.borderColor = 'hsla(49, 99%, 50%, 1)';
        });

        lastNoteDrawn = drawNote;
    }
    // set up to draw again
    requestAnimationFrame(draw);
  }

  const play = (audioContext, audioBuffer, time) => {
    // console.log("play some sound")
    // const clipToFind = audioClips.find((clip) => clip.id === 'Kick');
    // console.log("clipToFind: "+clipToFind)

    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.connect(audioContext.destination)
    sampleSource.start(time);
    return sampleSource;
  }

  async function setupSample() {
    // const clipToFind = audioClips.find((clip) => clip.id === 'Kick').url;
    const clipToFind = 'kick.mp3';
    const sample = await getFile(audioCtx, clipToFind);
    return sample;
  }

  // Loading ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // fetch the audio file and decode the data
  async function getFile(audioContext, filepath) {
    try {
      const response = await fetch(filepath);
      console.log("response: "+response)
      const arrayBuffer = await response.arrayBuffer();
      console.log("arrayBuffer.byteLength: "+arrayBuffer.byteLength)
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer, function() {return});
      console.log("audioBuffer: "+audioBuffer)
      return audioBuffer;
    } catch (error) {
      return error;
    }
  }

  let isPlaying = false;

  const playButtonHandler = (e) => {
    e.preventDefault();

    setupSample()
    .then((sample) => {

      soundSample = sample;

      isPlaying = !isPlaying; //toggle between playing and stopping

      if(isPlaying){ //start to play
        if(audioCtx.state === 'suspended'){
          audioCtx.resume();
        }
        currentNote = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler();
        requestAnimationFrame(draw);
        e.target.dataset.playing = 'true';
      } else {
        window.clearTimeout(timerID);
        e.target.dataset.playing = 'false';
      }
    })
  }
    
  return (
    <div className="text-3xl text-center bg-blue-400">
      Drum Machine
      <br/>
      <section class="controls-main">
        <label for="bpm">BPM</label>
        <input 
        name="bpm" 
        id="bpm" 
        type="range" 
        min="50" 
        max="180" 
        onChange={(e) => setBpm(e.target.value)}
        value={bpm} 
        step="1" />
        <span id="bpmval">{bpm}</span>
        <button 
        class="ml-10 bg-white rounded-lg" 
        data-playing="false" 
        onClick={playButtonHandler}>Play</button>
      </section>
      <div id="Kick">
        <PadRow
        audioClips={audioClips} 
        padClip={"Kick"}
        // play={play} 
        />
      </div>
      <div id="Clap">
        <PadRow
        audioClips={audioClips} 
        padClip={"Clap"}/>
      </div>
    </div>
  );
}

export default DrumMachine;
