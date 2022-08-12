import React, { Component } from "react";
import {useState} from "react";
import SongDataService from "../service/SongDataService";
import {Link, useHref} from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';
import ReactPlayer from 'react-player';

import Waveform from "./Waveform";
import WaveformContainer from "./WaveformContainer";

class SongsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveSongs = this.retrieveSongs.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveSong = this.setActiveSong.bind(this);
        //this.removeSong = this.removeSong.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.setSongUrl = this.setSongUrl.bind(this);
        //this.downloadSong = this.downloadSong.bind(this);
        //this.saveByteArray = this.saveByteArray.bind(this);

        this.state = {
            songs: [],
            songUrl: "http://localhost:8080/audios/file_example_MP3_1MG.mp3",
            songName: "",
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        console.log("componentDidMount called.")
        this.retrieveSongs();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    retrieveSongs() {
        SongDataService.listAllSongs()
        //SongDataService.findByTitle("m4a")
            .then(response => {
                this.setState({
                    songs: response.data
                });
                console.log(response.data);
                console.log(typeof(response.data));
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveSongs();
        this.setState({
            songName: "",
            currentIndex: -1
        });
    }

    setActiveSong(song, index) {
        this.setState({
            songName: song.songName,
            currentIndex: index,
            songUrl: song.url
        });
    }

    /*removeSong(id) {
        SongDataService.deleteSong(id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }*/

    searchTitle() {
        this.setState({
            songName: "",
            currentIndex: -1
        });

        SongDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    songs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    setSongUrl(song) {
        this.setState({
            songUrl: song.url
        }, () => {
            console.log(this.state.songUrl)
        })
        //console.log(song)
        //console.log(this.state.songUrl)
        //Waveform.setUrl(song.url);
    }

    /*saveByteArray(reportName, byte) {
        console.log("saveByteArray called");
        const blob = new Blob([byte], {type: "audio/wav"});
        console.log("blob created");
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        const fileName = reportName;
        link.download = fileName;
        link.click();
    };



    downloadSong(song) {
        console.log("downloadSong called")
        this.setState({
            songName: song.songName,
        });
        console.log(this.state.songName);
        console.log(song.id);

        SongDataService.downloadSong(song.id)
            //SongDataService.findByTitle("m4a")
            .then(response => {
                this.setState({
                    songData: response.data,
                    songName: song.songName
                });
                //console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
        console.log(this.state.songName)
        this.saveByteArray(this.state.songName, this.state.songData);
        console.log("song downloaded");
    }*/

    render() {
        const { songs, searchTitle, songName, currentIndex, songUrl } = this.state;

        return (
            <div className="container">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                    <h4>Song List</h4>

                    <div className="container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Play Song</th>
                                    <th>Song Name</th>
                                    <th>Artist</th>
                                    <h>Genre</h>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                songs && songs.map(
                                    song =>
                                        <tr key = {song.songName}>
                                            <td>
                                                <button className="btn btn-success" onClick={() => this.setSongUrl(song)}>
                                                    Play
                                                </button>

                                            </td>
                                            <td>{song.songName}</td>
                                            <td>{song.artist}</td>
                                            <td>{song.genre}</td>
                                            <td>{song.url}</td>

                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <audio
                            src = {this.state.songUrl}
                            controls
                        />
                        <WaveformContainer />
                </div>
            </div>
        );
    }
}



export default SongsList;