window.addEventListener("load", () => {
    let longitude;
    let latitude;
    let language;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let speedOfWind = document.querySelector(".wind-speed");


    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/dce24ae295c01689a8102825907b953a/${latitude},${longitude}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })

                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon, windSpeed } = data.currently;

                    let celsius = Math.round((temperature - 32) * 5/9, 0);
                    temperatureDegree.textContent = "Temperature: " + celsius + " C°";
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    speedOfWind.textContent = "Speed of wind: " +  Math.round(windSpeed, 0) + " km/h";

                    setIcons(icon, document.querySelector(".icon"));

                    

                    
                });
            
        });
    }

    function setIcons(icon, iconID){
        let color = "";
        switch (icon){
            case "clear-night":
                color = "silver";
                break;
            case "clear-day":
                color = "yellow";
                break;
            case "partly-cloudy-day":
                color = "#FFFF66";
                break;
            case "partly-cloudy-night":
                color = "dimgray";
                break;
            case "cloudy":
                color = "silver";
                break;
            case "fog":
                color = "white";
                break;
            case "cloudy":
                color = "gray";
                break;
            case "sleet":
                color = "aquamarine";
                break;
            case "rain":
                color = "blue";
                break;
            case "wind":
                color = "white";
                break;
            default:
                color = "white";
            
        }
        const skycons = new Skycons({color: color});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

