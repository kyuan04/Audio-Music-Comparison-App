import {useEffect, useState} from "react";

export default function TopArtists() {
    const [userTopArtists, setUserTopArtists] = useState();

    useEffect(() => {
        fetch("http://localhost:18080/api/v1/user-top-artists")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setUserTopArtists(data);
            })
    }, [])

    return (
        <div>
            {userTopArtists ? (
                userTopArtists.map((artistResult) => {
                    return <h1 key = {artistResult.name}>{artistResult.name}</h1>
                })
            ):
                (
                    <h1>LOADING...</h1>
                )}
        </div>
    );
}