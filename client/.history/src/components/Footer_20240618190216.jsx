import React from 'react';
import styles from "/Users/rakeshpuppala/Desktop/twitter-clone/src/Styles/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container">
        <div className="Links">
            <span className="Links list">Links</span>
            <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
      </div>
  );
}

export default Footer;