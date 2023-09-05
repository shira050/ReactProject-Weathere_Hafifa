import React, { useContext, useRef, useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import { CityContext } from "../../context/cityContext";
import { GetCityByName, getCityDetails } from "../../services/apiService";
import { ReactComponent as SearchIcon } from '../icons//search.svg'
const Search = () => {
  const { cities, setCurrentCity, currentCity } = useContext(CityContext); // הוספת currentCity
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const searchCountry = () => {
    const selectedCity = JSON.parse(inputRef.current.value);
    setCurrentCity(selectedCity);
  };

  return (
    <>
      <MDBCol md="9" className="m-auto my-3 ">
        <div className="row justify-content-around">
          <select ref={inputRef} className="browser-default custom-select rounded-pill col-9">
            {currentCity && (
              <option value={JSON.stringify(currentCity)}>{currentCity.city}</option>
            )}
            {cities
              .filter(city => city.city !== currentCity.city) // Exclude the current city
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
      </MDBCol>
    </>
  );
};

export default Search;