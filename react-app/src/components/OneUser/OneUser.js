import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
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

    if (userLoaded && Object.keys(user).length === 0) {
        return "User does not exist."
    }

    if (!userLoaded || !user ) {
        return null;
    }

    return (
        <section>
            <div className="profile-page-wrapper">
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
                            <span>{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</span>
                            <span>{user.following.length} following</span>
                        </div>
                    </div>
                </div>
                <div>
                    {sessionUser && sessionUser.id !== user.id && following[`${user.id}`] && <button onClick={() => handleUnfollowClick(user.id)}>Following</button>}
                    {sessionUser && sessionUser.id !== user.id && !following[`${user.id}`] && <button onClick={() => handleFollowClick(user.id)}>Follow</button>}
                </div>
                <div>Public Playlists
                    {user.playlists.length > 0 && user.playlists.map(playlist => {
                        return (
                            <div key={playlist.id}><Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link></div>
                        )
                    })}
                </div>
                <div>Followers
                    {user.followers.length > 0 && user.followers.map(follower => {
                        return (
                            <div key={follower.id}><Link to={`/users/${follower.id}`}>{follower.username}</Link></div>
                        )
                    })}
                </div>
                <div>Following
                    {user.following.length > 0 && user.following.map(followed => {
                        return (
                            <div key={followed.id}><Link to={`/users/${followed.id}`}>{followed.username}</Link></div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default OneUser;