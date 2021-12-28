import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const ProfileButton = ({ user }) => {
    // const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const handleMenu = () => {
        setShowMenu(!showMenu);
    }

    // const handleLogout = (e) => {
    //     e.preventDefault();
    //     dispatch(logoutUser());
    // }

    useEffect(() => {
        if (showMenu) {
            document.addEventListener('click', handleMenu);
            return () => document.removeEventListener('click', handleMenu);
        }
        else {
            return;
        }
    }, [showMenu]);

    return (
        <div className='nav-profile-button-container'>
            <button className='nav-profile-button' onClick={handleMenu}>
                <div className="artist-profile-pic-container">
                    <div className="artist-profile-pic-wrapper">
                        <img className="artist-profile-pic" src={user.profile_pic} alt=""></img>
                    </div>
                </div>
                <span className="profile-button-span">{user.username}</span>
                <div className="profile-button-dropdown-icon">v</div>
            </button>
            {showMenu && (
                <div className='nav-dropdown'>
                    <div className='nav-dropdown-second-container'>
                        <ul className='nav-dropdown-list'>
                            <li className='nav-list-item'><Link className="profile-page-link"><span className="dropdown-span">Profile</span></Link></li>
                            <li className='nav-list-item'>
                                {/* <button id="logout-button" onClick={handleLogout}>Log Out</button> */}
                                <LogoutButton />
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileButton;