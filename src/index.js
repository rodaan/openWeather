/* eslint-disable no-console */
import request from 'request';
import countrynames from 'countrynames';

const convertKToF = (kelvinTemp) => kelvinTemp * (9 / 5) - 459.67;

const convertKToC = (celsiusTemp) => celsiusTemp - 273.15;

const openWeather = (params, callback, key) => {
  const APPID = process.env.APPID || key;
  const queryStringObj = { APPID };
  let completeQuery = false;
  if (!APPID) {
    callback('You need a key from http://openweathermap.org/');
  }
  if (params.latitude !== undefined && params.longitude !== undefined) {
    queryStringObj.lat = params.latitude;
    queryStringObj.lon = params.longitude;
    completeQuery = true;
  } else if (params.city !== undefined) {
    let cityQuery = params.city;
    completeQuery = true;
    if (params.country !== undefined) {
      let countryQuery;
      if (params.country.length > 2) {
        countryQuery = countrynames.getCode(params.country);
      } else {
        countryQuery = params.country;
      }
      cityQuery += ','.concat(countryQuery);
    }
    queryStringObj.q = cityQuery;
  } else if (params.zip !== undefined) {
    queryStringObj.zip = ''.concat(params.zip).concat(',us');
    completeQuery = true;
  }
  if (!completeQuery) {
    callback('Need proper weather query');
  } else {
    request({
      url: 'http://api.openweathermap.org/data/2.5/weather',
      qs: queryStringObj,
      method: 'POST',
    }, (err, response, body) => {
      if (err) {
        console.log('Error calling weather api: ', err);
        callback('Error calling weather api');
      }
      const bodyObj = JSON.parse(body);
      const resObj = {
        lon: bodyObj.coord.lon,
        lat: bodyObj.coord.lat,
        city: bodyObj.name,
        country: bodyObj.sys.country,
        sunset: bodyObj.sys.sunset,
        sunrise: bodyObj.sys.sunrise,
        humidity: bodyObj.main.humidity,
        pressure: bodyObj.main.pressure,
        icon: 'http://openweathermap.org/img/w/'.concat(bodyObj.weather[0].icon).concat('.png'),
        weather: bodyObj.weather[0].main,
        weatherDes: bodyObj.weather[0].description,
        windSpeed: bodyObj.wind.speed,
        windDirection: bodyObj.wind.direction,
        avgTempK: bodyObj.main.temp,
        minTempK: bodyObj.main.temp_min,
        maxTempK: bodyObj.main.temp_max,
        avgTempC: Math.round(convertKToC(Number(bodyObj.main.temp)) * 100) / 100,
        minTempC: Math.round(convertKToC(Number(bodyObj.main.temp_min)) * 100) / 100,
        maxTempC: Math.round(convertKToC(Number(bodyObj.main.temp_max)) * 100) / 100,
        avgTempF: Math.round(convertKToF(Number(bodyObj.main.temp)) * 100) / 100,
        minTempF: Math.round(convertKToF(Number(bodyObj.main.temp_min)) * 100) / 100,
        maxTempF: Math.round(convertKToF(Number(bodyObj.main.temp_max)) * 100) / 100,
      };
      callback(resObj);
    });
  }
};

export default { openWeather };
