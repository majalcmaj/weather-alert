function parseRawData(rawReport) {
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

async function parseForecast(forecastDataProvider) {
  try {
    const rawReport = await forecastDataProvider();
    const parsedReport = parseRawData(rawReport);
    return { forecast: parsedReport };
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

export default parseForecast;
