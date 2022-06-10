import './dndCSS/DragAndDrop.css'
import React from "react";


class DragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.dndRef = React.createRef();
        this.playRef = React.createRef();
        this.isPlaying = false;
        this.handleClick = this.playSong.bind(this);
    }

    componentDidMount() {
        const active = () => this.dndRef.current.classList.add("green-border");
        const inactive = () => this.dndRef.current.classList.remove("green-border");
        const prevents = (event) => event.preventDefault();
        const handleDrop = (event) => {
            const dt = event.dataTransfer;
            const files = dt.files;
            for (const file of files) {
                console.log(file.name)
                //let audio = document.createElement("audio");
                //audio.setAttribute("src", dt.getData('url'));
                //document.body.appendChild(audio);
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
            </div>
        )
    }
}
export default DragAndDrop;