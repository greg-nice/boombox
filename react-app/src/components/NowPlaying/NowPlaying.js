import { Link } from 'react-router-dom';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './NowPlaying.css';

const Player = () => (
    <AudioPlayer
        autoPlay
        // src="https://cdn.discordapp.com/attachments/920418592820957228/920816049333628938/Stronger.mp3"
        src=""
        onPlay={e => console.log("onPlay")}
    // other props here
    />
);

// Link to = {`/playlists/${playlist.id}`} ??

export default function NowPlaying() {
    return (
        <div className="now-playing-bar">
            <div className="now-playing-bar-inner-wrapper">
                <div className="song-info-container">
                    <div className="song-info-widget">
                        <div className="album-cover-container">
                            <div className="album-cover">
                                <Link className="album-a-tag">
                                    <div className="album-cover-shrink-setting">
                                        <div className="cover-art-shadow">
                                            <div>
                                                <img className="album-cover-art" src="" alt=""></img>
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
                                                        Song Title
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
                                                            Artist Name
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
                </div>
                {Player()}
                <div className="placeholder"></div>
            </div>
        </div>
    )
}