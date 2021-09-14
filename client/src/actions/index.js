import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        var json = await axios('http://localhost:3001/countries');
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getNameCountries(name){
    return async function(dispatch){
        try {
            var json = await axios(`http://localhost:3001/countries?name=${name}`)
            return dispatch({
                type: 'GET_BY_NAME',
                payload:json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterContinent(payload){
    console.log(payload)
    return{
        type: 'FILTER_CONTINENT',
        payload
    }
}

export function sort(payload){
    return{
        type: 'SORT',
        payload
    }
}

export function createActivity(details){
    return async function(dispatch){
        const json = await axios.post('http://localhost:3001/activity', details)
        console.log(json)
        return json
    }
}

export function countryDetail (id){
    return async function (dispatch){
        try {
            var json = await axios ('http://localhost:3001/countries/' + id)
            return dispatch({
                type: 'COUNTRY_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterActivity(payload){
    return{
        type: 'FILTER_ACTIVITY',
        payload
    }
}