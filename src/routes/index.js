const { Router } = require('express');

// Importar todos los routers
const countriesRouter = require('./countriesRoute.js');
const activitiesRouter = require('./activitesRoute.js');

const router = Router();

// Configurar los routers
router.use('/countries', countriesRouter);
router.use('/activities', activitiesRouter);

// Exportar el router
module.exports = router;



