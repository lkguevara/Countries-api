const { Country, Activity  } = require ('../db');
const { Op } = require('sequelize');
const axios = require('axios');

// * Obtener un pais por nombre
const countryName = async (name) => {
    const countrybyName  = await Country.findAll({
        where: {
            name: {[ Op.iLike ]: `%${name}%`}
        },
        include: {
                  model: Activity,
                  through:{
                      attributes:[],
                  }
        },
    })
  
    return countrybyName

}

// * Obtener un pais por id
const getCountryById = async (id) => {
    // creo una constante que me va a traer el pais de la base de datos, donde el id sea igual al id que recibo por parametro
    const country = await Country.findOne({
        where: {
          id: {
            [Op.iLike]: id // iLike es para que no sea case sensitive (no importa si es mayuscula o minuscula) y el op sirve para hacer operaciones
          }
        },

        include: {
            model: Activity,
            through:{
                attributes:[],
            }
  },
      });

    //   si no se encuentra mandar un error
    if (!country) {
        throw new Error('Country not found in database ');
    }

    return country;
    
}



// exports
module.exports = {
    countryName,
    getCountryById
}
