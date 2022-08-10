import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import { WaveformContainer, Wave, PlayButton } from "./Waveform.styled";
//import "./Waveform.css";

class Waveform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false
        };
    }

    componentDidMount() {
        console.log("Waveform component mounted")
        const track = document.querySelector("#track");

        this.waveform = WaveSurfer.create({
            barWidth: 3,
            cursorWidth: 1,
            container: "#waveform",
            backend: "WebAudio",
            height: 80,
            progressColor: "#2D5BFF",
            responsive: true,
            waveColor: "#EFEFEF",
            cursorColor: "transparent"
        });

        this.waveform.load(track);
        console.log(track)
    }

    handlePlay = () => {
        this.setState({ playing: !this.state.playing });
        this.waveform.playPause();
    };

    render() {
        //const url = "https://api.twilio.com//2010-04-01/Accounts/AC25aa00521bfac6d667f13fec086072df/Recordings/RE6d44bc34911342ce03d6ad290b66580c.mp3";
        //const url = "file_example_WAV_2MG.wav";

        return (
            /*<div className="WaveformContainer">
                    <div className="PlayButton" onClick={this.handlePlay}>
                        {!this.state.playing ? "Play" : "Pause"}
                    </div>
                    <div className="Wave"/>
                    <audio id="track" src={url} />
                </div>*/
            <WaveformContainer>
                <PlayButton onClick={this.handlePlay}>
                    {!this.state.playing ? "Play" : "Pause"}
                </PlayButton>
                <Wave id="waveform" />
                <audio id="track" src={this.props.songUrl} />
            </WaveformContainer>
        );
    }
}

export default Waveform;
