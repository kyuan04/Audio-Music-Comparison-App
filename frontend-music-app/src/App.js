import React, { Component } from "react";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Loading from "./component/Loading";
import {useAuth0} from "@auth0/auth0-react";
import AudioRecorder from "./component/AudioRecorder";
import LandingPage from "./component/LandingPage";
import TopArtists from "./component/TopArtists";
import TrackList from "./component/TrackList";
import AudioData from "./component/AudioData";
import Search from "./component/Search";
import {useState} from "react";


export default function App() {
    /*const { isLoading } = useAuth0();
    if (isLoading) {
        return <Loading />;
    }*/

    return (
        <div>
            <div className="container mt-3">
                {/*<Header />*/}
                <LandingPage />
                <Search/>
                {/*<TrackList />*/}
                {/*<AudioData />*/}
                {/*<SongsList />*/}
                <AudioRecorder />
            </div>
        </div>
    );
}

