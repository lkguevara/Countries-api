const { Router } = require("express");
// Imports Handlers
const { getAllCountriesHandler,  getCountryByIdHandler} = require ('../handlers/countriesHandler')

// config router
const countriesRouter = Router();

// rutas
countriesRouter.get('/', getAllCountriesHandler);
countriesRouter.get('/:id', getCountryByIdHandler);

// export
module.exports = countriesRouter;