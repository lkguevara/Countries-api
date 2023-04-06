const { Country, Activity } = require ('../db');

const postActivities = async (name, level, duration, season, countryId) => {
    const newActivity = await Activity.create({
        name,
        level,
        duration,
        season,
    });

    // Buscar los países por id
    const countries = await Country.findAll({
        where: {
            id: countryId
        }
    });

    

    for (const country of countries) {
        await newActivity.addCountry(country);
    }

    return newActivity;
};


module.exports = {
    postActivities
}