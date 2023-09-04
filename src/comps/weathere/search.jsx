import React, { useContext, useRef, useState, useEffect } from "react";
import { MDBCol } from "mdbreact";
import { CityContext } from "../../context/cityContext";
import { doApiGetCityByName, getCityDetails } from "../../services/apiService";
import { MDBBtn } from "mdb-react-ui-kit";

const Search = () => {
  const { cities, updateCurrentCity, currentCity } = useContext(CityContext); // הוספת currentCity
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  //async?
  const serchCountry = async () => {
    const selectedCity = JSON.parse(inputRef.current.value);
    updateCurrentCity(selectedCity);
  };

  return (
    <>
      <MDBCol md="9" className="m-auto my-3 ">
        <div className="row justify-content-around">
          <select ref={inputRef} className="browser-default custom-select  rounded-pill col-9">
            {currentCity && ( // הצגת העיר הנוכחית כאופציה ראשונה אם היא קיימת
              <option value={JSON.stringify(currentCity)}>{currentCity.city}</option>
            )}
            {cities.map((city, i) => (
              <option key={i} value={JSON.stringify(city)}>
                {city.city}
              </option>
            ))}
          </select>
          <button onClick={searchCountry} className="bg-primary bg-gradient rounded col-1" id="basic-text1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </button>
        </div>
      </MDBCol>
    </>
  );
};

export default Search;
