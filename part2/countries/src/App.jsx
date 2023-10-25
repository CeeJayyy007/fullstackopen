import { useState, useEffect } from "react";
import Search from "./components/Search";
import countriesService from "./services/countries";
import Display from "./components/Display";

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countrySelector, setCountrySelector] = useState("");

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  // do not render anything if countries is still null
  if (!countries) {
    return null;
  }

  const handleChange = (event) => {
    const query = event.target.value;

    //retrieve filtered countries into an array
    const filterResult = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query)
    );

    setFilteredCountries(filterResult);
  };

  const handleShow = (name) => {
    setCountrySelector(name);
  };

  return (
    <>
      <Search text="Find Countries" handleChange={handleChange} />
      <Display
        filteredCountries={filteredCountries}
        handleShow={handleShow}
        countrySelector={countrySelector}
      />
    </>
  );
};

export default App;
