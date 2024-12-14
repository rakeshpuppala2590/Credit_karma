import React from 'react';
import { Link } from "react-router-dom";
import '../Styles/footer.css'

const Footer = () => {
    return (
        <div className="container">
            <div className="links">
                <Link href="/">About</Link>
                &nbsp;
                <Link href="/">Contact</Link>
            </div>
      </div>
  );
}

export default Footer;