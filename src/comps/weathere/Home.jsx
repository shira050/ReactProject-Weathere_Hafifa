import React, { useContext, useEffect, useState } from 'react';
import '../css/home.css';
import Search from './search';
import { USER } from '../../services/apiBasic';
import { UserContext } from '../../context/userContext';
import { CityContext } from '../../context/cityContext';
import { GetCities, GetCityByName, getCityDetails, getWethereBylatlan } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import CardWeathereDay from './cardWeathereDay';
import WeatherToday from './today';
import Loading from '../loading';


export default function Home() {
  const { currentUser } = useContext(UserContext);
  const { currentCity, setCurrentCity, cities, setCities, temp, setTemp } = useContext(CityContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const getCities = async () => {
    try {
      let res = await GetCities();
      //  && res.status === 200
      if (res) {
        await setCities(res);

      } else {
        alert('שגיאה בטעינת ערים אנא נסה מאוחר יותר!');
      }
    } catch (error) {
      console.error(error);
      setError(error)
    } finally {
       setLoading(false);
    }
  };

  const initApp = async () => {
    setLoading(true);
    await getCities();
  };

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    const fetchCitiesData = async () => {
      if (Object.keys(currentCity).length == 0 || !currentCity) {
        const jerusalemCity = cities.find(city => city.city.toLowerCase() === 'jerusalem');
        if (jerusalemCity) {
          setCurrentCity(jerusalemCity);
        }
      }

    };
    fetchCitiesData();
  }, [cities]);

  useEffect(() => {
    const fetchCurrentCityData = async () => {
      if (currentCity) {
        let res = await getCityDetails(currentCity.city);
        setTemp(res);
      }
    };
    fetchCurrentCityData();

  }, [currentCity]);


  return (
    <div className="container-fluid  text-center bg-img">
      <div className="container py-1">
        {currentUser && <h2 className="display-5">שלום {currentUser.First_Name} {currentUser.Last_Name}</h2>}
        <Search></Search>

        <div style={{ position: 'relative' }}>
          {temp ? (
            <>
              <WeatherToday />
              <div className='buttomPosition' style={{ position: 'absolute', width: "100%" }}>
                <div className="row justify-content-between" >
                  {temp.daily.slice(1, 6).map((x, i) => (
                    <CardWeathereDay day={x} key={i} i={i} />
                  ))}

                </div>
              </div>
            </>

          ) :
            <>
              {loading ? (
                <Loading/>
              ) : (error) && (
                <p>seems like we have problem... please try again :( </p>
              )}
            </>
          }
        </div>

      </div>
    </div>
  );
}
