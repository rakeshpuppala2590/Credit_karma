import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="container">
        <div className="Links">
                <span className="Links list">Links</span>
                <Link href="/">About</Link>
                <Link href="/">Contact</Link>
          </div>
      </div>
  );
}

export default Footer;