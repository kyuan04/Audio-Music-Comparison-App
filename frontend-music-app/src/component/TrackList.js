import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import Player from "react-wavy-audio";
import ReactAudioPlayer from "react-audio-player";

export default function TrackList() {
    const [trackList, setTrackList] = useState();

    useEffect(() => {
        fetch("http://localhost:18080/api/v1/search")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTrackList(data);
            })
    }, [])

    return (
        <div>

            <h4>Track List</h4>
            <table className="table">
                <thead>
                <tr>
                    <th>Song Name</th>
                    <th>Play Preview</th>
                </tr>
                </thead>
                <tbody>
                {
                    trackList && trackList.map(
                        track =>
                            <tr key = {track.name}>
                                <td>{track.name}</td>
                                <td>
                                    <ReactAudioPlayer src ={track.previewUrl} controls/>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}