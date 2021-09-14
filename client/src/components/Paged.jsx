import React from "react";
import styles from './Paged.module.css'

export default function Paged ({ countriesPerPage, allCountries, paged }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.ul}>
                {
                    pageNumbers.map(number =>(
                        <li key={number} className={styles.list}>
                            <button className={styles.btn} onClick={ () => paged(number) } >{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}