function handleFormSubmit(e) {
    if ($('input[name="search-field"]').val() === ""){
        alert("PLEASE PROVIDE A CITY NAME")
    }else{
    e.preventDefault()
    var APIKey = "f5e2a1b2fcd57e17e3a70afea6105655";
    var city = $('input[name="search-field"]').val()
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${APIKey}`

    localStorage.setItem(city, city)


        
        fetch(queryURL)
        .then(response => response.json())
        .then(function  (results) {
            var currentCity = document.getElementById('city-name')
            currentCity.innerHTML = results.name
            var temp = document.getElementById('temp')
            temp.innerText = `Temp: ${results.main.temp} °F`
            var wind = document.getElementById('wind')
            wind.innerText = `Wind: ${results.wind.speed} MPH`
            var hum = document.getElementById('hum')
            hum.innerText = `Humidity: ${results.main.humidity} %`
        })

        fetch(queryURL2)
        .then(response => response.json())
        .then(function (data) {
            for (let i = 0; i < data.list.length; i++) {
                var time = data.list[i].dt_txt;
                var forecastedTemp = data.list[i].main.temp;
                var forecastedHumidity = data.list[i].main.humidity;
                var forecastedWindSpeed = data.list[i].wind.speed;
                var forecastedWeatherIcon = data.list[i].weather[0].icon;
                var WeatherDate = data.list[i].dt_txt;
                if(time.endsWith('15:00:00')){
                    var forecastEl = document.getElementById('forecast')
                    var forecastImgEl = document.createElement('img')
                    forecastImgEl.setAttribute(`src`, `https://openweathermap.org/img/wn/${forecastedWeatherIcon}.png`)
                    var forecastCard = document.createElement('div')
                    var dates = document.createElement('p')
                    var temps = document.createElement('p')
                    var humidity = document.createElement('p')
                    var windSpeed = document.createElement('p')
                    forecastCard.classList.add('border', 'border-dark', 'bg-dark', 'text-white', 'p-4', 'm-1')
                    dates.innerText = moment(WeatherDate).format("MMM Do YY")
                    temps.innerText = `Temp: ${forecastedTemp} °F`
                    windSpeed.innerText = `Wind: ${forecastedWindSpeed} MPH`
                    humidity.innerText = `Humidity: ${forecastedHumidity} %`
                    forecastCard.append(forecastImgEl)
                    forecastCard.append(dates, temps, humidity, windSpeed)
                    forecastEl.append(forecastCard)
                }
            }
        })
}}

for (let i = 0; i < localStorage.length; i++) {
    var searchHistory = $('#search-history')
    var previousCities = localStorage.getItem(localStorage.key(i))
    var btn = `<button class="btn btn-secondary w-100 mt-2 mb-2" disabled>${previousCities}</button>`
    searchHistory.append(btn)
  }
      

addEventListener('submit', handleFormSubmit)



