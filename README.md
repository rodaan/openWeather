#openweather

Simple Weather Retrieval Module for http://openweathermap.org/

### Version
0.2.1

### Installation
```sh
$ npm i --save openweather
```

### Usage
Obtain api "key" from http://openweathermap.org/ after registration. It is called "APPID". You may load it as an environment variable or include it as an optional parameter. 
```js
var openWeather = require('openweather');

// Returns data from open weather using desired 
// coordinates from a coordinate object:

openWeather.getWeather(coords, function(result){
  console.log(result);
}, [key]);

// Example coordinate object:
{"coords": {"latitude": 37, "longitude": -122 }}


// Example data from result includes temperature 
// in Kelvins, Fahrenheit, and Celsius:
{
  "lon": 123.45,
  "lat": 67.89,
  "city": "Your City",
  "country": "Your Country,
  "sunset": 1467084939,
  "sunrise": 1467031822,
  "weather": "Clouds",
  "weatherDes": "few clouds",
  "avgTempK": 301.84,
  "minTempK": 292.15,
  "maxTempK": 310.93,
  "avgTempC": 28.69,
  "minTempC": 19,
  "maxTempC": 37.78,
  "avgTempF": 83.64,
  "minTempF": 66.2,
  "maxTempF": 100
}

};

```    

License
----
MIT