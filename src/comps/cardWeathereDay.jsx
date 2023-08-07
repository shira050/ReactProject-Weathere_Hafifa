import React from 'react'
import '../assets/whethereImges/sun.jpg'
import { useTranslation } from 'react-i18next';

function CardWeathereDay(props) {
  const { t } = useTranslation('he');
  let tempDay = (((props.day.temp.max + props.day.temp.eve) / 2) - 272.15).toFixed(2);
  let img = props.day.weather[0].icon;
  let description = t(props.day.weather[0].description.toString());
  let indexDay = props.i;
  let degreeColor = '', cntHotestTime = 0;
  let timeDayArr = ['day', 'eve', 'morn', 'night'];
  let feels_likeArr = props.day.feels_like;
  let tempArr = props.day.temp;


  timeDayArr.map((i) => {
    if (feels_likeArr[i] > tempArr[i])
      cntHotestTime++;
  }
  )
  if (cntHotestTime == 1) {
    degreeColor = 'silver';
  } else if (cntHotestTime == 2) {
    degreeColor = 'orange';
  }
  else if (cntHotestTime > 2) {
    degreeColor = 'red';
  }
  console.log(degreeColor);
  return (
    <div className={`m-1 col-2 rounded bg-light bg-opacity-75 `} style={{ color: degreeColor,border:`solid ${degreeColor} 2px ` }}>
      <p className='display-7 font-weight-bold '>

        {
          (indexDay == 1) &&
          <p> מחר:</p>
        }
        {
          (indexDay == 2) &&
          <p> מחרתיים:</p>
        }
        {
          (indexDay > 2) &&
          <p> בעוד {indexDay} ימים:</p>

        }

      </p>


      <img src={`https://openweathermap.org/img/wn/${img}@2x.png`} title={description} className='overflow-hiden w-75' />
      <p className='font-weight-bold'>{tempDay}&deg;</p>
      
      <p>{description}</p> 

    </div>
  )
}

export default CardWeathereDay