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
  h1.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  weatherTemperatureElement.innerHTML = `${Math.round(
    response.data.temperature.current,
  )}°C`;
  weatherForecastElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${Math.round(response.data.temperature.humidity)}%`;
  windSpeedElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchForm);

apiElement("Vitoria Brasil");
