import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getUser } from '../../store/user';
import './OneUser.css';

const OneUser = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const [userLoaded, setUserLoaded] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
        (async () => {
            await dispatch(getUser(userId));
            setUserLoaded(true)
        })();
    }, [dispatch, userId])

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
            <div>Public Playlists
                {user.playlists.length > 0 && user.playlists.map(playlist => {
                    return (
                        <div key={playlist.id}>{playlist.name}</div>
                    )
                })}
            </div>
            <div>Followers
                {user.followers.length > 0 && user.followers.map(follower => {
                    return (
                    <div key={follower.id}>{follower.username}</div>
                    )
                })}
            </div>
            <div>Following
                {user.following.length > 0 && user.following.map(followed => {
                    return (
                        <div key={followed.id}>{followed.username}</div>
                    )
                })}
            </div>
        </main>
    )
}

export default OneUser;