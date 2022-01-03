import React from 'react';
import { Link } from 'react-router-dom';
import './AboutButton.css';


const AboutButton = () => {
    return (
        <div>
            <button className="about-button"><Link className="nav-link"><span className="about-span">About</span></Link></button>
        </div>
    )
}

export default AboutButton;