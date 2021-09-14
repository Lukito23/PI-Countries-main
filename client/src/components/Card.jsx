import React from "react";
import styles from './Card.module.css';

export default function Card({ flag, name, continent }) {
    return (
        <div className={styles.container}>
            <img src={flag} alt= 'Country Flag' width="350px" height="200px" />
            <h4>{name}</h4>
            <h5>{continent}</h5>
        </div>
    )
}