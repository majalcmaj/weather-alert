import parseForecast from './src/forecast-parser.mjs';
import fetchForecast from './src/forecast-fetcher.mjs';

/**
 * @param {Object} event - Input event to the Lambda function
 * @param {Object} context - Lambda Context runtime methods and attributes
 *
 * @returns {Object} object - Object containing the parsed forecast
 */
export async function handler(event, context) {
  return parseForecast(fetchForecast);
};

