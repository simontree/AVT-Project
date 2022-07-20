const audioClips =  [ 
  {
    id: 0,
    title: 'Audio clips 1',
    notes: 8,
    clipList: [
      {
        id: 0,
        title: 'Kick',
        soundFile: 'kick',
        enabledNotes: [0,2,6]
      },
      {
        id: 1,
        title: 'Cowbell',
        soundFile: 'cowbell',
        enabledNotes: [2]
      },
      {
        id: 2,
        title: 'Snare',
        soundFile: 'snare',
        enabledNotes: [3]
      },
      {
        id: 3,
        title: 'Tom',
        soundFile: 'tom',
        enabledNotes: [1,3,5,7]
      }
    ]
  },
  {
    id: 1,
    title: 'Audio clips 2',
    notes: 8,
    clipList: [
      {
        id: 0,
        title: 'Kick2',
        soundFile: 'kick2',
        enabledNotes: [0,2,6]
      },
      {
        id: 1,
        title: 'Cowbell',
        soundFile: 'cowbell',
        enabledNotes: [2]
      },
      {
        id: 2,
        title: 'Snare2',
        soundFile: 'snare2',
        enabledNotes: [3]
      },
      {
        id: 3,
        title: 'Tom2',
        soundFile: 'tom2',
        enabledNotes: [1,3,5,7]
      }
    ]
  }
]

const soundFiles = {
  //track1 files
  'kick': '../sounds/track1/RDM_TapeA_SY1-Kick01.wav',
  'kick2': '../sounds/track1/RDM_Raw_MT40-Kick02.wav',
  //track2 files
  'hh_open': '../sounds/track2/RDM_TapeA_SY1-OpHat.wav',
  'cowbell': '../sounds/track2/808-cowbell.wav',
  //track3 files
  'snare': '../sounds/track3/RDM_TapeA_SY1-Snr03.wav',
  'snare2': '../sounds/track3/RDM_Raw_SY1-Snr02.wav',
  //track4 files
  'tom': '../sounds/track4/RDM_TapeA_SY1-Tom02.wav',
  'tom2': '../sounds/track4/RDM_Raw_SY1-Tom03.wav'
}

export { audioClips, soundFiles }