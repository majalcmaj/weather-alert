import fetchForecast from "./forecast-fetcher.js";

function parseReport(rawReport) {
  const timeseries = rawReport.properties.timeseries;
  const timestamps = timeseries.map((measure) => measure.time);
  const windSpeeds = timeseries.map(
    (measure) => measure.data.instant.details.wind_speed
  );
  const windDirections = timeseries.map(
    (measure) => measure.data.instant.details.wind_from_direction
  );
  return { timestamps, windSpeeds, windDirections };
}

async function getYrNoForecast(fetchForecastFn) {
  try {
    const rawReport = await fetchForecastFn();
    const parsedReport = parseReport(rawReport);
    return { forecast: parsedReport };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

/**
 * @param {Object} event - Input event to the Lambda function
 * @param {Object} context - Lambda Context runtime methods and attributes
 *
 * @returns {Object} object - Object containing the parsed forecast
 */
async function lambdaHandler(event, context) {
  return getYrNoForecast(fetchForecast);
};

export { lambdaHandler, getYrNoForecast };
