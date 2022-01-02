import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './OneArtist.css';


const OneArtist = () => {
    const [artist, setArtist] = useState("");
    const [artistLoaded, setArtistLoaded] = useState(false)
    const { artistId } = useParams();


    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/artists/${artistId}`)

            if (response.ok) {
                const artist = await response.json();
                setArtist(artist);
                setArtistLoaded(true);
            }
        })();
    }, [artistId])

    if (!artist) {
        if (artistLoaded) {
            return "Page not found, 404"
        }
        return null
    }

    return (
        <div className="artist-page-container"><img className="artist-main-pic"src={artist.pic} alt=""></img></div>
    )
}

export default OneArtist;