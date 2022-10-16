import axios from "axios";

async function fetchForecast() {
  const response = await axios.get(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=54.372158&lon=18.63830", 
    {headers: {"User-Agent": "KiteAlertApp/0.1"}});
  if(response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.data;
}

export default fetchForecast;

