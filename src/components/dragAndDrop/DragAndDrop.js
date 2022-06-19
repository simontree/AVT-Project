import './dndCSS/DragAndDrop.css'
import React from "react";


class DragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.dndRef = React.createRef();
        this.isPlaying = false;
        this.handleClick = this.playSong.bind(this);
    }
    allowedFileTypes = ["audio/wav", "audio/mp3", "audio/ogg"]

    componentDidMount() {
        const active = () => this.dndRef.current.classList.add("green-border");
        const inactive = () => this.dndRef.current.classList.remove("green-border");
        const prevents = (event) => event.preventDefault();
        const handleNewChannel = (source) =>{ this.props.createNewChannel(source);}
        const handleDrop = (event) => {
            const dt = event.dataTransfer;
            const files = dt.files;
            for (const file of files) {
                if (true) {
                    var reader = new FileReader();
                    reader.onload = function (ev) {
                        var audio = document.createElement('audio');
                        var source = document.createElement("source")
                        source.type = file.type;
                        source.src = ev.target.result;
                        audio.appendChild(source)
                        document.body.appendChild(audio);
                        console.log(source.src);
                        handleNewChannel(source.src);
                    }
                    reader.readAsDataURL(file);
                }  else {
                    //Notification here
                    window.alert("Files of type: " + file.type + "are currently not supported. Please use a supported file type!");
                }
            }
        }
        this.dndRef.current.addEventListener("drop", handleDrop);


        //Cosmetic Drag Effect
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(
            eventName => {
                this.dndRef.current.addEventListener(eventName, prevents);
            });

        ['dragenter', 'dragover'].forEach(eventName => {
            this.dndRef.current.addEventListener(eventName, active);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.dndRef.current.addEventListener(eventName, inactive);
        });
    }

    playSong() {
        const audiotack = document.getElementsByTagName("audio")[0];
        if (audiotack !== null && audiotack !== undefined) {
            if (this.isPlaying) {
                this.isPlaying = false;
                audiotack.pause();
            } else {
                this.isPlaying = true;
                audiotack.play();
            }
        }
    }

    render() {
        return (
            <div>
                <section className="droparea" ref={this.dndRef} >
                    <p>Drag and Drop Area</p>
                </section>
                <button onClick={this.handleClick}>Play</button>
            </div>
        )
    }
}
export default DragAndDrop;