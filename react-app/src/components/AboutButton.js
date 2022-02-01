import React, { useState, useEffect } from 'react';
import './AboutButton.css';
import gitHub from './GitHub-Mark.png';
import linkedIn from './LI-Bug.svg.original.svg';


const AboutButton = () => {
    const [showAbout, setShowAbout] = useState(false)

    const handleAbout = () => {
        setShowAbout(!showAbout);
    }

    useEffect(() => {
        if (showAbout) {
            document.addEventListener('click', handleAbout);
            return () => document.removeEventListener('click', handleAbout);
        } else {
            return;
        }
    }, [showAbout])

    return (
        <div>
            <button className="about-button" onClick={handleAbout}><span className="about-span">About</span></button>
            {showAbout && (
                <div className='about-dropdown'>
                    <div className='about-dropdown-second-container'>
                        <div className="about-dropdown-visible-container">
                            <div className="content-container">
                                <p className="on-hover">Developed By:</p>
                                <p className="on-hover"><a href="https://greg-nice.github.io/"><span className="name-span">Greg Gomes</span></a></p>
                                <div id="icons-container">
                                    <div className="on-hover link">
                                        <a href="https://github.com/greg-nice"><div className="icon-image-container"><img className="about-icon" src={gitHub} alt=""></img></div><span className="github-span">GitHub</span></a>
                                    </div>
                                    <div className="on-hover link">
                                        <a href="https://www.linkedin.com/in/greg-gomes-a5257324/"><div className="icon-image-container linkedin"><img className="about-icon linkedin" src={linkedIn} alt=""></img></div><span className="github-span">LinkedIn</span></a>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AboutButton;