import logo from './logo.svg';
import React, { Component } from "react";
import {Link, Route, Router, Routes} from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import SongsList from "./component/SongsList";
import Header from "./component/Header";
import Loading from "./component/Loading";
import {useAuth0} from "@auth0/auth0-react";
import Waveform from "./component/Waveform";
import Wavesurfer from "wavesurfer.js";
import {WaveSurfer} from "wavesurfer-react";

export default function App() {
    const { isLoading } = useAuth0();
    if (isLoading) {
        return <Loading />;
    }
    return (
        <div>
          {/*  <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/songs"} className="navbar-brand">
                    kevin
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/songs"} className="nav-link">
                            Songs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/add"} className="nav-link">
                            Add
                        </Link>
                    </li>
                </div>
            </nav>*/}

            <div className="container mt-3">
                <Header />
                <SongsList />
                {/*<Waveform />*/}
            </div>
        </div>
    );
}

