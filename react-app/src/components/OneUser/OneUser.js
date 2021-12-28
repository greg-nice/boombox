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
    const followers = useSelector(state => state.follows.followers);
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

    if (!userLoaded || !user)
        return null;

    return (
        <main>
            <div>{user.profile_pic}</div>
            <div>Profile</div>
            <div>{user.username}</div>
            <div>{user.playlists.length} {user.playlists.length === 1 ? "public playlist" : "public playlists"}</div>
            <div>{user.followers.length} {user.followers.length === 1 ? "follower" : "followers"}</div>
            <div>{user.following.length} following</div>
            <div>
                {sessionUser.id !== user.id && following[`${user.id}`] && <button onClick={() => handleUnfollowClick(user.id)}>Following</button>}
                {sessionUser.id !== user.id && !following[`${user.id}`] && <button onClick={() => handleFollowClick(user.id)}>Follow</button>}
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
        </main>
    )
}

export default OneUser;