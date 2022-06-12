import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Channel from "./components/Channel";

export const audioContext = new AudioContext();
export const out = audioContext.destination;
export const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.4, 0);
primaryGainControl.connect(out);

var channels = 0;
var audioTags = [];
const requestChannelID = () => {return channels++;}
const requestRadioButtons = () => {return Array.from(document.querySelectorAll("input[type='radio']"));}
const requestNumberOfChannels = () => {return Array.from(document.getElementsByClassName("channel")).length;}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <div>
    <Channel
      requestChannelID={requestChannelID}
      requestRadioButtons={requestRadioButtons}
      requestNumberOfChannels={requestNumberOfChannels}
    />
    <Channel
      requestChannelID={requestChannelID}
      requestRadioButtons={requestRadioButtons}
      
      requestNumberOfChannels={requestNumberOfChannels}
    />
    <Channel
      requestChannelID={requestChannelID}
      requestRadioButtons={requestRadioButtons}
      requestNumberOfChannels={requestNumberOfChannels}
    />
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
