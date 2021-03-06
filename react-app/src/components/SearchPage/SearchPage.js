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
                    setResults(searchResults);
                }
            })();
        } else {
            return;
        }
    }, [query])

    return (
        <div className="searchpage-top-container">
            <div className="searchpage-spacer"></div>
            <div className="searchpage-content-container">
                <div className="searchpage-content-spacing">
                    <div className="searchpage-grid-container">
                        {query && results && (
                            <div className="grid-search-results">
                                {results.songs.length > 0 && (
                                    <section className="searchpage-song-results-shelf">
                                        <div className="searchpage-shelf-heading-div">
                                            <div className="searchpage-shelf-heading-div-2">
                                                <div className="searchpage-shelf-heading-div-3">
                                                    <h2 className="searchpage-heading-h2">Songs</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="searchpage-songs-shelf-grid">
                                            <div className="searchpage-songs-shelf-grid-2">
                                                {results.songs.slice(0, 4).map(song => {
                                                    return (
                                                        <div className="tracklist-row" key={song.id}>
                                                            <div className="track-picnameartist-container">
                                                                <div className="track-pic-container">
                                                                    <img className="track-pic-img" src={song.albumDetails.pic} alt=""></img>
                                                                </div>
                                                                <div className="track-nameartist-container">
                                                                    <div className="track-name-text-div"><Link className="track-name-link" to={`/albums/${song.album_id}`}>{song.title}</Link></div>
                                                                    <Link to={`/artists/${song.artist_id}`}><span className="track-artist-text-span">{song.artist}</span></Link>
                                                                </div>
                                                            </div>
                                                            <div className="track-duration-container">
                                                                <div className="track-favorite-button-placeholder"></div>
                                                                <div className="track-duration-text-div">{Math.floor(song.length / 60)}:{song.length % 60 >= 10 ? song.length % 60 : "0" + song.length % 60}</div>
                                                                <div className="track-option-menu-placeholder"></div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </section>
                                )}
                                {results.artists.length > 0 && (
                                    <section className="searchpage-results-shelf">
                                        <div className="searchpage-shelf-heading-div">
                                            <div className="searchpage-shelf-heading-div-2">
                                                <div className="searchpage-shelf-heading-div-3">
                                                    <h2 className="searchpage-heading-h2">Artists</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="searchpage-shelf-grid">
                                            {results.artists.map(artist => {
                                                return (
                                                    <div className="searchpage-shelf-oneresult" key={artist.id}>
                                                        <div className="searchpage-shelf-oneresult-2">
                                                            <div className="searchpage-shelf-oneresult-pic-container">
                                                                <div className="searchpage-result-pic-wrapper">
                                                                    <div>
                                                                        <img className="searchpage-result-pic" src={artist.pic} alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="searchpage-shelf-oneresult-text-container">
                                                                <Link className="searchpage-shelf-oneresult-resultlink" to={`/artists/${artist.id}`}>
                                                                    <div className="searchpage-shelf-oneresult-resultlink-inner-div">{artist.name}</div>
                                                                </Link>
                                                                <div className="searchpage-shelf-oneresult-text-resulttype">
                                                                    <span>Artist</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )}
                                {results.albums.length > 0 && (
                                    <section className="searchpage-results-shelf">
                                        <div className="searchpage-shelf-heading-div">
                                            <div className="searchpage-shelf-heading-div-2">
                                                <div className="searchpage-shelf-heading-div-3">
                                                    <h2 className="searchpage-heading-h2">Albums</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="searchpage-shelf-grid">
                                            {results.albums.map(album => {
                                                return (
                                                    <div className="searchpage-shelf-oneresult" key={album.id}>
                                                        <div className="searchpage-shelf-oneresult-2">
                                                            <div className="searchpage-shelf-oneresult-pic-container">
                                                                <div className="searchpage-result-pic-wrapper">
                                                                    <div>
                                                                        <img className="searchpage-result-pic" src={album.pic} alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="searchpage-shelf-oneresult-text-container">
                                                                <Link className="searchpage-shelf-oneresult-resultlink" to={`/albums/${album.id}`}>
                                                                    <div className="searchpage-shelf-oneresult-resultlink-inner-div">{album.title}</div>
                                                                </Link>
                                                                <div className="searchpage-shelf-oneresult-text-resulttype">
                                                                    <Link className="searchpage-shelf-oneresult-albumartistlink" to={`/artists/${album.artist_id}`}><span>{album.artist.name}</span></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )}
                                {results.playlists.length > 0 && (
                                    <section className="searchpage-results-shelf">
                                        <div className="searchpage-shelf-heading-div">
                                            <div className="searchpage-shelf-heading-div-2">
                                                <div className="searchpage-shelf-heading-div-3">
                                                    <h2 className="searchpage-heading-h2">Playlists</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="searchpage-shelf-grid">
                                            {results.playlists.map(playlist => {
                                                return (
                                                    <div className="searchpage-shelf-oneresult" key={playlist.id}>
                                                        <div className="searchpage-shelf-oneresult-2">
                                                            <div className="searchpage-shelf-oneresult-pic-container">
                                                                <div className="searchpage-result-pic-wrapper">
                                                                    <div>
                                                                        <img className="searchpage-result-pic" src={playlist.pic} alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="searchpage-shelf-oneresult-text-container">
                                                                <Link className="searchpage-shelf-oneresult-resultlink" to={`/playlists/${playlist.id}`}>
                                                                    <div className="searchpage-shelf-oneresult-resultlink-inner-div">{playlist.name}</div>
                                                                </Link>
                                                                <div className="searchpage-shelf-oneresult-text-resulttype">
                                                                    <span>By {playlist.user.username}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )}
                                {results.users.length > 0 && (
                                    <section className="searchpage-results-shelf">
                                        <div className="searchpage-shelf-heading-div">
                                            <div className="searchpage-shelf-heading-div-2">
                                                <div className="searchpage-shelf-heading-div-3">
                                                    <h2 className="searchpage-heading-h2">Profiles</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="searchpage-shelf-grid">
                                            {results.users.map(user => {
                                                return (
                                                    <div className="searchpage-shelf-oneresult" key={user.id}>
                                                        <div className="searchpage-shelf-oneresult-2">
                                                            <div className="searchpage-shelf-oneresult-pic-container">
                                                                <div className="searchpage-result-pic-wrapper">
                                                                    <div>
                                                                        <img className="searchpage-result-pic" src={user.profile_pic} alt=""></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="searchpage-shelf-oneresult-text-container">
                                                                <Link className="searchpage-shelf-oneresult-resultlink" to={`/users/${user.id}`}>
                                                                    <div className="searchpage-shelf-oneresult-resultlink-inner-div">{user.username}</div>
                                                                </Link>
                                                                <div className="searchpage-shelf-oneresult-text-resulttype">
                                                                    <span>Profile</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </section>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;