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
  timeElement.innerHTML = formatDate(date);
  weatherTemperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current,
  )}°C`;
  weatherForecastElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let todayDate = date.getDate();
  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let year = date.getFullYear();

  return `${day}, ${month} ${todayDate}, ${year} | ${hour}:${minutes}`;
}
function apiElement(city) {
  let apiKey = `0d9d6fa642662e53t328bfec1ado0b77`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(changeDataHtml);
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

apiElement("brasilia");
