import React from 'react'
import '../../assets/whethereImges/sun.jpg'
import { useTranslation } from 'react-i18next';
import { convertKelvinToCelsius, getColor, getIcon } from '../../services/apiService';


function CardWeathereDay(props) {
  const { t } = useTranslation('he');//?
  const { day} = props; //destructering
  const description = t(props.day.weather[0].description.toString());
  const feels_like = props.day.feels_like;
  const temp = props.day.temp;


 


  const getDayTitle = () => {
    const indexDay = props.i;



    
    if (indexDay == 0)
      return "מחר:"
    else if (indexDay == 1)
      return " מחרתיים:"

    else if (indexDay > 1)
      return ` בעוד ${indexDay} ימים:`

  }
  const tempDay = convertKelvinToCelsius((props.day.temp.max + props.day.temp.eve));

  return (
    <div className={`m-1 col-2 rounded bg-light bg-opacity-75 `} style={{ color: getColor(feels_like, temp), border: `solid ${getColor(feels_like, temp)} 2px ` }}>
      <p className='display-7 font-weight-bold m-0'>
        {getDayTitle()}
      </p>


      <img src={getIcon(day)} title={description}  className='overflow-hiden  h-50' />
      <p className='font-weight-bold m-0'>{tempDay}&deg;</p>

      <p className='m-0'>{description}</p>

    </div>
  )
}

export default CardWeathereDay