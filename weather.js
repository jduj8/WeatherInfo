


let appID = "6c23fc5ac70f6c19440d59bb8b94565d";
let units = "metric"; //da temperature bude u C; za F koristiti imperial



function searchWeatherByCity(cityName){
 
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appID}&units=${units}`;
    fetch(api)
        .then(result => {
            return result.json();         
        })
        .then(result => {
            showResultFromServer(result);
        })
   
}

function showResultFromServer(result){
    //const { temperature, summary, icon, windSpeed } = result.currently;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let city = document.querySelector(".city");
    let humidity = document.querySelector(".humidity");
    let pressure = document.querySelector(".pressure");
    let windSpeed = document.querySelector(".wind-speed")

    let icon = document.getElementById("weatherIcon");

    console.log(result);
    temperatureDegree.textContent = "Temperature: " + Math.round(result.main.temp, 0) + " °C";
    humidity.textContent = "Humidity: " + result.main.humidity + " %";
    pressure.textContent = "Pressure: " + result.main.pressure + " hPa";
    windSpeed.textContent = "Wind speed: " + Math.round((result.wind.speed * 3600 * 0.001),0) + " km/h";

    city.textContent = result.name + ", " + result.sys.country;
    icon.src = 'https://openweathermap.org/img/w/' + result.weather[0].icon + '.png';
    temperatureDescription.textContent = result.weather[0].description;

    showAppropriateImage(result.weather[0].main);
}

function showAppropriateImage(description){
    var url = 'url(images/clear.jpg)'

    switch (description){

        case ("Clouds"):
            url = 'url(images/scatteredClouds.jpg)'
            break;
        case ("Rain"):
            url = 'url(images/rain.jpg)'
            break;
        case ("Mist"):
            url = 'url(images/mist.jpg)'
            break;
        case ("Fog"):
            url = 'url(images/fog.jpg)'
            break;
        case ("Drizzle"):
            url = 'url(images/drizzle.jpg)'
            break;
        case ("Storm"):
            url = 'url(images/storm.jpg)'
            break;
        case ("Thunderstorm"):
            url = 'url(images/thunderstorm.jpg)'
            break;
        case ("Haze"):
            url = 'url(images/haze.jpg)'
            break;
        case ("Dust"):
            url = 'url(images/dust.jpg)'
            break;
        case ("Snow"):
            url = 'url(images/snow.jpg)'
            break;
    }

    document.body.style.backgroundImage = url;
}

var btnShowWeather = document.getElementById('btnShowWeather');
var inCity = document.getElementById('inCityName');

//searchWeatherByCity("Split");

getWeatherOfMyPlace();

btnShowWeather.addEventListener('click', () => {   
    searchWeatherByCity(inCity.value);
});

inCity.addEventListener("keyup", function(event) {
 
  if (event.keyCode === 13) {   
    btnShowWeather.click();
  }
});

function getWeatherOfMyPlace(){

    
    
   
}

window.addEventListener("load", () => {
     if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appID}`
            fetch(api)
            .then(result => {
                return result.json();         
            })
            .then(result => {
                showResultFromServer(result);
            })
            
        })
    }
})