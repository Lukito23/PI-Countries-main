const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routeCountries = require('./countries.js');
const routeActivity = require('./activity.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', routeCountries);
router.use('/activity', routeActivity);


module.exports = router;
