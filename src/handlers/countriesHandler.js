// import countriesController
const { countryName, getCountryById } = require('../controllers/countriesController')
// import dbController
const { countriesDB } = require('../controllers/databaseController')
const { Country, Activity } = require('../db')

// * Obtener todos los paises o por nombre
// * Obtener todos los paises o por nombre
const getAllCountriesHandler = async (req, res) => {
    const { name } = req.query
    
    try {
        let countries, activities;

        // Obtener todos los paises de la base de datos
        countries = await Country.findAll();

        // Obtener todas las actividades de la base de datos
        activities = await Activity.findAll({
            include: { 
                model: Country,
                attributes: ['id']
            }
        });

        // Si la base de datos está vacía, traer los datos de la API y guardarlos
        if (!countries.length) {
            await countriesDB();
            countries = await Country.findAll();
        }

        const response = name ? await countryName(name) : await countries.map((country) => {
            const countryActivities = activities.filter(activity => activity.Countries.some(c => c.id === country.id))
            .map(activity => {return {
                name: activity.name,
            }
        });

            

            return {
                id: country.id,
                name: country.name,
                flag: country.flag,
                population: country.population,
                capital: country.capital,
                continent: country.continent,
                activities: countryActivities
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

// * Obtener un pais por id
const getCountryByIdHandler = async (req, res) => {
    const { id } = req.params

    try {
        const response = await getCountryById(id)
        res.status(200).json(response)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllCountriesHandler,
    getCountryByIdHandler
}
