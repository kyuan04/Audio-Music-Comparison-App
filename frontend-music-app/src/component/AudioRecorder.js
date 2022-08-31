import {Recorder} from 'react-voice-recorder';
//import Recorder from 'recorder-js';
import 'react-voice-recorder/dist/index.css';
import Player from "react-wavy-audio";
import axios from "axios";
import { useReactMediaRecorder } from "react-media-recorder";
import React, {Component, useEffect, useState} from "react";
import SongDataService from "../service/SongDataService";
import ReactAudioPlayer from "react-audio-player";

export default class AudioRecorder extends Component{
    constructor(props) {
        super(props);
        this.state = {
            audioURL: null,
            blobUrl: null,
            audioDetails: {
                url: null,
                blob: null,
                chunks: null,
                duration: {
                    h: 0,
                    m: 0,
                    s: 0
                }
            }
        };
    }
    handleAudioStop(data) {
        console.log(data);
        const blob = new Blob([data.blob], {type: "audio/wav"});
        console.log(blob);
        const url = URL.createObjectURL(blob);
        this.setState({ audioDetails: data, audioUrl: data.url, blobUrl: url });
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(data.url);

            reader.onload = () =>
                resolve({
                    fileName: data.title,
                    base64: reader.result
                });
            reader.onerror = reject;
        });
        console.log("audioUrl: "+ this.state.audioUrl);
        console.log(this.state.audioDetails);

        //console.log(data);
    }

    handleAudioUpload(blob) {
        console.log(blob);
        SongDataService.uploadSong(blob, "me", "me");
        console.log("posted to database");
    }


    handleReset() {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {
                h: 0,
                m: 0,
                s: 0
            }
        };
        this.setState({ audioDetails: reset });
    }
    render() {
        return (
            <div className="AudioRecorder">
                <Recorder
                    hideHeader
                    record={true}
                    title={"New recording"}
                    audioURL={this.state.audioDetails.url}
                    showUIAudio
                    handleAudioStop={(data) => this.handleAudioStop(data)}
                    handleAudioUpload={(data) => this.handleAudioUpload(data)}
                    saveAudio
                    handleReset={() => this.handleReset()}
                    uploadButtonDisabled = {false}
                />
                <p>Recorded Audio</p>
                <div>
                <Player
                    audioUrl= "file_example_WAV_2MG.wav"
                    waveStyles={{
                        cursorWidth: 1,
                        progressColor: "#ee3ec9",
                        responsive: true,
                        waveColor: "#121640",
                        cursorColor: "transparent",
                        barWidth: 0
                    }}
                    zoom={0}
                    //waveJson
                    hideImage="true"
                    //hideWave="true"
                />
                </div>
                <ReactAudioPlayer src = {this.state.blobUrl} controls/>
            </div>
        );
    }
}