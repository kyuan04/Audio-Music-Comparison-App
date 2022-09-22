import React, {useEffect, useState} from "react";
import SongDataService from "../service/SongDataService";
import {blobToBase64, fileUrlToUrl, urlToBlob} from 'blob-url-file'
import axios from 'axios'
import audioRecorder from "./AudioRecorder";

export default function AudioData({recordedAudio}) {
    let url1 = "http://localhost:8080/audios/CantinaBand60.wav";
    const url2 = "http://localhost:8080/audios/file_example_WAV_2MG.wav"

    const [audio1Data, setAudio1Data] = useState();
    const [audio2Data, setAudio2Data] = useState();
    const [similarity, setSimilarity] = useState();

    useEffect(() => {
        console.log(recordedAudio);
        /*const reader = new FileReader();
        reader.readAsDataURL(recordedAudio);
        reader.onloadend = function (e) {
            const base64String = reader.result;
            const data = {
                recordedAudio: url1,
                baseAudio: url2
            };

            SongDataService.displayAudioData(data)
                .then(response => {
                    console.log(response);
                    setAudio1Data(response.data.image1Data);
                    setAudio2Data(response.data.image2Data);
                })
                .catch(error => console.log(error))
        }
        console.log(reader);*/

        const data = {
            recordedAudio: url1,
            baseAudio: url2
        };

        SongDataService.displayAudioData(data)
            .then(response => {
                console.log(response);
                setAudio1Data(response.data.image1Data);
                setAudio2Data(response.data.image2Data);
                setSimilarity(response.data.similarity);
            })
            .catch(error => console.log(error))

        /*fetch("http://localhost:8084/api/v1/compare", {method:'POST'})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setAudioData(data.imageData);
                console.log(audioData);
            }*/

    }, [])

    return (
        <div key={recordedAudio}>
            <h5>Audio Graph</h5>
            <table className="table">
                <tr>
                    <td>
                        <img src={audio1Data}/>
                    </td>
                    <td>
                        <img src={audio2Data}/>
                    </td>
                </tr>
            </table>
            <h5>The average cross correlation is {similarity}</h5>
        </div>
    );

}