import CountryCard from "./CountryCard";

const CountryList = ({ country, handleShow, countrySelector }) => {
  return (
    <>
      <li>
        {country.name.common} <button onClick={handleShow}>show</button>
      </li>

      {/* show only country whose name matches the country selector */}
      {countrySelector === country.name.common && (
        <CountryCard country={country} />
      )}
    </>
  );
};

export default CountryList;
