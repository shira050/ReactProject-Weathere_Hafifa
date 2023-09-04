import React from 'react'
import '../../assets/whethereImges/sun.jpg'
import { useTranslation } from 'react-i18next';

//let?
function CardWeathereDay(props) {
  const { t } = useTranslation('he');//?
  //const { day, i } = props; destructering
  let tempDay = (((props.day.temp.max + props.day.temp.eve) / 2) - 272.15).toFixed(2); //convert function
  let img = props.day.weather[0].icon;//סעיף ד
  let description = t(props.day.weather[0].description.toString());
  let indexDay = props.i;
  let degreeColor = '', cntHotestTime = 0;
  let timeDayArr = ['day', 'eve', 'morn', 'night'];
  let feels_likeArr = props.day.feels_like;//not an array
  let tempArr = props.day.temp;//not an array

  
  //function getDayName
  let titleDay="";

  //switch case
  // == vs ===
  if (indexDay == 1)
    titleDay = "מחר:"
  else if (indexDay == 2)
    titleDay = " מחרתיים:"

  else if (indexDay > 2)
    titleDay = ` בעוד ${indexDay} ימים:`


//function countHotestTime
timeDayArr.map((i) => {
  if (feels_likeArr[i] > tempArr[i])
    cntHotestTime++;
}
)

//function getColor
if (cntHotestTime == 1) {
  degreeColor = 'silver';
} else if (cntHotestTime == 2) {
  degreeColor = 'orange';
}
else if (cntHotestTime > 2) {
  degreeColor = 'red';
}
return (
  <div className={`m-1 col-2 rounded bg-light bg-opacity-75 `} style={{ color: degreeColor, border: `solid ${degreeColor} 2px ` }}>
    <p className='display-7 font-weight-bold m-0'>
{titleDay}
    </p>


    <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} title={description} className='overflow-hiden h-50' />
    <p className='font-weight-bold m-0'>{tempDay}&deg;</p>

    <p className='m-0'>{description}</p>

  </div>
)
}

export default CardWeathereDay