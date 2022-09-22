import React from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import AudioData from "./AudioData";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class AudioRecorder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isRecording: false,
            blobData: null,
            blobURL: '',
            isBlocked: false,
        };
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                const url = URL.createObjectURL(blob)
                this.setState({ blobURL: url, isRecording: false, blobData: blob }, this.showUrl);
            }).catch((e) => console.log(e));
    };

    showUrl = () => {
        console.log(this.state.blobData)
    }

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    render() {
        if (this.state.blobURL === '') {
            return (
                <div className="App">
                    <header className="App-header">
                        <h5>Record Audio</h5>
                        <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
                        <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                        <audio src={this.state.blobURL} controls="controls" />
                    </header>
                </div>
            );
        } else {
            return (
                <div className="App">
                    <header className="App-header">
                        <h5>Record Audio</h5>
                        <button onClick={this.start} disabled={this.state.isRecording}>Record</button>
                        <button onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
                        <audio src={this.state.blobURL} controls="controls" />
                        <AudioData recordedAudio={this.state.blobURL} />
                    </header>
                </div>
            );
        }
    }
}

export default AudioRecorder;