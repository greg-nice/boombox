import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getUser } from '../../store/user';
import { getSuserFollows, addSuserFollowed, deleteSuserFollowed } from '../../store/follows';
import './OneUser.css';

const OneUser = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userLoaded, setUserLoaded] = useState(false);
    const user = useSelector(state => state.user);
    const sessionUser = useSelector(state => state.session.user);
    // const followers = useSelector(state => state.follows.followers);
    const following = useSelector(state => state.follows.following);
    const history = useHistory();

    window.scrollTo(0, 0);

    useEffect(() => {
        (async () => {
            await dispatch(getUser(userId));
            await dispatch(getSuserFollows());
            setUserLoaded(true)
        })();
    }, [dispatch, userId])

    const handleFollowClick = () => {
        (async () => {
            await dispatch(addSuserFollowed(userId));
            await dispatch(getUser(userId));
        })();
    }

    const handleUnfollowClick = () => {
        (async () => {
            await dispatch(deleteSuserFollowed(userId));
            await dispatch(getUser(userId));
        })();
    }

    const handlePlaylistClick = (playlistId) => {
        history.push(`/playlists/${playlistId}`)
    }

    const handleProfileClick = (userId) => {
        history.push(`/users/${userId}`)
    }

    if (userLoaded && Object.keys(user).length === 0) {
        return "User does not exist."
    }

    if (!userLoaded || !user ) {
        return null;
    }

    return (
        <div className="profile-page-container">
            <div className="profile-page-second-container">
                <div className="profile-top-section-container">
                    <div className="profile-top-section-background-color"></div>
                    <div className="profile-top-section-gradient"></div>
                    <div className="profile-top-section-pic-container">
                        <div className="profile-pic-second-container">
                            <div className="profile-pic-third-container">
                                <img className="profile-page-pic" src={user.profile_pic} alt=""></img>
                            </div>
                        </div>
                    </div>
                    <div className="profile-top-section-content-container">
                        <h2 className="profile-page-h2">Profile</h2>
                        <span className="profile-username-span">
                            <div className="profile-username-h1-wrapper">
                                <span className="profile-username-inner-span">
                                    <h1 className="profile-page-h1">{user.username}</h1>
                                </span>
                            </div>
                        </span>
                        <div className="profile-data-section">
                            <span className="profile-playlist-count">{user.playlists.length} {user.playlists.length === 1 ? "Public Playlist" : "Public Playlists"}</span>
                            <span className="profile-followers-span"><span className="profile-followers-inner-span">{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</span></span>
                            <span className="profile-followers-span"><span className="profile-followers-inner-span">{user.following.length} following</span></span>
                        </div>
                    </div>
                </div>
                <div className="following-button-section">
                    {sessionUser && sessionUser.id !== user.id && following[`${user.id}`] && <button className="following-button" onClick={() => handleUnfollowClick(user.id)}>Following</button>}
                    {sessionUser && sessionUser.id !== user.id && !following[`${user.id}`] && <button className="following-button" onClick={() => handleFollowClick(user.id)}>Follow</button>}
                </div>
                <div className="profile-page-section-wrapper">
                    <section className="profile-page-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Public Playlists</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {user.playlists.length > 0 && user.playlists.map(playlist => {
                                return (
                                    <div className="library-item-container" key={playlist.id} onClick={() => handlePlaylistClick(playlist.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="library-item-cover-pic-wrapper">
                                                    <div>
                                                        <img className="library-playlist-cover" src={playlist.pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/playlists/${playlist.id}`}>
                                                    <div className="library-playlist-title-text">{playlist.name}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
                <div className="profile-page-section-wrapper">
                    <section className="profile-page-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Followers</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {user.followers.length > 0 && user.followers.map(follower => {
                                // return (
                                //     <div key={follower.id}><Link to={`/users/${follower.id}`}>{follower.username}</Link><img src={follower.profile_pic}></img></div>
                                return (
                                    <div className="library-item-container" key={follower.id} onClick={() => handleProfileClick(follower.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="profile-page-follow-cover-pic-wrapper">
                                                    <div>
                                                        <img className="playlist-page-user-profile-pic" src={follower.profile_pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/users/${follower.id}`}>
                                                    <div className="library-playlist-title-text">{follower.username}</div>
                                                </Link>
                                                <div className="homepage-session-user-name">Profile</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
                <div className="profile-page-section-wrapper">
                    <section className="profile-page-row-container">
                        <div className="homepage-heading-container">
                            <div className="homepage-heading-second-container">
                                <div className="homepage-heading-third-container">
                                    <h2 className="homepage-h2">Following</h2>
                                </div>
                            </div>
                        </div>
                        <div className="library-grid-container homepage-grid">
                            {user.following.length > 0 && user.following.map(followed => {
                                // return (
                                //     <div key={followed.id}><Link to={`/users/${followed.id}`}>{followed.username}</Link></div>
                                return (
                                    <div className="library-item-container" key={followed.id} onClick={() => handleProfileClick(followed.id)}>
                                        <div className="library-item-content-container">
                                            <div className="library-item-cover-pic-container">
                                                <div className="profile-page-follow-cover-pic-wrapper">
                                                    <div>
                                                        <img className="playlist-page-user-profile-pic" src={followed.profile_pic} alt=""></img>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="library-playlist-title-container">
                                                <Link className="library-playlist-title-link" to={`/users/${followed.id}`}>
                                                    <div className="library-playlist-title-text">{followed.username}</div>
                                                </Link>
                                                <div className="homepage-session-user-name">Profile</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default OneUser;