import React, { useState } from 'react';
import '../Styles/Home.css'

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="#Home" className="navbar-brand">Twitter</a>
                <div className={`navbar-links ${isOpen ? 'show' : ''}`}>
                    <a href="#Home">Home</a>
                    <a href="#Profile">Profile</a>
                    <a href="#Messages">Messages</a>
                    <a href="#Notifications">Notifications</a>
                    <div className="dropdown">
                        <button className="dropbtn">Settings</button>
                        <div className="dropdown-content">
                            <a href="#Account">Account</a>
                            <a href="#Privary">Privacy</a>
                            <a href="#Logout">Logout</a>
                        </div>
                    </div>
                </div>
                <button className="navbar-toggle" onClick={handleToggle}>
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default Nav;
