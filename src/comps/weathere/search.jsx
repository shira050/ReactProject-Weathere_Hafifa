import React, { useContext, useRef, useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import { ReactComponent as SearchIcon } from '../icons/search.svg'
import { CityContext } from "../../context/cityContext";

const Search = () => {
  const { cities, setCurrentCity, historySearch, setHistorySearch, currentCity } = useContext(CityContext);
  const inputRef = useRef();

  const searchCountry = async () => {
    const selectedCity = JSON.parse(inputRef.current.value);
    setCurrentCity(selectedCity);

    const existingIndex = historySearch.findIndex(city => city.city === selectedCity.city);

    if (existingIndex !== -1) {
      historySearch.splice(existingIndex, 1); // Remove the existing entry
    }

    if (historySearch.length >= 5) {
      historySearch.splice(0, 1);
    }

    historySearch.push(selectedCity);
  };

  return (
    <>
      {(Object.keys(currentCity).length > 0) &&
        <MDBCol md="9" className="m-auto my-3 ">
          <div className="row justify-content-around">
            <select
              defaultValue={JSON.stringify(currentCity)}
              ref={inputRef} className="browser-default custom-select rounded-pill col-9">
              {cities
                .map((city, i) => (
                  <option key={i} value={JSON.stringify(city)}>
                    {city.city}
                  </option>
                ))}
            </select>

            <button onClick={searchCountry} className="bg-primary bg-gradient rounded col-1" id="basic-text1">
              <SearchIcon />
            </button>
          </div>
        </MDBCol>}
    </>
  );
};

export default Search;
