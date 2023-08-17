import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {//fetch coordinates based on city name
    return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)//option parameter for fetch
      .then((response) => response.json())//this 'then' block is chained to the promise. It waits for the response to be received and then parses it as JSON using the .json() method of the response object.
      .then((response) => {//.then() block is chained to the promise. It receives the parsed JSON response and maps over the data array in the response. For each city in the data array, it constructs an object with two properties:value , label

        return {
          options: response.data.map((city) => {//for each city , it maps data with 2 parameters
            return {//returns value , label
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (searchData) => {//handleChange function for input data updation
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    // for searching and loading feature
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
