let currentday = document.getElementById('today')
let secondday = document.getElementById('tomorrow')
let thirdday = document.getElementById('aftertomorrow')
let locationcity = document.getElementById('location')
let days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
let months = ['january','february','march','april','may','june','july','August','september','october','november','december']
let city = 'cairo'
async function getdata(city){
    let result = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=aabeec622c664642b40100137242206&q=${city}&days=3`)
    if ( result.status !=result.ok && 400) {
        let ro = await result.json()
        weather(ro)
    }
}
document.getElementById("location").addEventListener("keyup", a=>{
    getdata(a.target.value)
})
function weather(ro){
    if(ro.current!=null){
        let location = ro.location
        let city = location.name
        let today = ro.current
        let todaytemp = today.temp_c
        let todaycondition = today.condition
        // let todaypercip = today.percip_mm
        let todaywindspeed = today.wind_kph
        let todaywinddirection = today.wind_dir
        let todaydate = new Date(today.last_updated.replace(" ", "T"));
        let tomorrow = ro.forecast.forecastday[1]
        let aftertomorrow = ro.forecast.forecastday[2]
        let tomorrowdate = new Date(tomorrow.date_epoch * 1000)
        let aftertomorrowdate = new Date(aftertomorrow.date_epoch * 1000)
        currentday.innerHTML = `
    <header class="p-2 d-flex justify-content-between align-items-center">
                            <div class="day">${days[todaydate.getDay()]}</div>
                            <div class="date">${todaydate.getDate() + months[todaydate.getMonth()]}</div>
                        </header>
                        <div class="content py-4 px-4">
                            <div class="location py-3">${city}</div>
                            <div class="num">
                                ${todaytemp} 
                                <sup>o</sup> 
                                C
                            </div>
                            <div class="icon">
                                <img src="http:${todaycondition.icon}" width="90px" alt="">
                            </div>
                            <div class="custom text-info mb-4">${todaycondition.text}</div>
                            <span class="me-3"><img src="images/umbrella.png" class="me-2" width="20px" alt="">20%</span>
                            <span class="me-3"><img src="images/wind.png" class="me-2" width="20px" alt="">${todaywindspeed}</span>
                            <span class="me-3"><img src="images/compass.png" class="me-2" width="20px" alt="">${todaywinddirection}</span>
                        </div>
    `
    secondday.innerHTML = `
    <header class="p-2 text-center">
                            <div class="day">${days[tomorrowdate.getDay()]}</div>
                        </header>
                        <div class="content text-center pt-5 px-2">
                            <div class="icon mb-3">
                                <img src="https:${tomorrow.day.condition.icon}" width="48px" alt="">
                            </div>
                            <div class="degree">${tomorrow.day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${tomorrow.day.mintemp_c}<sup>o</sup></small>
                            <div class="custom text-info my-4">${tomorrow.day.condition.text}</div>
                        </div>
    `
    thirdday.innerHTML = `
    <header class="p-2">
                            <div class="day">${days[aftertomorrowdate.getDay()]}</div>
                        </header>
                        <div class="content pt-5 px-2">
                            <div class="icon mb-3">
                                <img src="https:${aftertomorrow.day.condition.icon}" width="48px" alt="">
                            </div>
                            <div class="degree">${aftertomorrow.day.maxtemp_c}<sup>o</sup>C</div>
                            <small>${aftertomorrow.day.mintemp_c}<sup>o</sup></small>
                        </div>
                        <div class="custom text-info my-4">${aftertomorrow.day.condition.text}</div>
    `
    }
}
getdata(city);