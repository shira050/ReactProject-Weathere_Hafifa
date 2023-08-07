import React, { useContext, useEffect, useState } from 'react';
import './css/home.css';
import Search from './search';
import '../assets/whethereImges/cloudAndSun.jpg';
import CardWeathereDay from './cardWeathereDay';
import { USER } from '../services/apiBasic';
import { UserContext } from '../context/userContext';
import { CityContext } from '../context/cityContext';
import { doApiGetCities, doApiGetCityByName, getCityDetails, getWethereBylatlan } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import '../assets/loading_gif.gif'
import axios from 'axios';


export default function Home() {
  const { currentUser, updateUser } = useContext(UserContext);
  const { currentCity, updateCurrentCity, cities, updateCities, temp, setTemp } = useContext(CityContext);
  const [loading, setLoading] = useState(true);
  let tempDay, img, description, tempArr, feels_likeArr, currentDay;
  if (temp) {
    console.log(temp, "lll");
    currentDay = temp.daily[0];
    console.log(currentDay, 'currentDay');
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
    // כיבת api לקובץ
    // let resArr = [];
    // const fetchData2 = async () => {
    //   for (let index = 0; index < cities.length; index++) {
    //     console.log(cities[index]);
    //     let res = await getCityDetails(cities[index].city);
    //     resArr.push(res.data);

    //   };
    //   debugger
    //   console.log(resArr);
    //   try {
    //     let resp = await axios({
    //       url: "http://localhost:3002/write/citiesWeathereData.txt",
    //       method: "POST",
    //       data: { content: JSON.stringify(resArr) },
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Content-Length": "<calculated when request is sent>",
    //         "Host": "<calculated when request is sent>",
    //         "User-Agent": "PostmanRuntime/7.32.3",
    //         "Accept": "*/*",
    //         "Accept-Encoding": "gzip, deflate, br",
    //         "Connection": "keep-alive"
    //       },
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    const fetchData = async () => {
      for (let index = 0; index < cities.length; index++) {
        if (cities[index].city.toLowerCase() === 'jerusalem') {
          await updateCurrentCity(cities[index]);
          break;
        }
      }
    };
    fetchData();
    // cities.length > 0 && fetchData2();
  }, [cities]);

  useEffect(() => {
    debugger
    const fetchData = async () => {
      if (currentCity) {
        let res = await getCityDetails(currentCity.city);
        setTemp(res);
      }
    };
    fetchData();

  }, [currentCity]);


  return (
    <div className="container-fluid bg-img text-center ">
      <div className="container py-5">
        {currentUser && <h2 className="display-5">שלום {currentUser.First_Name} {currentUser.Last_Name}</h2>}
        <Search></Search>
        {loading ? (
          <div >
            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/max_632/04de2e31234507.564a1d23645bf.gif' className='w-25'></img>
            <p className='display-7'>Loading...</p>
          </div>
        ) : (
          <div style={{position:'relative'}}>
            <div className="bg-light bg-opacity h-75 row justify-content-between p-5 rounded bg-opacity-75 d-flex" style={{minHeight:'450px',alignItems:'center'}}>
             
              <div className="col-8">
                <h2 className="">היום</h2>
                <p className="display-4">{currentCity.city}</p>
                {temp && (
                  <>
                    <p>{tempDay}&deg;</p>
                    <p>{description}</p>
                  </>
                )}
              </div>
              <div className="col-4">
                <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} alt={description} className="h-100 w-100" />
              </div>
            </div>

            <div style={{position:'absolute', bottom: "-45%",width:"100%" }}>
              {temp && (
                <div className="row justify-content-between" >
                  {temp.daily.map((x, i) => {
                    if (i > 0&&i<6) return <CardWeathereDay day={x} i={i} />;
                  })}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
