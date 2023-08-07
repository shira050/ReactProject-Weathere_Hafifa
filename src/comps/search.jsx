import React, { useContext, useRef, useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import { CityContext } from "../context/cityContext";
import { doApiGetCityByName, getCityDetails } from "../services/apiService";
import { MDBBtn } from "mdb-react-ui-kit";


const Search = () => {
  const { cities, updateCurrentCity, historySearch,setHistorySearch } = useContext(CityContext);
  const [searchValue, setSearchValue] = useState("");

  const inputRef = useRef();

  const serchCountry = async () => {
    debugger
    const selectedCity = JSON.parse(inputRef.current.value);
    updateCurrentCity(selectedCity);
    if(historySearch.length>=5)
   { historySearch.splice(0, 1) }
    historySearch.push(selectedCity)
  };

  return (
    <>

      <MDBCol md="9" className="m-auto my-3 ">
        <div className="row justify-content-around">
          
          <select ref={inputRef} class="browser-default custom-select  rounded-pill col-10">
            {cities.map((city, i) => (
              <option key={i} value={JSON.stringify(city)}>
                {city.city}
              </option>
            ))}
          </select>
          <button onClick={serchCountry} className="bg-primary bg-gradient  p-1 rounded col-1" id="basic-text1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
        </div>
      </MDBCol>
    </>
  );
};

export default Search;
