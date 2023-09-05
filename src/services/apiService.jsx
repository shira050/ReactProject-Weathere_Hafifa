import { API_URL, Method, getRquest } from "./apiBasic";
import axios from "axios";
import weatherData from '../assets/apiRequest.json'


export const loginToSystem = async (bodyData) => {
  let url = API_URL + "/login";
  try {
    let resp = await Method(url, "POST", bodyData, {
      user_name: bodyData.name,
      user_mispar_ishi: bodyData.password

    });
    return resp;
  } catch (err) {
    return err.response;
  }
};
export const GetCities = async () => {
  let url = API_URL + "/getAllCities";
  try {
    // let resp = await  getRquest(url);
    // return resp;
    let cityResFromData = [];
    let data = (weatherData.map(city => {
      let cityName = city.timezone.split('/')[1];
      cityResFromData.push({ city: cityName })
    }));
    return cityResFromData;
  } catch (err) {
    return err.response;
  }
};

//remove   
export const getCityDetails = async (currentCityName) => {
  let cityRes = await GetCityByName(currentCityName);
  let res;
  if (cityRes) res = await getWethereBylatlan(cityRes.data.latitude, cityRes.data.longitude);
  return res;
}
export const GetCityByName = async (cityName) => {
  let url = API_URL + '/cities/' + cityName;
  try {
    let resp = await getRquest(url);
    return resp;
  } catch (err) {
    return err.response;
  }
}
export const getWethereBylatlan = async (lat, lan) => {
  if (lat && lan) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lan}&appid=${process.env.REACT_APP_API_KEY}`;
    try {
      // let resp = await axios.get(url);
      //  return resp;
      let data = (weatherData.find((obj) => obj.lat == lat.toFixed(4) && obj.lon == lan.toFixed(4)));
      return data;

    } catch (err) {
      throw err;
    }

  }

}
const countHotestTime = (feels_like, temp) => {
  let cntHotestTime = 0;
  let timeDayArr = ['day', 'eve', 'morn', 'night'];
  timeDayArr.map((i) => {
    if (feels_like[i] > temp[i])
      cntHotestTime++;
  }
  )
}

export const getColor = async (feels_like, temp) => {
  const cntHotestTime = countHotestTime(feels_like, temp);

  if (cntHotestTime == 1) {
    return 'silver';
  } else if (cntHotestTime == 2) {
    return 'orange';
  }
  return 'red';



}
export const getIcon = async (tempDay) => {
 let icon= 'rainbow';
  if (tempDay.temp.day > 29) { icon= 'sun' }
  if (tempDay.clouds > 20) { icon= 'cloudy' }
  if (tempDay.pop > 40) { icon= 'rain' }
 return `/weatherIcons/${icon(day)}.png`
}
export  const convertKelvinToCelsius = (temp) => {
  return ((temp / 2) - 272.15).toFixed(2);
}







