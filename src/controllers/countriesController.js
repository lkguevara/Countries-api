// traigo mis modelos de la bd;
const { Country, Activity } = require ('../db');
const axios = require('axios');

// * Obtener todos los paises o por nombre
const getAllCountries = async () => {
    // traigo todos los paises de la bd
    const countriesDB = await Country.findAll();

    const countriesApi = await axios.get('https://restcountries.com/v3.1/all');

    // mapeo los paises de la api
    const countries = await countriesApi.data.map((country) => {
        return {
            id: country.cca3,
            name: country.name.common, 
            flag: country.flags.svg,
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
    });

    // Si se encuentra en la base de datos, se devuelve directamente
    if (countryDB) {
        return [countryDB];
    }

    // si no está en la base de datos, buscar en la API
    const countryApi = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
    const country = countryApi.data.map((country) => {
        return {
            id: country.cca3,
            name: country.name.common, 
            flag: country.flags.svg,
            continent: country.region,
            capital: country.capital,
            population: country.population
        }
    }
    )

    // Si no se encontró nada en la API, se devuelve null
    if (country.length === 0) {
        return null;
    }

    return country;

}

// * Obtener un pais por id
const getCountryById = async (id) => {
    id = id.toLowerCase(); // metodo para pasar a minuscula

    // si el id =! a 3 caracteres mandar mensaje de error
    if (id.length !== 3) {
        return 'El id debe tener 3 caracteres';
    }

    // buscar en la db
    const countryDB = await Country.findOne({
        where: {
            id: id
        }
    });

    // Si se encuentra en la base de datos, se devuelve directamente
    if (countryDB) {
        return countryDB;
    }

    // si no está en la base de datos, buscar en la API
    const countryApi = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
    const country = countryApi.data.map((country) => {
        return {
            id: country.cca3,
            name: country.name.common, 
            flag: country.flags.svg,
            continent: country.region,
            capital: country.capital,
            population: country.population
        }
    }
    )

    // Si no se encontró nada en la API, se devuelve null
    if (country.length === 0) {
        return null;
    }

    return country;
    
}



// exports
module.exports = {
    getAllCountries,
    countryName,
    getCountryById
}
