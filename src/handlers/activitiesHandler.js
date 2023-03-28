// importo los controladores
const { postActivities } = require('../controllers/activitiesController')
const { Country, Activity } = require ('../db');

// * Obtener todas las actividades
const getAllActivitiesHandler = async (req, res) => {
    try {
        let result = await Activity.findAll();
        if (!result.length) {
            return res
                .status(200)
                .send("No se encuentran actividades")
        }
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

// * Crear una actividad
const postActivitiesHandler = async (req, res) => {
    const { name, level, duration, season, countryid  } = req.body

    try {
        const response = await postActivities(name, level, duration, season,countryid )
        res.status(200).json(response)
    }
    catch (error) {
        // console.log(error)
        res.status(400).json({error: error.message})
    }
}



module.exports = {
    getAllActivitiesHandler,
    postActivitiesHandler
}
