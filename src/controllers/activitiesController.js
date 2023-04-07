const { Country, Activity } = require ('../db');

const postActivities = async (name, level, duration, season, countryId) => {
    // Buscar si la actividad ya existe
    const existingActivity = await Activity.findOne({
        where: { name }
    });
    if (existingActivity) {
        throw new Error('La actividad ya existe');
    }
    
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