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
                            <div></div>
                            <div></div>
                        </div>
                        <button className="song-favorite-button"></button>
                    </div>
                </div>
                {Player()}
                <div className="placeholder"></div>
            </div>
        </div>
    )
}