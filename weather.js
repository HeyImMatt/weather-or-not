const locationButton = document.querySelector('button');
const loaderIcon = document.getElementById('loading-icon');
const citySpan = document.getElementById('city');
const weatherIconSpan = document.getElementById('weather-icon');
const descriptionSpan = document.getElementById('description');
const currentTempSpan = document.getElementById('current-temp');
const feelsLikeSpan = document.getElementById('feels-like');
const windSpeedSpan = document.getElementById('wind-speed');

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
      windSpeed: Math.floor(responseData.wind.speed),
      id: responseData.weather[0].id,
    };
    loaderIcon.classList = 'hide';
    locationButton.className = 'show'
    locationButton.textContent = 'Start Over'
    displayWeather(userWeather);
  } catch (error) {
    alert(`getWeather error: ${error.message}`);
    location.reload();
  }
}

function errorHandler() {
  alert('Error getting location');
  location.reload();
}

function displayWeather(userWeather) {
  let weatherIcon;
  if (userWeather.id >= 200 && userWeather.id < 299) {
    weatherIcon = '&#9928;';
  } else if (userWeather.id >= 300 && userWeather.id < 599) {
    weatherIcon = '&#127783;';
  } else if (userWeather.id >= 600 && userWeather.id < 699) {
    weatherIcon = '&#127784;';
  } else if (userWeather.id >= 700 && userWeather.id < 799) {
    weatherIcon = '&#127787;';
  } else if (userWeather.id === 800) {
    weatherIcon = '&#127774;';
  } else if (userWeather.id === 801) {
    weatherIcon = '&#127780;';
  } else if (userWeather.id === 802) {
    weatherIcon = '&#127781;';
  } else {
    weatherIcon = '&#9729;';
  }

  citySpan.innerHTML = `<h3>${userWeather.city}</h3>`;
  weatherIconSpan.innerHTML = weatherIcon;
  descriptionSpan.innerHTML = `<h4>${userWeather.description}</h4>`;
  currentTempSpan.innerHTML = `<h4>${userWeather.currentTempF}&deg;F</h4>`;
  feelsLikeSpan.innerHTML = `<h5>Feels like ${userWeather.feelsLikeF}&deg;F</h5>`;
  windSpeedSpan.innerHTML = `<h5>Winds at ${userWeather.windSpeed} MPH</h5>`;
  locationButton.textContent = 'Start Over'
}

locationButton.addEventListener('click', () => {
  if (locationButton.textContent === 'Use My Location') {
  loaderIcon.classList = 'show';
  locationButton.className = 'hide'
  navigator.geolocation.getCurrentPosition(getWeather, errorHandler);
  } else location.reload();
});
