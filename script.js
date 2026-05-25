function changeDataHtml(response) {
  let h1 = document.querySelector("h1");
  let weatherTemperatureElement = document.querySelector(
    "#weather-temperature-response",
  );
  let weatherForecastElement = document.querySelector(
    "#weather-forecast-response",
  );
  let humidityElement = document.querySelector("#weather-humidity-response");
  let windSpeedElement = document.querySelector("#weather-wind-response");
  let timeElement = document.querySelector("h2");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#weather-icon-response");

  icon.innerHTML = `<img src = "${response.data.condition.icon_url}" class="weather-icon" />`;
  h1.innerHTML = `${response.data.city}, ${response.data.country}`;

  weatherTemperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current,
  )}°C`;
  weatherForecastElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  getForecast(response.data.city);
  startClock();
}

let clockInterval = null;

function startClock() {
  let timeElement = document.querySelector("h2");

  if (clockInterval) {
    clearInterval(clockInterval);
  }

  clockInterval = setInterval(function () {
    timeElement.innerHTML = moment().format("dddd, MMMM D, YYYY [|] H:mm");
  }, 1000);
}

function apiElement(city) {
  let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeDataHtml);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
      let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

      axios.get(apiUrl).then(changeDataHtml);
    },
    function () {
      apiElement("brasilia");
    },
  );
}

function searchForm(event) {
  event.preventDefault();

  let city = document.querySelector("#search-form-input");

  apiElement(city.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
  let apiUrlForecast = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrlForecast).then(displayForecast);
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast.innerHTML += `<div class="forecast-day">
                <div class="forecast-weekday">${formatDay(day.time)}</div>
                <div "> <img src="${day.condition.icon_url}"class="forecast-icon />
                </div>
                <div class="forecast-min-temperature">${Math.round(day.temperature.maximum)}°</div>
                <div class="forecast-max-temperature">${Math.round(day.temperature.minimum)}°</div>
            </div>`;
    }
  });
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);

getLocation();
