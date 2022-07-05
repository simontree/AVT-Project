import './dndCSS/DragAndDrop.css'
import React from "react";


class DragAndDrop extends React.Component {
    constructor(props) {
        super(props);
        this.dndRef = React.createRef();
        this.isPlaying = false;
    }
    allowedFileTypes = ["audio/wav", "audio/mpeg", "audio/ogg", "audio/x-ms-wma"]

    componentDidMount() {
        const active = () => this.dndRef.current.classList.add("green-border");
        const inactive = () => this.dndRef.current.classList.remove("green-border");
        const prevents = (event) => event.preventDefault();
        const handleNewChannel = (source, type) =>{ this.props.createNewChannel(source, type);}
        const handleDrop = (event) => {
            const dt = event.dataTransfer;
            const files = dt.files;
            for (const file of files) {
                if (this.allowedFileTypes.includes(file.type)) {
                    const reader = new FileReader();
                    reader.onload = function (ev) {
                        //console.log(source.src);
                        handleNewChannel(ev.target.result, file.type);
                    }
                    reader.readAsDataURL(file);
                }  else {
                    //Notification here
                    window.alert("Files of type: \"" + file.type + "\" are currently not supported. Please use a supported file type!");
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