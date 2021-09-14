import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity } from "../actions";
import styles from './CreateActivity.module.css';


function validate(details){
    let errors = {}

    if(!details.name){
        errors.name = 'Name is required';
    }
    if(!details.duration){
        errors.duration = 'Duration is required';
    } else if (/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/.test(details.duration)){
        errors.duration = 'Duration must be HH:MM:SS format';
    }
    return errors
} 


export default function ActivityCreate() {

    const dispatch = useDispatch()
    const history = useHistory() //redirige a '/....'
    
    const countries = useSelector((state) => state.allCountries)


    const[errors, setErrors] = useState({});
    

    const [details, setDetails] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    })


    useEffect(() => {
        dispatch(getCountries())
    },[dispatch])


    function handleChange(e){
        setDetails({
            ...details,
            [e.target.name] : e.target.value
        })
        setErrors( validate ({
            ...details,
            [e.target.name] : e.target.value
        }))
    }


    function handleCheck(e){
        if(e.target.checked){
            setDetails({
                ...details,
                season: e.target.value
            })
        }
    }

    function handleSelect(e){
        setDetails({
            ...details,
            countries: [...details.countries, e.target.value]
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        console.log(details)
        dispatch(createActivity(details))
        alert('Activity Created')
        setDetails({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        history.push('/home')
    }

    function handleDelete(c){
        setDetails({
            ...details,
            countries: details.countries.filter( country => country !== c)
        })
    }



    return(
        <div className={styles.image}>
            <div className={styles.container}>
                <Link to= '/home'><button className={styles.back}>Home</button></Link>
                <h1 className={styles.title}>Create your tourist activity</h1>
                <form onSubmit= {(e) => handleSubmit(e)}>
                    <div className={styles.names}>
                        <label>Name: </label>
                        <input 
                            type= 'text'
                            value= {details.name}
                            name= 'name'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && (
                                <p className='error'>{errors.name}</p>
                            )}
                    </div>
                    <div className={styles.diff}>
                        <label>Difficulty: </label>
                        <select
                            name='difficulty'
                            onChange={(e) => handleChange(e)}
                        >
                            <option value=''>Difficulty...</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div className={styles.dur}>
                        <label>Duration (hh:mm:ss): </label>
                        <input
                            type='text'
                            value={details.duration}
                            name='duration'
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.duration && (
                                <p className='error'>{errors.duration}</p>
                            )}
                    </div>
                    <div className={styles.sea}>
                        <label>Season: </label>
                        <label>
                            <input
                                type='checkbox'
                                name='Summer'
                                value='Summer'
                                onChange={(e) => handleCheck(e)}
                            />Summer</label>
                        <label>
                            <input
                                type='checkbox'
                                name='Fall'
                                value='Fall'
                                onChange={(e) => handleCheck(e)}
                            />Fall</label>
                        <label>
                            <input
                                type='checkbox'
                                name='Winter'
                                value='Winter'
                                onChange={(e) => handleCheck(e)}
                            />Winter</label>
                        <label>
                            <input
                                type='checkbox'
                                name='Spring'
                                value='Spring'
                                onChange={(e) => handleCheck(e)}
                            />Spring</label>   
                    </div>
                    <div className={styles.coun}>
                        <label>Select Country: </label>
                        <select
                            onChange={(e) => handleSelect(e)}
                        >
                            <option value=''>Country...</option>
                            {countries.map((c) => (
                                <option value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type='submit' className={styles.btn}>Add Activity</button>
                </form>
                {details.countries.map( c => 
                    <div>
                        <p className={styles.c}>{c}</p>
                        <button onClick={() => handleDelete(c)} className={styles.close}>X</button>
                    </div>
                    )}
            </div>
        </div>
    )

}
