import React, { useContext } from 'react'
import { CityContext } from '../../context/cityContext';

function WeatherToday() {
    const { currentCity, temp, setTemp } = useContext(CityContext);
     let tempDay, img, description, tempArr, feels_likeArr, currentDay;
    if (temp) {
        currentDay = temp.daily[0];
        tempDay = (((currentDay.temp.max + currentDay.temp.eve) / 2) - 272.15).toFixed(2);
        img = currentDay.weather[0].icon;
        description = currentDay.weather[0].description;
        feels_likeArr = currentDay.feels_like;
        tempArr = currentDay.temp;

    }

    return (
        <div className="bg-light bg-opacity h-md-50 h-25 row justify-content-between p-5 rounded bg-opacity-75 d-flex" style={{ minHeight: '150px', alignItems: 'center' }}>
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
    )
}

export default WeatherToday