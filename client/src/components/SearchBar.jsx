import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import styles from './SearchBar.module.css';


export default function SearchBar() {
    const dispatch = useDispatch();

    const [name, setName] = useState("")

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountries(name))
    }

    return(
        <div>
            <input
                type= 'text'
                placeholder= 'Country...'
                onChange={(e) => handleChange(e)}
                className={styles.search}
            />
            <button type= 'submit' onClick={(e) => handleSubmit(e)} className={styles.btn}>Search</button>
        </div>
    )

}