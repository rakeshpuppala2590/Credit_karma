import React from 'react';
import styles from "./footer.css";


const Footer = () => {
    return (
        <div className={styles.container}>
        <div className={styles.links}>
            <span className={styles.listTitle}>Links</span>
            {/* <Link href="/">Home</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link> */}
          </div>
      </div>
  );
}

export default Footer;