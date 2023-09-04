import React, { useContext } from 'react'
import { CityContext } from '../../context/cityContext';
import { convertKelvinToCelsius, getIcon } from '../../services/apiService';

function WeatherToday() {
    const { currentCity, temp, setTemp } = useContext(CityContext);

       const currentDay = temp.daily[0];
      const  tempDay = convertKelvinToCelsius(currentDay.temp.max + currentDay.temp.eve);
      const  description = currentDay.weather[0].description;
       


    return (
        <div className="bg-light bg-opacity h-md-50 h-25 row justify-content-between p-5 rounded bg-opacity-75 d-flex" style={{ minHeight: '150px', alignItems: 'center' }}>
            <div className="col-8">
                <h2 className="">היום</h2>
                <p className="display-4">{currentCity.city}</p>
                <p>{tempDay}&deg;</p>
                <p>{description}</p>
            </div>
            <div className="col-4">
                <img src={getIcon(currentDay)} alt={description} className="h-100 w-100" />
            </div>
        </div>
    )
}

export default WeatherToday