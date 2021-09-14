import React from "react";
import { Link } from 'react-router-dom';
import styles from'./Landing.module.css';

function Landing() {
    return  (
        <div className={styles.image}>
            <div className={styles.container}>
                <h1 className={styles.title1}>Welcome to Countrypedia</h1>
                <h2 className={styles.title2}>Touch the button</h2>
                <Link to={'/home'}>
                    <button className={styles.btn}>Home</button>
                </Link> 
            </div>
        </div>
    )
}

export default Landing;