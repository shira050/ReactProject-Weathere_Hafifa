import React, { useContext, useRef, useState } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import { CityContext } from "../../context/cityContext";
import { doApiGetCityByName, getCityDetails } from "../../services/apiService";
import { MDBBtn } from "mdb-react-ui-kit";
import { ReactComponent as SearchIcon } from '../icons//search.svg'


const Search = () => {
  const { cities, updateCurrentCity } = useContext(CityContext);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const serchCountry = async () => {
    const selectedCity = JSON.parse(inputRef.current.value);
    updateCurrentCity(selectedCity);
  };

  return (
    <>

      <MDBCol md="9" className="m-auto my-3 ">
        <div className="row justify-content-around">
           
          <select ref={inputRef} class="browser-default custom-select  rounded-pill col-9">
            {cities.map((city, i) => (
              <option key={i} value={JSON.stringify(city)}>
              {city.city}
            </option>
            ))}

            
          </select>
          <button onClick={serchCountry} className="bg-primary bg-gradient rounded col-1" id="basic-text1">
             <SearchIcon/>
            </button>
        </div>
      </MDBCol>
    </>
  );
};

export default Search;
