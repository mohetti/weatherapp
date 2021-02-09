'use strict';
let descr = document.querySelector('#description');
let cityName = document.querySelector('#city');
let temp = document.querySelector('#temp');
let info = document.querySelector('#info');
let clouds = document.querySelector('#imgClouds');
let wind = document.querySelector('#imgWind');
let visWind = document.querySelector('#wind');
let errorMsg = document.querySelector('.error');
let loader = document.querySelector('#loading');

let populate = function populate(response) {
  descr.innerText = response.descr;
  cityName.innerText = response.name;
  temp.innerText = Number(response.temp).toFixed(0) + '°C';
  info.innerText =
    'Temperature: ' +
    response.feel +
    '°C' +
    '\n' +
    'Humidity: ' +
    response.humidity +
    '%' +
    '\n' +
    'Clouds: ' +
    response.clouds +
    '%' +
    '\n' +
    'Windspeed: ' +
    response.windSpeed +
    'm/s';
  clouds.src = 'http://openweathermap.org/img/wn/' + response.icon + '@2x.png';
  visWind.style.visibility = 'visible';
  wind.src = '/img/arrow.png';
  wind.style.transform = 'rotate(' + response.windDeg + 'deg)';
  loader.style.display = 'none';
  return (search.value = '');
};

let createObj = function createObj(jsonFile) {
  let response = {
    name: jsonFile.name,
    temp: jsonFile.main.temp,
    feel: jsonFile.main['feels_like'],
    descr: jsonFile.weather[0].description,
    icon: jsonFile.weather[0].icon,
    humidity: jsonFile.main.humidity,
    clouds: jsonFile.clouds.all,
    windSpeed: jsonFile.wind.speed,
    windDeg: jsonFile.wind.deg,
  };

  return response;
};

let fetchData = async function fetchData(city) {
  loader.style.display = 'block';
  try {
    let data = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city.value +
        '&units=metric&appid=3a2c6ff5cfa697601d32241e8641672d',
      {
        mode: 'cors',
      }
    );
    let jsonFile = await data.json();
    populate(createObj(jsonFile));
  } catch (error) {
    errorMsg.style.display = 'block';
    loader.style.display = 'none';
  }
};

let search = document.querySelector('#searchbar');
let searchCity = function searchCity(event) {
  if (event.key === 'Enter') {
    let city = event.target;
    errorMsg.style.display = 'none';
    fetchData(city);
  } else {
    return;
  }
};
search.addEventListener('keydown', searchCity);

// ****************************************A
/*fetch(
    'http://api.openweathermap.org/data/2.5/weather?q=' +
      city.value +
      '&units=metric&appid=3a2c6ff5cfa697601d32241e8641672d',
    {
      mode: 'cors',
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      let container = {
        name: response.name,
        temp: response.main.temp,
        feel: response.main['feels_like'],
        descr: response.weather[0].description,
        icon: response.weather[0].icon,
        humidity: response.main.humidity,
        clouds: response.clouds.all,
        windSpeed: response.wind.speed,
        windDeg: response.wind.deg,
      };
      return container;
    })
    .then(function (response) {
      descr.innerText = response.descr;
      cityName.innerText = response.name;
      temp.innerText = Number(response.temp).toFixed(0) + '°C';
      info.innerText =
        'Temperature: ' +
        response.feel +
        '°C' +
        '\n' +
        'Humidity: ' +
        response.humidity +
        '%' +
        '\n' +
        'Clouds: ' +
        response.clouds +
        '%' +
        '\n' +
        'Windspeed: ' +
        response.windSpeed +
        'm/s';
      clouds.src =
        'http://openweathermap.org/img/wn/' + response.icon + '@2x.png';
      visWind.style.visibility = 'visible';
      wind.src = '/img/arrow.png';
      wind.style.transform = 'rotate(' + response.windDeg + 'deg)';
      return (search.value = '');
    })
    .catch((error) => {
      console.log(error);
      errorMsg.style.display = 'block';
    });*/
