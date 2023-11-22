/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const getCountry = async () => {
    try {
      const response = await axios.get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
      );
      setCountry(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCountry();
  }, [name]);

  return country;
};
