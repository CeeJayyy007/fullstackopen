const CountryCard = ({ filteredCountry }) => {
  const country = filteredCountry[0];

  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = country.languages;
  const flag = country.flags.png;

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
    </>
  );
};

export default CountryCard;
