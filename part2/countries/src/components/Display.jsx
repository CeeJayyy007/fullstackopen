import Text from "./Text";

const Display = ({ filteredCountries }) => {
  return (
    <>
      {filteredCountries.length > 10 ? (
        <Text text="Too many matches, refine filter" />
      ) : filteredCountries.length === 0 ? (
        <Text text="No query provided or query does not match any countries" />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Display;
