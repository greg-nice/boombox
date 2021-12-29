import { useParams, Link } from "react-router-dom";
import './OneAlbum.css';

const OneAlbum = () => {
    const { albumId } = useParams();

    let album;

    return (
        <main className="main-view-container">
            <div className="main-view-second-container">
            Hello from OneAlbum!
                <div className="os-resize">
                    <div className="os-resize-observer"></div>
                </div>
                <div className="os-padding">
                    <div className="os-viewport">
                        <div className="os-content">
                            <div className="scroll-child-spacer"></div>
                            <div className="scroll-child">
                                <div className="presentation">
                                    <div className="content-spacing">
                                        <div className="background-color"></div>
                                        <div className="background-gradient"></div>
                                        <div className="album-art-container">
                                            <div className="album-art-wrapper">
                                                <img className="album-art" src="https://i.redd.it/0ls5x7mm8r011.jpg" alt=""></img>
                                            </div>
                                        </div>
                                        <div className="album-info-container">
                                            <h2 className="h2-type">Album</h2>
                                            <span className="album-title-container"><h1 className="album-title-text">album.title</h1></span>
                                            <div className="album-data-container">
                                                <div className="artist-info-container">
                                                    {/* need to finish the below elements */}
                                                    <div className="artist-profile-pic-container">
                                                        <div className="artist-profile-pic-wrapper">
                                                            <img className="artist-profile-pic" alt=""></img>
                                                        </div>
                                                    </div>
                                                    <Link className="artist-name" to={`/artists/id`}>artist.name </Link>
                                                </div>
                                                <span className="album-year-info">• year •</span>
                                                <span className="album-length-info"># songs, <span>duration</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="second-background-color"></div>
                                    <div className="album-buttons-container"></div>
                                    <div className="album-tracks-table-container"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vertical-scrollbar">
                    <div className="scrollbar-track">
                        <div className="scrollbar-handle"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default OneAlbum