const { Router } = require("express");
// Imports Handlers
const { getAllCountriesHandler } = require ('../handlers/countriesHandler')

const countriesRouter = Router();

// rutas
countriesRouter.get('/', getAllCountriesHandler);
// countriesRouter.get('/:id', getCountriesById);

// export
module.exports = countriesRouter;