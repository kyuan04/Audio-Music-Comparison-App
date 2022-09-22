import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import {Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import {AsyncPaginate} from "react-select-async-paginate";
import SongDataService from "../service/SongDataService";
import ReactAudioPlayer from "react-audio-player";

const Search = () => {
    const[searchInput, setSearchInput] = useState("");
    const[songs, setSongs] = useState();
    const[activeSong, setActiveSong] = useState();

    async function search() {
        console.log("Search for " + searchInput);
        //get request using search to get list of songs
        const returnedSongs = await SongDataService.querySong(searchInput)
            .then(response => {
                setSongs(response.data);
            });
        //display songs to the user
    }

    console.log(songs)
    return (
      <div className="Search">
          <Container>
              <InputGroup className="mb-3" size="lg">
                  <FormControl
                      placeholder="Search for song"
                      type="input"
                      onKeyPress={event => {
                          if (event.key == "Enter") {
                              search();
                          }
                      }}
                      onChange={event => setSearchInput(event.target.value)}
                  />
                  <Button onClick={search} >
                      Search
                  </Button>
              </InputGroup>
          </Container>
          <Container>
              <Row className="mx-2 row row-cols-4">
                  {songs && songs.map(
                      song =>
                          <Card>
                              <Card.Img src={song.album.images[1].url}/>
                              <Card.Body>
                                  <Card.Title>{song.name}</Card.Title>
                                  <ReactAudioPlayer src ={song.previewUrl} controls />
                              </Card.Body>
                          </Card>
                  )}
              </Row>
          </Container>
      </div>
    );
}

export default Search;