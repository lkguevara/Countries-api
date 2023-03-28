const { Country, Activity } = require ('../db');
const axios = require('axios');

const postActivities = async (name, level, duration, season, countryId) => {
    const newActivity = await Activity.create({
        name,
        level,
        duration,
        season,
    })

    // Buscqr el id recibido
    const country = await Country.findByPk(countryId);

    if (!country) {
      throw new Error(`Country with ID ${countryId} not found`);
    }

    await newActivity.addCountry(countryId)

    return newActivity
}


module.exports = {
    postActivities
}