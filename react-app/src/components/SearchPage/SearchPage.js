import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import './SearchPage.css';

function SearchPage() {
    const { query } = useContext(SearchContext);
    const [results, setResults] = useState("");

    useEffect(() => {
        if (query) {
            (async () => {
                const response = await fetch('/api/search/', {
                    method: "POST",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({"query": query})
                })

                if (response.ok) {
                    const searchResults = await response.json();
                    console.log(searchResults);
                    setResults(searchResults);
                }
            })();
        } else {
            return;
        }
    }, [query])

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-content-container">
                {!query && <h1>Enter search above</h1>}
                {query && (
                <div>
                    <h1>RESULTS</h1>
                    {results && (
                        <div>
                            <div>
                                <div>
                                    {results.songs.length > 0 && <h3>Songs</h3>}
                                    {results.songs.length > 0 && results.songs.map(song => {
                                        return (
                                            <div key={song.id}><Link to={`/albums/${song.album_id}`}>{song.title}</Link></div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {results.artists.length > 0 && <h3>Artists</h3>}
                                    {results.artists.length > 0 && results.artists.map(artist => {
                                        return (
                                            <div key={artist.id}><Link to={`/artists/${artist.id}`}>{artist.name}</Link></div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {results.albums.length > 0 && <h3>Albums</h3>}
                                    {results.albums.length > 0 && results.albums.map(album => {
                                        return (
                                            <div key={album.id}><Link to={`/albums/${album.id}`}>{album.title}</Link></div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {results.playlists.length > 0 && <h3>Playlists</h3>}
                                    {results.playlists.length > 0 && results.playlists.map(playlist => {
                                        return (
                                            <div key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link></div>
                                        )
                                    })}
                                </div>
                                <div>
                                    {results.users.length > 0 && <h3>Profiles</h3>}
                                    {results.users.length > 0 && results.users.map(user => {
                                        return (
                                            <div key={user.id}><Link to={`/users/${user.id}`}>{user.username}</Link></div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                )}
            </div>
        </div>
    )
}

export default SearchPage;