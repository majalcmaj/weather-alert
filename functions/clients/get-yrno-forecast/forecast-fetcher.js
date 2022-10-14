import axios from "axios";

async function fetchForecast() {
  return axios.get(
    "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=54.372158&lon=18.63830", 
    {headers: {"User-Agent": "KiteAlertApp/0.1"}});
}

export default fetchForecast;

