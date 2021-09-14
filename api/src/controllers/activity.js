const { Activity, Country } = require('../db');
const { v4: uuidv4 } = require("uuid");



async function createActivity(req, res, next){  //post('/')
    const { name, difficulty, duration, season, countryId } = req.body;
    try {
        let id = uuidv4()
        let newActivity = await Activity.create({
            id,
            name,
            difficulty,
            duration,
            season
        })
        //Project.findOne({ where: { title: 'My Title' } })
        const country = await Country.findByPk(countryId) //tiene el registro completo
        newActivity.addCountry(country) // a la actividad le asocio un pais
        res.json(newActivity)
        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createActivity
}