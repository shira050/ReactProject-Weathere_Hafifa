import { API_URL, doApiMethod, doApiGet } from "./apiBasic";
import axios from "axios";
import weatherData from '../assets/apiRequest.json'


export const doApiLogin = async (bodyData) => {
  let url = API_URL + "/login";
  try {
    debugger
    let resp = await doApiMethod(url, "POST", bodyData, {
      user_name: bodyData.name,
      user_mispar_ishi: bodyData.password

    });
    return resp;
  } catch (err) {
    return err.response;
  }
};
export const doApiGetCities = async () => {
  let url = API_URL + "/getAllCities";
  try {
    // let resp = await doApiGet(url);
    // return resp;
    let cityResFromData=[];
    let data = (weatherData.map(city => {
     let cityName= city.timezone.split('/')[1];
     cityResFromData.push({city:cityName})
    }));
    return cityResFromData;
  } catch (err) {
    return err.response;
  }
};


export const getCityDetails = async (currentCityName) => {
  let cityRes = await doApiGetCityByName(currentCityName);
  let res = await getWethereBylatlan(cityRes.data.latitude, cityRes.data.longitude);
  return res;
}
export const doApiGetCityByName = async (cityName) => {
  let url = API_URL + '/cities/' + cityName;
  try {
    let resp = await doApiGet(url);
    console.log(resp);
    return resp;
  } catch (err) {
    return err.response;
  }
}
export const getWethereBylatlan = async (lat, lan) => {
  if (lat && lan) {
    // ${process.env.API_KEY}
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lan}&appid=6f11fa9760902e1597265ad205f05d2c`;
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
export const chooseColor = async (feels_likeArr, tempArr) => {
  let cntHotestTime = 0, degreeColor = '';
  let timeDayArr = ['day', 'eve', 'morn', 'night'];
  timeDayArr.map((i) => {
    debugger
    if (feels_likeArr[i] > tempArr[i])
      cntHotestTime++;
  }
  )
  debugger
  if (cntHotestTime == 1) {
    degreeColor = 'gray';
  } else if (cntHotestTime == 2) {
    degreeColor = 'orange';
  }
  else if (cntHotestTime > 2) {
    degreeColor = 'red';
  }
  return degreeColor;

}







