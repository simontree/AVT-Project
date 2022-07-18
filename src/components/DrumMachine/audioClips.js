const audioClips =  [ 
  {
    id: 0,
    title: 'initial state audio',
    notes: 8,
    clipList: [
      {
        title: 'Kick',
        soundFile: '/audiofiles/kick.wav',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Clap',
        soundFile: '/audiofiles/snare.wav',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Open-HH',
        soundFile: '/audiofiles/hh_open.wav',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Closed-HH',
        soundFile: '/audiofiles/hh_closed.wav',
        enabledNotes: [0,2,6]
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
        soundFile: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Clap',
        soundFile: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Open-HH',
        soundFile: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        enabledNotes: [0,2,6]
      },
      {
        title: 'Heater-1',
        soundFile: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        enabledNotes: [0,2,6]
      }
    ]
  }
]

export { audioClips }