let now = new Date();

function fromatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
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

  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let today = `${day}, ${month} ${date} </br> ${hour}:${minute}`;

  return today;
}

console.log(fromatDate(new Date()));
let currDate = document.querySelector("#current-date");
currDate.innerHTML = fromatDate(new Date());
//Current date ^^^

function tempLink(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#the-temp");
  tempNumber.innerHTML = 20 + "°";
}

function tempLinkCel(event) {
  event.preventDefault();
  let tempcel = document.querySelector("#the-temp");
  tempcel.innerHTML = 30 + "°";
}

let celegree = document.querySelector("#celc");
celegree.addEventListener("click", tempLinkCel);

let degree = document.querySelector("#fhight");
degree.addEventListener("click", tempLink);
// Ferenheight and Celcius links ^^^^^
/*
function testPosition(position) {
  console.log(position);
  console.log(position.coords.longitude);
  console.log(position.coords.latitude);
}
navigator.geolocation.getCurrentPosition(testPosition);
// Testing coords^^^
*/
function showWeather(response) {
  document.querySelector("#main-city").innerHTML = response.data.name;
  document.querySelector("#the-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();
dateElement.innerHTML = fromatDate(currentTime);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

//bonus part

/* 
function curPosition(position) {
  event.preventDefault();
  let currentBtn = document.querySelector("#current-btn");
  currentBtn.innerHTML = position.coords.latitude;
}

navigator.geolocation.getCurrentPosition(curPosition);
*/
