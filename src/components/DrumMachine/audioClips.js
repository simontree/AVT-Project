const audioClips =  [ 
  {
    id: 0,
    title: 'Audio clips SY1',
    notes: 8,
    clipList: [
      {
        title: 'Kick',
        soundFile: 'kick',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Open-HH',
        soundFile: 'hh_open',
        enabledNotes: [2]
      },
      {
        title: 'Snare',
        soundFile: 'snare',
        enabledNotes: [3]
      },
      {
        title: 'Tom',
        soundFile: 'tom',
        enabledNotes: [1,3,5,7]
      }
    ]
  }
]

const soundFiles = {
  'kick': '../sounds/RDM_TapeA_SY1-Kick01.wav',
  'hh_open': '../sounds/RDM_TapeA_SY1-OpHat.wav',
  'snare': '../sounds/RDM_TapeA_SY1-Snr03.wav',
  'tom': '../sounds/RDM_TapeA_SY1-Tom02.wav'
}

export { audioClips, soundFiles }