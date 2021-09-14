const { Router } = require('express');
const { getApiCountries, countries, countriesById } = require('../controllers/country');


const router = Router();

router.get('/', countries) // por query y gral

router.get('/:id', countriesById) // por id 


module.exports = router;