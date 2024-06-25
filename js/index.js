const searchLocationInput = document.getElementById('searchLocation')
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
        const lat = pos.coords.latitude
        const long = pos.coords.longitude
        console.log(lat);
        console.log(long);
        getWeatherData(`${lat},${long}`)
    })
} else {
    alert('no')
}


async function getWeatherData(query) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${query}&days=1&key=8d73ba5ab5c34aac92b04857242506`)
    let data = await res.json()
    console.log(data)
    displayTodayWeather(data)
    displayTomm(data)

}

searchLocationInput.addEventListener('input', function (e) {
    getWeatherData(e.target.value)
})
function displayTodayWeather(data) {
    console.log(data, 'from displayTodayWeather')
    console.log(data.current.last_updated, 'date')
    const todayDate=data.current.last_updated
    let date = new Date(todayDate);
    const todayWeekDay = date.toLocaleString('en-us', { weekday: 'long' })
    const todayDay = date.getDate()
    const todayMonth = date.toLocaleString('en-us', { month: 'long' })
    const cityName=data.location.name;
    const degree=data.current.temp_c;
    const todayCondition=data.current.condition.text
    const humidity = data.current.humidity
    console.log(humidity)
    cityToday.innerHTML=cityName
    weekDay.innerHTML=todayWeekDay;
    dateToday.innerHTML=`${todayDay}${todayMonth}`
    degreeToday.innerHTML=degree
    todayCond.innerHTML=todayCondition
    imgToday.setAttribute('src',data.current.condition.icon);
    humToday.innerHTML=humidity
    windSpeedToday.innerHTML=data.current.wind_kph
    dirToday.innerHTML=data.current.wind_dir
}
function displayTomm({forecast}){
console.log(forecast)
tommDay.innerHTML=new Date(forecast.forecastday[1].date).toLocaleString('en-us',{weekday:'long'});
iconTomm.setAttribute('src',forecast.forecastday[1].day.condition.icon)

}