import { createContext, useEffect, useState } from 'react';

const CityContext = createContext();

const CityProvider = ({ children }) => {

  const [currentCity, setCurrentCity] = useState({});
  const [cities, setCities] = useState([]);
  const [temp,setTemp]=useState();
  const [historySearch,setHistorySearch]=useState([]);

  const addCity = (newCity) => {
    setCities([...cities, newCity]);
  };
  const updateCities = (_cities) => {
    setCities(_cities);
  };
  const updateCurrentCity = (_city) => {
    setCurrentCity(_city);
  };


  return (
    <CityContext.Provider value={{ cities, addCity ,updateCities,currentCity,updateCurrentCity,temp,setTemp,historySearch,setHistorySearch}}>
      {children}
    </CityContext.Provider>
  );
};

export { CityContext, CityProvider };
