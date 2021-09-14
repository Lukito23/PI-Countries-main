const { Country , Activity} = require('../db');
const axios = require('axios');
const { Op } = require('sequelize');


async function getApiCountries(req, res, next){
    try {
        const api = await axios.get('https://restcountries.eu/rest/v2/all');
        const countries = await api.data;
        
        countries.map(async c => {
            try{
                const [country, created] = await Country.findOrCreate({
                    where: {
                        id: c.alpha3Code
                    },

                    defaults: {
                        id: c.alpha3Code,
                        name: c.name,
                        flag: c.flag,
                        continent: c.region,
                        capital: c.capital,
                        subregion: c.subregion,
                        area: c.area,
                        poblation: c.population
                    }
                })

                return country;
            }catch(error){
                console.log(error)
            }
           
        })

    } catch (error) {
        next(error);
    }
}

//bulkCreate = recorre un array y por cada elemento crea un registro 

async function countries(req, res , next){  // get('/' y get query)
    await getApiCountries();//si hay query, filtrame por el query y trae los que matachean, sino hay query, traeme todos los paises
    const {name} = req.query;
    try{


        console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    
        if(name){

            const firstLetter = name.charAt(0).toUpperCase();
            const restWord = name.slice(1).toLowerCase();
            const searcheado = firstLetter + restWord;

            let countriesQ = await Country.findAll({
                include: {
                    model: Activity,
                    attributes: ['name']
                },
                where: {
                    name:{[Op.like]:`%${searcheado}%`}
                }
            })
            if(countriesQ.length){
                return res.json(countriesQ);
            } else {
                return res.status(404).send('No existe el país')
            }
    
    
        } else {
            let countries = await Country.findAll({
                include: {
                    model: Activity,
                    attributes: ["name"]
                }
            })
            return res.json(countries);
        }
    } catch(error){
        next(error)
    }

}

async function countriesById(req, res, next){ //(get /:id ) 
    const { id } = req.params;

    try {
        
        const country = await Country.findOne({
            where: {
                id: id
            },
            include: {
                model: Activity
            } 
        })

        if(country){
            return res.json(country)
        } else {
            return res.send('No existe el id')
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getApiCountries,
    countries,
    countriesById
}

// hago llamada a la api y los guardo en la base de datos
// traigo los paieses de la base de datos y los muestro en pantalla