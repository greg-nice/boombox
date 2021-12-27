import { useState } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './NowPlaying.css';
import { useSelector } from 'react-redux';

// Link to = {`/playlists/${playlist.id}`} ??

export default function NowPlaying() {
    const queue = useSelector(state => state.queue);

    const Player = (src) => (
        <AudioPlayer
            autoPlay
            // src={src}
            src=""
            onPlay={e => console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
        // other props here
        />
    );

    let songInfo;
    if (queue.length > 0) {
        songInfo = (
            <>
                <div className="song-info-widget">
                    <div className="album-cover-container">
                        <div className="album-cover">
                            <Link className="album-a-tag">
                                <div className="album-cover-shrink-setting">
                                    <div className="cover-art-shadow">
                                        <div>
                                            <img className="album-cover-art" src={queue[0].song.albumDetails.pic} alt=""></img>
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
                                                <Link className="song-title-link">
                                                    {queue[0].song.title}
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
                                                    <Link className="song-artist-link">
                                                        {queue[0].song.artist}
                                                    </Link>
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="song-favorite-button">[Like]</button>
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
                {queue.length > 0 ? Player(queue[0].song.data_url) : Player()}
                <div className="placeholder"></div>
            </div>
        </div>
    )
}