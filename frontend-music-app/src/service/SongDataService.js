
import axios from 'axios'

const SONG_API_URL = 'http://localhost:18080'
const FIND_SONG_API_URL = `${SONG_API_URL}/api/v1/content/songs`
const CREATE_SONG_API_URL = `${SONG_API_URL}/api/v1/content/songs`
const DELETE_SONG_API_URL = `${SONG_API_URL}/api/v1/content/songs`
const UPLOAD_SONG_API_URL = `${SONG_API_URL}/api/v1/content/songs`
const AUDIO_DATA_URL = "http://localhost:8084/api/v1/compare"

class SongDataService {

    /*querySongBy() {
        console.log(username);
        return axios.get(`${FIND_USER_API_URL}?username=${username}&password=${password}`)
    }*/
    findByTitle(title) {
        return axios.get(`/songs?songName=${title}`);
    }

    listAllSongs() {
        console.log("listAllSongs called")
        return axios.get(`${FIND_SONG_API_URL}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": 'application/json'
                }
            });

    }

    downloadSong(id) {
        return axios.get(`${FIND_SONG_API_URL}/${id}`);
    }

    uploadSong(songFile, artist, genre) {
        console.log("uploadSong called")
        let formData = new FormData();
        formData.append("file", songFile);
        formData.append("artist", artist);
        formData.append("genre", genre);
        return axios.post(UPLOAD_SONG_API_URL, formData,{
            headers: {
                'Content-Type': 'audio/wav'
            }
        });
    }

    deleteSong(id) {
        return axios.delete(`/songs/${id}`);
    }

    displayAudioData(data) {
        console.log("displayAudioData called");
        return axios.post(AUDIO_DATA_URL, data, {
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        })
    }

}

export default new SongDataService()