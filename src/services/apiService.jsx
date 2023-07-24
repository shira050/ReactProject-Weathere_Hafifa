import { API_URL, doApiMethod, doApiGet } from "./apiBasic";
import axios from "axios";


export const doApiLogin = async (bodyData) => {
  let url = API_URL + "/login";
  try {
    let resp = await doApiMethod(url, "POST", bodyData);
    return resp;
  } catch (err) {
    return err.response;
  }
};
export const doApiGetCities = async () => {
  let url = API_URL + "/getAllCities";
  try {
    let resp = await doApiGet(url);
    return resp;
  } catch (err) {
    return err.response;
  }
};


export const getCityDetails = async (currentCityName) => {
  let cityRes = await doApiGetCityByName(currentCityName);
  debugger
  let res = await getWethereBylatlan(cityRes.data.latitude, cityRes.data.longitude);
  console.log(res);
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
  // 
  if (lat && lan) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lan}&appid=36e8fa4c6409867c995a60e402d56a19`;
    try {
      let resp = await axios.get(url);
      return resp;
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







