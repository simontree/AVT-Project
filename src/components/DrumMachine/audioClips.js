const audioClips =  [ 
  {
    id: 0,
    title: 'initial state audio',
    notes: 8,
    clipList: [
      {
        title: 'Kick',
        soundFile: 'kick',
        enabledNotes: [0,2,6],
      },
      {
        title: 'Clap',
        soundFile: 'snare',
        enabledNotes: [1,3,5],
      },
      {
        title: 'Open-HH',
        soundFile: 'hh_open',
        enabledNotes: [0,2,6],
      },
      {
        title: 'Closed-HH',
        soundFile: 'hh_closed',
        enabledNotes: [0,2,6],
      }
    ]
  },
  {
    id: 1,
    title: '2nd audio clips',
    notes: 8,
    clipList: [
      {
        title: 'Kick',
        soundFile: 'kick',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Clap',
        soundFile: 'snare',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Open-HH',
        soundFile: 'hh_open',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Closed-HH',
        soundFile: 'hh_closed',
        enabledNotes: [0,2,6]
      }
    ]
  }
]

const soundFiles = {
  'kick': '../sounds/kick.wav',
  'snare': '../sounds/snare.wav',
  'hh_open': '../sounds/hh_open.wav',
  'hh_closed': '../sounds/hh_closed.wav'
}

export { audioClips, soundFiles }