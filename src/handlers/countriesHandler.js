// importo los controladores
const { getAllCountries, countryName, getCountryById } = require('../controllers/countriesController')


// * Obtener todos los paises o por nombre
const getAllCountriesHandler = async (req, res) => {
    const { name } = req.query

    try {
        const response = name 
            ? await countryName(name) 
            : await getAllCountries()

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
