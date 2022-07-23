# React Audio FX Tool

Dies ist eine Projektarbeit im Rahmen des Kurses "Audio & Videotechnik". Mit React blabla...

## Verwendete Frameworks und Libraries

- React
- Web Audio API
- Material UI

## Features

- Drag and Drop von Audiofiles 
    - unterstützte Formate: wav, mpeg, ogg, x-ms-wma
- Bis zu vier verschiedene Audio-Channels
    - je Channel diverse Funktionen:
        - Abspielen & Pausieren einer Soundfile
        - Lautstärkeregelung
        - drei Filter (Lowpass, Bandpass, Highpass) die jeweils an- bzw. ausgeschaltet werden können
        - Löschen eines Channels
- Masterchannel zur Steuerung von Lautstärke und Geschwindigkeit sowie Wiedergabe oder Pausieren aller Elemente (bis zu vier Channels, Drum-Machine(nur Lautstärke))
- Anbindung eines externen Midi-Controllers
- Drum-Machine 
    - vier verschiedene Tracks (Kick, Cowbell, Snare, Tom)
    - je Track 8 Notes ein- und ausschaltbar
    - Wiedergabe, Pausieren und Stoppen der Machine 
    - BPM-Steuerung

## Setup

### Midicontroller
- Infos folgen..

### lokale Installation
 1. Git-Repo in lokales Verzeichnis clonen
 2. in Terminal "npm i" eingeben um alle Dependencies lokal zu installieren
 3. "npm start" in Terminal eingeben um Browser-Anwendung auf localhost zu starten

## Anleitung zur Nutzung


## Empfohlene weitere Schritte

Mit etwas mehr Zeit könnten folgende Features folgen:
- Visualisierung der Audiodaten einzelner Channels
- Dropdown Menü zur Auswahl von weiteren Drum-Machine-Samples
- Light / Dark-Theme Switch