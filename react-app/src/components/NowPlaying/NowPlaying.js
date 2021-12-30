import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './NowPlaying.css';
import { useSelector } from 'react-redux';

// Link to = {`/playlists/${playlist.id}`} ??

export default function NowPlaying() {
    const queue = useSelector(state => state.queue);
    const [currentSong, setCurrentSong] = useState(0)
    // const [autoPlay, setAutoPlay] = useState(true)
    const player = useRef();
    const audiofunction = () => {
        player.current.audio.current.pause()
    }

    const song = queue[currentSong];

    // if (queue.length === 0) {
    //     setCurrentSong(0);
    // }
    useEffect(() => {
        if (queue.length === 0) {
            setCurrentSong(0);
        }
    }, [queue])

    let src = ""
    if (song) {
        if (song.type === "playlist_song") {
            src = song.song.data_url;
        } else if (song.type === "album_song") {
            src = song.data_url;
        }
    }

    const Player = () => (
        <AudioPlayer
            autoPlay
            src={src}
            // src=""
            ref={player}
            onPlay={e => console.log("onPlay", song ? song : null)}
            showSkipControls={true}
            showJumpControls={false}
            onEnded={() => {
                if (currentSong < queue.length - 1) {
                    setCurrentSong((currentSong) => {
                        return currentSong + 1;
                    });
                } else {
                    setCurrentSong(0);
                    audiofunction();
                };
            }}
            
            onClickNext={() => {
                if (currentSong < queue.length - 1) {
                    setCurrentSong((currentSong) => currentSong + 1)
                } else if (currentSong === queue.length - 1) {
                    setCurrentSong(0);
                    audiofunction();
                }
            }}
            onClickPrevious={() => {
                if (currentSong > 0) {
                    setCurrentSong((currentSong) => currentSong - 1)
                }
            }}
        // other props here
        />
    );

    let songInfo;
    if (song) {
        songInfo = (
            <>
                <div className="song-info-widget">
                    <div className="album-cover-container">
                        <div className="album-cover">
                            <Link className="album-a-tag" to={song.type === "playlist_song" ? `/playlists/${song.playlist_id}` : `/albums/${song.album_id}`}>
                                <div className="album-cover-shrink-setting">
                                    <div className="cover-art-shadow">
                                        <div>
                                            <img className="album-cover-art" src={song.type === "playlist_song" ? song.song.albumDetails.pic : song.albumDetails.pic} alt=""></img>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="song-and-artist-data">
                        <div className="song-title-container">
                            <div className="song-title-second-container">
                                <div className="song-title-third-container">
                                    <div className="song-title-fourth-container">
                                        <div className="song-title-final-container">
                                            <span className="song-title-span">
                                                <Link className="song-title-link" to={song.type === "playlist_song" ? `/albums/${song.song.album_id}` : `/albums/${song.album_id}`}>
                                                    {song.type === "playlist_song" ? song.song.title : song.title}
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="song-artist-container">
                            <div className="song-artist-second-container">
                                <div className="song-artist-third-container">
                                    <div className="song-artist-fourth-container">
                                        <div className="song-artist-final-container">
                                            <span className="song-artist-span">
                                                <span className="song-artist-second-span">
                                                    <Link className="song-artist-link" to={song.type === "playlist_song" ? `/artists/${song.song.artist_id}` : `/artists/${song.artist_id}`}>
                                                        {song.type === "playlist_song" ? song.song.artist : song.artist}
                                                    </Link>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <button className="song-favorite-button">[Like]</button> */}
                </div>
            </>
        );
    } else {
        songInfo = (
            <>
            </>
        )
    }

    return (
        <div className="now-playing-bar">
            <div className="now-playing-bar-inner-wrapper">
                <div className="song-info-container">
                    {songInfo}
                </div>
                {Player()}
                <div className="placeholder"></div>
            </div>
        </div>
    )
}