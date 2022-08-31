import {Button} from "react-bootstrap";

export default function LandingPage() {

    const getSpotifyUserLogin = () => {
        console.log("getSpotifyUserLogin called")
        fetch("http://localhost:18080/api/v1/login")
            .then((response) => response.text())
            .then(response => {
                console.log("response: " + response);
                window.location.replace(response);
            })
    }

    return (
        <Button
            id="btnLogin"
            className="btn margin"
            onClick={() => getSpotifyUserLogin()}
            variant="primary"
        >
            Login with Spotify
        </Button>
    );
}