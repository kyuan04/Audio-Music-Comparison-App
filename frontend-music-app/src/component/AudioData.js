import React, {useEffect, useState} from "react";
import SongDataService from "../service/SongDataService";

export default function AudioData() {
    const [audioData, setAudioData] = useState();
    const data = {
        soundtrack1: "abc",
        soundtrack2: "123"
    };
    useEffect(() => {
        SongDataService.displayAudioData(data)
            .then(response => {
                console.log(response.data.imageData);
                setAudioData(response.data.imageData);
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

    console.log(audioData)
    return (
        <div>
            <h5>Audio Graph</h5>
            <img src={audioData}/>
        </div>
    );

}