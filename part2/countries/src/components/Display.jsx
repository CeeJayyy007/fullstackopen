import CountryCard from "./CountryCard";
import CountryList from "./CountryList";
import Text from "./Text";

const Display = ({ filteredCountries, handleShow, countrySelector }) => {
  return (
    <>
      {filteredCountries.length > 10 ? (
        <Text text="No query provided or Too many matches, refine filter" />
      ) : filteredCountries.length === 0 ? (
        <Text text="No query provided or query does not match any countries" />
      ) : filteredCountries.length === 1 ? (
        <CountryCard country={filteredCountries[0]} />
      ) : (
        <ul>
          {filteredCountries.map((country) => {
            const name = country.name.common;
            return (
              <CountryList
                key={name}
                country={country}
                handleShow={() => handleShow(name)}
                countrySelector={countrySelector}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Display;
