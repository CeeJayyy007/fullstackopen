import { useEffect, useState } from "react";
import countriesService from "../services/countries";

const CountryCard = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;

  useEffect(() => {
    countriesService.query(name).then((weatherData) => {
      setWeather(weatherData);
    });
  }, [name]);

  // do not render weather views if weather is still null
  if (!weather) {
    return null;
  }

  const temperature = weather.main.temp;
  const windSpeed = weather.wind.speed;
  const icon = weather.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(languages).map(([key, language]) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={`The flag of ${name}`} />
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature} Celcius</p>
      <img src={weatherIconUrl} alt={`${name} weather icon`} />
      <p>Wind: {windSpeed} m/s</p>
    </>
  );
};

export default CountryCard;
