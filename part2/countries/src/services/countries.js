import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries";
const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`);
  return request.then((response) => response.data);
};

const query = (name) => {
  const request = axios.get(
    `${weatherUrl}${name}&APPID=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&units=metric`
  );
  return request.then((response) => response.data);
};

export default { getAll, query };
