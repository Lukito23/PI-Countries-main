import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { countryDetail } from "../actions";
import styles from './Detail.module.css';



export default function Detail({ country }){

    const dispatch = useDispatch()

    const details = useSelector((state) => state.detail)

    
    useEffect(() => {
        dispatch(countryDetail(country))
    },[dispatch])


    return (
      <div className={styles.image}>
        <div className={styles.container}>
            <img src={details.flag} alt='flag' className={styles.img}/>
            <h1 className={styles.names}>{details.name}</h1>
            <h2 className={styles.cont}>Continent: {details.continent}</h2>
            <h2 className={styles.sub}>Subregion: {details.subregion}</h2>
            <h3 className={styles.cap}>Capital: {details.capital}</h3>
            <h3 className={styles.pop}>Population: {details.poblation}</h3>
            <h3 className={styles.area}>Area: {details.area} km2</h3>
            <h3 className={styles.act}>Activities: </h3>
            <ul className={styles.ul}>
            {details.activities &&
              details.activities.map((act) => (
                <li key={act.id} className={styles.list}>
                  <p className={styles.actxt}>
                    <strong className={styles.str}>{act.name}</strong> ({act.season}) | Duration:{' '}
                    {act.duration} - Difficulty: {act.difficulty}
                  </p>
                </li>
              ))}
          </ul>
          <Link to='/home'>
            <button className={styles.btn}>Back</button>
          </Link>
        </div> 
      </div>  
    )

}

