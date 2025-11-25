console.log('Weather App');

const displayTitle = document.querySelector('.display-title');
const weatherIcon = document.getElementById('weather-icon');
const mainTemperature = document.getElementById('main-temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const windGust = document.getElementById('wind-gust');
const weatherMain = document.getElementById('weather-main');
const locationEl = document.getElementById('location');

const getWeatherBtn = document.getElementById('get-weather-btn');
const selectLocation = document.getElementById('select-location');

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

async function showWeather(city) {
  try {
    const data = await getWeather(city);

    if (!data) return;

    weatherIcon.src = data.weather[0].icon;
    weatherMain.textContent = `${data.weather[0].main}`;

    mainTemperature.textContent = `${data.main.temp} °C`;
    locationEl.textContent = `${data.name}`;
    feelsLike.innerHTML = `Feels like: <span class='value-right'>${data.main.feels_like} °C</span>`;
    humidity.innerHTML = `Humidity: <span class='value-right'>${data.main.humidity} %</span>`;
    wind.innerHTML = `Wind: <span class='value-right'>${data.wind.speed} m/s, ${data.wind.deg} deg</span>`;
    windGust.innerHTML = `Gust: <span class='value-right'>${data.wind.gust || 'N/A'} m/s</span>`;
  } catch {
    alert('Something went wrong, please try again later');
  }
}

getWeatherBtn.addEventListener('click', () => {
  console.log('BUtton clicked');
  if (selectLocation.value) {
    displayTitle.hidden = true;
    showWeather(selectLocation.value);
  }
});
