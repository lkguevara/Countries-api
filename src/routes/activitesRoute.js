const { Router } = require("express");

// Imports Handlers
const {getAllActivitiesHandler, postActivitiesHandler } = require ('../handlers/activitiesHandler')

// Router
const activitiesRouter = Router();

// rutas
activitiesRouter.get('/', getAllActivitiesHandler);
activitiesRouter.post('/', postActivitiesHandler);

// export
module.exports = activitiesRouter;