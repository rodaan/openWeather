/* eslint-disable no-console */
import request from 'request';

const convertKToF = (kelvinTemp) => kelvinTemp * (9 / 5) - 459.67;

const convertKToC = (celsiusTemp) => celsiusTemp - 273.15;

const getWeather = (params, callback, key) => {
  const APPID = process.env.APPID || key;
  if (!key) {
    callback('You need a key from http://openweathermap.org/');
  }
  request({
    url: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      lat: params.latitude,
      lon: params.longitude,
      APPID,
    },
    method: 'POST',
  }, (err, response, body) => {
    if (err) {
      console.log('Error calling weather api: ', err);
    }
    const bodyObj = JSON.parse(body);

    const avgTempC = Math.round(convertKToC(Number(bodyObj.main.temp)) * 100) / 100;
    const minTempC = Math.round(convertKToC(Number(bodyObj.main.temp_min)) * 100) / 100;
    const maxTempC = Math.round(convertKToC(Number(bodyObj.main.temp_max)) * 100) / 100;

    const avgTempF = Math.round(convertKToF(Number(bodyObj.main.temp)) * 100) / 100;
    const minTempF = Math.round(convertKToF(Number(bodyObj.main.temp_min)) * 100) / 100;
    const maxTempF = Math.round(convertKToF(Number(bodyObj.main.temp_max)) * 100) / 100;

    const resObj = {
      lon: bodyObj.coord.lon,
      lat: bodyObj.coord.lat,
      city: bodyObj.name,
      country: bodyObj.sys.country,
      sunset: bodyObj.sys.sunset,
      sunrise: bodyObj.sys.sunrise,
      weather: bodyObj.weather[0].main,
      weatherDes: bodyObj.weather[0].description,
      avgTempK: bodyObj.main.temp,
      minTempK: bodyObj.main.temp_min,
      maxTempK: bodyObj.main.temp_max,
      avgTempC,
      minTempC,
      maxTempC,
      avgTempF,
      minTempF,
      maxTempF,
    };
    console.log('response object is:', resObj);
    callback(resObj);
  });
};

export default { getWeather };
