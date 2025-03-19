const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API Key
const weatherDataDiv = document.getElementById('weatherData');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

// Fetch weather data from OpenWeatherMap API
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        displayWeatherData(data);
    } catch (error) {
        alert("Error fetching weather data. Please try again.");
    }
}

// Display weather data on the page
function displayWeatherData(data) {
    cityName.textContent = data.name + ', ' + data.sys.country;
    temperature.textContent = 'Temperature: ' + data.main.temp + '°C';
    description.textContent = 'Description: ' + data.weather[0].description;
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
    windSpeed.textContent = 'Wind Speed: ' + data.wind.speed + ' m/s';

    weatherDataDiv.style.display = 'block';
}

// Event listener for button click
getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
