import React, { useContext, useEffect, useState } from 'react';
import '../css/home.css';
import Search from './search';
import '../../assets/whethereImges/cloudAndSun.jpg';
import { USER } from '../../services/apiBasic';
import { UserContext } from '../../context/userContext';
import { CityContext } from '../../context/cityContext';
import { doApiGetCities, doApiGetCityByName, getCityDetails, getWethereBylatlan } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import '../../assets/loading_gif.gif'
import CardWeathereDay from './cardWeathereDay';


export default function Home() {
  const { currentUser, updateUser } = useContext(UserContext);
  const { currentCity, updateCurrentCity, cities, updateCities, temp, setTemp } = useContext(CityContext);
  const [loading, setLoading] = useState(true);
  let tempDay, img, description, tempArr, feels_likeArr, currentDay;
  if (temp) {
    currentDay = temp.daily[0];
    tempDay = (((currentDay.temp.max + currentDay.temp.eve) / 2) - 272.15).toFixed(2);
    img = currentDay.weather[0].icon;
    description = currentDay.weather[0].description;
    feels_likeArr = currentDay.feels_like;
    tempArr = currentDay.temp;

  }

  const getCities = async () => {
    try {
      let res = await doApiGetCities();
      //  && res.status === 200
      if (res) {
        updateCities(res);
      } else {
        alert('שגיאה בטעינת ערים אנא נסה מאוחר יותר!');
      }
    } catch (error) {
      console.error(error);
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
    const fetchData = async () => {
      for (let index = 0; index < cities.length; index++) {
        if (cities[index].city.toLowerCase() === 'jerusalem') {
          await updateCurrentCity(cities[index]);
          break;
        }
      }
    };
    fetchData();
  }, [cities]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentCity) {
        let res = await getCityDetails(currentCity.city);
        setTemp(res);
      }
    };
    fetchData();

  }, [currentCity]);


  return (
    <div className="container-fluid  text-center bg-img">
      <div className="container py-1">
        {currentUser && <h2 className="display-5">שלום {currentUser.First_Name} {currentUser.Last_Name}</h2>}
        <Search></Search>
        {loading ? (
          <div >
            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif' className='w-25'></img>
            <p className='display-7'>Loading...</p>
          </div>
        ) : (
          <div style={{position:'relative'}}>
            {temp?(
              <>
            
            <div className="bg-light bg-opacity h-md-50 h-25 row justify-content-between p-5 rounded bg-opacity-75 d-flex" style={{minHeight:'150px',alignItems:'center'}}>
             
              <div className="col-8">
                <h2 className="">היום</h2>
                <p className="display-4">{currentCity.city}</p>
                    <p>{tempDay}&deg;</p>
                    <p>{description}</p>
                              </div>
              <div className="col-4">
                <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} alt={description} className="h-100 w-100" />
              </div>
            </div>

            <div className='buttomPosition' style={{position:'absolute',width:"100%" }}>
            
                <div className="row justify-content-between" >
                  {temp.daily.map((x, i) => {
                    if (i > 0&&i<6) return <CardWeathereDay day={x} i={i} />;
                  })}
                </div>
            </div>
            </>
            
            ):<>
            <p>error {temp&&temp.res&& temp.data}</p>
            </>}
          </div>
        )}

      </div>
    </div>
  );
}
