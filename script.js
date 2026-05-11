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

  h1.innerHTML = response.data.city;
  weatherTemperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current,
  )}`;
  weatherForecastElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);
