let searchBox = document.querySelector(".search-box");

searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    callWeatherApi(searchBox.value);
  }
}

function callWeatherApi(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=7e3f21edee540e6110af347b55eb1ab2`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((weatherData) => {
      console.log(weatherData);
      showResults(weatherData);
    });
}

function showResults(weatherData) {
  let city = document.querySelector(".city");
  let temperature = document.querySelector(".temperature");
  let weather = document.querySelector(".weather");
  let date = document.querySelector(".date");
  let highLow = document.querySelector(".high-low");

  city.innerText = `${weatherData.name}, ${weatherData.sys.country}`;
  temperature.innerText = `${Math.round(weatherData.main.temp)}°C`;
  highLow.innerText = `${Math.round(
    weatherData.main.temp_min
  )}°C / ${Math.round(weatherData.main.temp_max)}°C`;
  weather.innerText = `${weatherData.weather[0].main}`;
  date.innerText = formDate();
}

function formDate() {
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDate = new Date();
  return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
}
