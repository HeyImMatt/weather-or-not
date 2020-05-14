const loaderIcon = document.getElementById('loading-icon');

function sendHttpRequest(url) {
  return fetch(url, {
    mode: 'cors',
  }).then(
    (response) => {
      return response.json();
    },
    (reject) => {
      alert(`Rejected: ${reject}`);
    },
  );
}

async function getWeather(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  try {
    const responseData = await sendHttpRequest(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=c4fcb7ef3c8a27ca78861967c9aeebcd`,
    );
    let userWeather = {
      city: responseData.name.toUpperCase(),
      description: responseData.weather[0].description.toUpperCase(),
      currentTempF: Math.floor(responseData.main.temp),
      feelsLikeF: Math.floor(responseData.main.feels_like),
      windSpeed: responseData.wind.speed.toFixed(1),
      iconUrl: `http://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png`,
    };
    loaderIcon.classList = 'hide';
    displayWeather(userWeather);
  } catch (error) {
    alert(`getWeather error: ${error.message}`);
  }
}

function errorHandler(err) {
  alert('Error getting location');
}

function displayWeather(userWeather) {
  const citySpan = document.getElementById('city');
  const weatherIconSpan = document.getElementById('weather-icon')
  const descriptionSpan = document.getElementById('description');
  const currentTempSpan = document.getElementById('current-temp');
  const feelsLikeSpan = document.getElementById('feels-like');
  const windSpeedSpan = document.getElementById('wind-speed');

  citySpan.innerHTML = `<h3>${userWeather.city}</h3>`;
  weatherIconSpan.innerHTML = `<img src="${userWeather.iconUrl}"></img>`
  descriptionSpan.innerHTML = `<h4>${userWeather.description}</h4>`;
  currentTempSpan.innerHTML = `<h4>${userWeather.currentTempF}&deg;F</h4>`;
  feelsLikeSpan.innerHTML = `<h5>Feels like ${userWeather.feelsLikeF}&deg;F</h5>`;
  windSpeedSpan.innerHTML = `<h5>Wind ${userWeather.windSpeed} MPH</h5>`;
}

document
  .getElementById('get-browser-location')
  .addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(getWeather, errorHandler);
  });

  navigator.geolocation.getCurrentPosition(getWeather, errorHandler);

  // Static Data for CSS Testing

  // function fakeData() {
  //   let userWeather = {
  //     city: 'PORTLAND',
  //     description: 'OVERCAST CLOUDS',
  //     currentTempF: 58,
  //     feelsLikeF: 52,
  //     windSpeed: 6.9,
  //     iconUrl: `http://openweathermap.org/img/wn/10d@2x.png`,
  //   };
  //   displayWeather(userWeather)
  // }

  // fakeData();
