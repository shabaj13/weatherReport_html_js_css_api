const search = document.getElementById("search");
const myLocation = document.querySelector("#myLocation");
const temperature = document.querySelector(".temp");
const tempText = document.querySelector(".tempText");
const errorMsg = document.querySelector(".error");
const date = document.querySelector(".date");
const loc = document.querySelector(".location");
const humi = document.querySelector(".humidity");
const feelslike = document.querySelector(".feelslike");
const showContent = document.querySelector(".contentDiv");
const container = document.querySelector(".container");
const searchBtn = document.querySelector(".searchBtn");
const image = document.querySelector(".image");

let Apikey = `286989ffee38565d859afd4c5a148056`;
let month, year, day;
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

search.addEventListener("keyup", (e) => {
  // function for other city that i search and want to see the weather report
  if (e.key == "Enter" && search.value != "") {
    showContent.classList.add("show");
    container.classList.add("containerSize");
    requestApi(search.value);
    search.value = "";
    search.classList.add("hidden");
    myLocation.classList.add("hidden");
  }
});

myLocation.addEventListener("click", () => {
  //function for my current location weather report
  showContent.classList.add("show");
  container.classList.add("containerSize");
  search.classList.add("hidden");
  myLocation.classList.add("hidden");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    alert("Your browser dose not support geolocation api ");
  }
});

searchBtn.addEventListener("click", () => {
  search.classList.remove("hidden");
  myLocation.classList.remove("hidden");
  showContent.classList.remove("show");
  container.classList.remove("containerSize");
  location.reload();
});

async function onSuccess(position) {
  // api call to get my current location
  const { latitude, longitude } = position.coords;
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${Apikey}`
  );
  let data = await res.json();
  weatherDetails(data);
}
function onError(error) {
  errorMsg.innerHTML = error.message;
  errorMsg.classList.remove("hidden");
  setTimeout(() => {
    errorMsg.classList.add("hidden");
  }, 2000);
}

async function requestApi(city) {
  // api call for getting other city details
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Apikey}`
  );
  let data = await res.json();
  weatherDetails(data);
}

const dateObj = new Date();
month = months[dateObj.getMonth()];
day = dateObj.getDate();
year = dateObj.getFullYear();

function weatherDetails(info) {
  if (info.cod == "404") {
    errorMsg.innerHTML = info.message;
    errorMsg.classList.remove("hidden");
    setTimeout(() => {
      errorMsg.classList.add("hidden");
    }, 2000);
  } else {
    setInterval(() => {
      const city = info.name;
      const country = info.sys.country;
      const { description, id } = info.weather[0];
      const { feels_like, humidity, temp } = info.main;

      feelslike.innerHTML = "feels like:" + " " + Math.floor(feels_like);
      humi.innerHTML = `humidity: ${humidity}`;
      temperature.innerHTML = Math.floor(temp) + "&#176C";
      loc.innerHTML = `${city},${country}`;
      tempText.innerHTML = description;
      date.innerHTML = `${month},${day} ${year}`;
      
      // if (id >= 801 && id == 804) {
      //   image.scr="img/cloud.PNG" 
      // } else if () {
        
      // }else if () {
        
      // }else if () {
        
      // }else if () {
        
      // }else if () {
        
      // }else() {
        
      // }

    }, 100);
  }
}
