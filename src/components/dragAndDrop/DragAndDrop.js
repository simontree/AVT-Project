import './dndCSS/DragAndDrop.css'
import React from "react";
import {Box, Grid} from '@mui/material'

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
        const handleNewChannel = (source, type, name) =>{ this.props.createNewChannel(source, type, name);}
        
        const handleDrop = (event) => {
            const dt = event.dataTransfer;
            const files = dt.files;
            for (const file of files) {
                const truncatedFileName = this.truncateFileName(file.name)
                if (this.allowedFileTypes.includes(file.type)) {
                    const reader = new FileReader();
                    reader.onload = function (ev) {
                        handleNewChannel(ev.target.result, file.type, truncatedFileName);
                    }
                    reader.readAsDataURL(file);
                }  else {
                    //Notification here
                    window.alert("Files of type: \"" + file.type + "\" are currently not supported. Please use a supported file type!");
                }
            }
            event.stopImmediatePropagation()
            prevents(event)
            inactive()
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

    truncateFileName(str){
        if(str.length <= 18){
            return str
        }
        return str.slice(0, 16) + '..'
    }

    render() {
        return (
            <Grid item>
                <Box className="droparea" ref={this.dndRef} style={{textAlign:'center'}}>
                    <p>Drag and Drop Area 
                        <br/><br/>Place your sound file here <br/> to create a new channel</p>
                </Box>
            </Grid>
        )
    }
}
export default DragAndDrop;