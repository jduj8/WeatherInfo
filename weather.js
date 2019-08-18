


let appID = "6c23fc5ac70f6c19440d59bb8b94565d";
let units = "metric"; //da temperature bude u C; za F koristiti imperial

let errorMessage = document.getElementById('error-message')
var btnShowWeather = document.getElementById('btnShowWeather');
var inCity = document.getElementById('inCityName');

let apiRequest = new XMLHttpRequest();



function searchWeatherByCity(cityName){
    apiRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${appID}&units=${units}`);
    apiRequest.send();  
}

apiRequest.onreadystatechange = () => {
    if (apiRequest.readyState === 4){
        
        if (apiRequest.status === 404){
            return errorMessage.textContent = 'City not found.'
        }
        
        errorMessage.textContent = "";
        const response = JSON.parse(apiRequest.response);
        showResultFromServer(response);
        
    }
}

function showResultFromServer(result){
    //const { temperature, summary, icon, windSpeed } = result.currently;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let city = document.querySelector(".city");
    let humidity = document.getElementById("humidity");
    let pressure = document.getElementById("pressure");
    let windSpeed = document.getElementById("wind-speed")

    let icon = document.getElementById("weatherIcon");

    humidity.textContent = " " + result.main.humidity + " %";
    pressure.textContent = "  " + result.main.pressure + " hPa";
    windSpeed.textContent = "  " + Math.round((result.wind.speed * 3600 * 0.001),0) + " km/h";

    city.textContent = result.name + ", " + result.sys.country;
    icon.src = 'https://openweathermap.org/img/w/' + result.weather[0].icon + '.png';
    temperatureDescription.textContent = result.weather[0].description;
    temperatureDegree.textContent = Math.round(result.main.temp, 0) + " °C"

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
            url = 'url(images/thunderstorm.png)'
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
        case ("Smoke"):
            url = 'url(images/smoke.jpg)'
            break;

    }

    document.body.style.backgroundImage = url;
}



//searchWeatherByCity("Split");


btnShowWeather.addEventListener('click', () => {   
    searchWeatherByCity(inCity.value);
});

inCity.addEventListener("keyup", ($event) => {
 
    $event.preventDefault();
    if (event.keyCode === 13) {   
        btnShowWeather.click();
    }
});

inCity.addEventListener('oninput', () => {
    errorMessage.textContent = "";
})

function removeErrorMessage(){
    errorMessage.textContent = "";
}

window.addEventListener("load", () => {
     if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appID}&units=${units}`
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