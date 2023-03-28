// import countriesController
const { countryName, getCountryById } = require('../controllers/countriesController')
// import dbController
const { countriesDB } = require('../controllers/databaseController')


// * Obtener todos los paises o por nombre
const getAllCountriesHandler = async (req, res) => {
    const { name } = req.query
    
    // hace un llamado a la base de datos para obtener los paises
    const countries = await countriesDB()

    try {
        const response = name 
            ? await countryName(name) 
            : await countries.map((country) => {
                return {
                    id: country.id,
                    name: country.name,
                    flag: country.flag,
                    continet: country.continet,
                    population: country.population
                }
            });

        res.status(200).json(response)
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

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
