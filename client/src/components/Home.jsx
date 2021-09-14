import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCountries, filterContinent, sort, filterActivity } from "../actions";
import { Link } from 'react-router-dom';
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";
import styles from './Home.module.css'

export default function Home() {

    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries); //reeemplazo del mapStateToProps

    const [order, setOrder] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);


    const paged = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries()) //reemplazo del mapDispatchToProps
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries())
    }

    function handleFilterContinent(e){
        dispatch(filterContinent(e.target.value))
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(sort(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)

    }

    function handleFilterActivity(e){
        dispatch(filterActivity(e.target.value))
    }
    

    return(
        <div className={styles.image}>
            <div className={styles.container}>
                <h1 className={styles.title}>CountryPedia</h1>
                <div className={styles.btns}>
                    <Link to = '/activity' className={styles.link}>
                        <button className={styles.btn1}>Create Tourist Activity</button>
                    </Link>
                    <button className={styles.btn2} onClick = {(e)=>{handleClick(e)}}>
                        Recharge Countries
                    </button>
                </div>
                <div>
                    <div className={styles.selectors}>
                        <select onChange = {(e)=>handleSort(e)} className={styles.selector1}>
                            <option value = 'nothing'>Sorted By</option>
                            <option value = 'asc'>A - Z</option>
                            <option value = 'desc'>Z - A</option>
                            <option value = 'Higher'>Higher Pop</option>
                            <option value = 'Lower'>Lower Pop</option>
                        </select>
                        <select onChange = {(e)=>handleFilterContinent(e)} className={styles.selector2}>
                            <option value = 'All'>All</option>
                            <option value = 'Americas'>America</option>
                            <option value = 'Europe'>Europe</option>
                            <option value = 'Africa'>Africa</option>
                            <option value = 'Asia'>Asia</option>
                            <option value = 'Oceania'>Oceania</option>
                        </select>
                        <select onChange = {(e) => handleFilterActivity(e)} className={styles.selector3}>
                            <option value='All'>Activity</option>
                            <option value='skiing'>Skiing</option>
                            <option value='running'>Running</option>
                        </select>
                    </div>
                    <SearchBar />
                    <Paged
                        countriesPerPage={countriesPerPage}
                        allCountries={allCountries.length}
                        paged={paged}
                    />
                    <div className={styles.cards}>
                        {
                            currentCountries?.map( (c) =>{
                                return(
                                    <fragment key={c.id}>
                                        <Link to={'/home/' + c.id}>
                                            <Card flag={c.flag} name={c.name} continent={c.continent} key={c.id} />
                                        </Link>
                                    </fragment>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )


}



