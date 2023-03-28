// import models
const { Country } = require('../db');
const axios = require('axios');

const countriesDB = async () => {
    try {
        // traer los datos de la api
        const api = await axios.get('https://restcountries.com/v3/all');

        // validar si la base de datos ya tiene los paises
        dbData = await Country.findAll();
        if (dbData.length) return dbData;

        // mappear los datos de la api para guardarlos en la base de datos
        const countriesAllInfo = await api.data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common, 
                flag: country.flags[1],
                continent: country.region,
                capital: country.capital ? country.capital[0] : "Not found",
                population: country.population,
                subregion: country.subregion,
                area: country.area
            };
        });

        // guardar los datos en la base de datos
        dbData = await Country.bulkCreate(countriesAllInfo);
        return dbData;

        
    } 
    catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    countriesDB
}