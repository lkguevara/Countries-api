const { Country, Activity } = require ('../db');
const axios = require('axios');

const postActivities = async (name, level, duration, season, countryId) => {
    const newActivity = await Activity.create({
        name,
        level,
        duration,
        season,
    })

    await newActivity.addCountry(countryId)

    return newActivity
}


module.exports = {
    postActivities
}