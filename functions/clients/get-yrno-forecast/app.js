const axios = require("axios").default;

async function getWeaterForecast() {
    return axios.get("https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=54.372158&lon=18.63830",
        { config: { headers: { "User-Agent": "majalcmaj-weather-alert" } } });
}

function parseReport(rawReport) {
    const timeseries = rawReport.properties.timeseries;
    const timestamps = timeseries.map(measure => measure.time);
    const windSpeeds = timeseries.map(measure => measure.data.instant.details.wind_speed);
    const windDirections = timeseries.map(measure => measure.data.instant.details.wind_from_direction);
    return {timestamps, windSpeeds, windDirections};
}

/**
 * Sample Lambda function which mocks the operation of checking the current price of a stock.
 * For demonstration purposes this Lambda function simply returns a random integer between 0 and 100 as the stock price.
 * 
 * @param {Object} event - Input event to the Lambda function
 * @param {Object} context - Lambda Context runtime methods and attributes
 *
 * @returns {Object} object - Object containing the current price of the stock
 * 
 */
exports.lambdaHandler = async function (event, context) {
    try {
        const rawReport = (await getWeaterForecast()).data;
        const parsedReport = parseReport(rawReport);
        return { forecast: parsedReport}
    } catch (error) {
        console.error(error)
        return { "error": error }
    }
}
