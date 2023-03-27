// traigo mis modelos de la bd;
const { Country, Activity } = require ('../db');
const axios = require('axios');

// * Obtener todos los paises o por nombre
const getAllCountries = async () => {
    // traigo todos los paises de la bd
    const countriesDB = await Country.findAll();

    // Traer los paises de la api
    const countriesApi = await axios.get('https://restcountries.com/v2/all');

    // mapeo los paises de la api
    const countries = await countriesApi.data.map((country) => {
        return {
            id: country.id,
            name: country.name, 
            flag: country.flag,
            continent: country.region,
            capital: country.capital,
            population: country.population
        }
    }
    )

    // concatenar los paises de la api con los de la bd
    return [ ...countries, ...countriesDB ]
}

// * Obtener un pais por nombre
const countryName = async (name) => {
    // buscar en la db
    const countryDB = await Country.findOne({
        where: {
            name: name
        }
    })

    // api  
    const countryApi = await axios.get(`https://restcountries.com/v2/name/${name}`)
    const country = countryApi.data.map((country) => {
        return {
            id: country.id,
            name: country.name, 
            flag: country.flag,
            continent: country.region,
            capital: country.capital,
            population: country.population,
            createdDb: false
        }
    }
    )

    // hacer un filtro
    const countryFilter = country.filter((country) => country.name.toLowerCase() === name.toLowerCase())

    // concatena
    return [ ...countryFilter, countryDB ]
}



// exports
module.exports = {
    getAllCountries,
    countryName
}
