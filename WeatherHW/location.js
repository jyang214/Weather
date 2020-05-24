/**Jackie Yang CS375 Section:003 
 * Adds EvenListener for button onclick once page is load. Onclick will display current location coordinate
 * Then using XML to fetch JSON from our /getweather with our current location
 * to populate our index.html with our forcast information.
*/
function message(strr=''){
    /** Prints the message on the screen */
    let mess = document.getElementById("message");
    mess.innerHTML = strr;
    /** If message is empty hide it */
    if (mess.innerHTML === ""){
        mess.style.visibility = "hidden"
        mess.style.display = "none";
    }
    else{
    /** If not empty make it visible then hide it after 5 second */
        mess.style.visibility = "visible";
        mess.style.display = "block";
        setTimeout(function(){
            mess.style.visibility = "hidden"; 
            mess.style.display = "none"}, 5000);
    };
};

/** Converts ISO date to month-day-year */
function dateconvert(isodate){
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let date = new Date(isodate);
    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let dt = date.getDate();
    return (month + " " + dt + ", " + year);
};

/** Converts ISO date to day of the week */
function dayOfTheWeek(isodate){
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let date = new Date(isodate);
    let Wkday = dayNames[date.getDay()];
    return (Wkday);
};

/** Populates the 7 div with the data from the parsed JSON(periods) */
function forecast(periods){
    for (let i=0; i < 7; i++){
        let id =`day${i}`;
        let day = document.getElementById(id);
        /** Resets the innerHTML then populate the data in the format
         *  day of the week, icon, date, description, feels, high/low, preciptation and humidity
         */
        day.innerHTML = ``;
        if (i===0){
            day.innerHTML += `<div class="day"><strong> TODAY </strong></div>`;
        }
        else{
            day.innerHTML += `<div class="day"><strong> ${dayOfTheWeek(periods[i].validTime)} </strong></div>`;
        };
        day.innerHTML += `<div class="icon"><img src=./AerisIcons/${periods[i].icon} alt=${String(periods[i].icon)}></div>`;
        day.innerHTML += `<div class="date"><strong> Date: </strong> ${dateconvert(periods[i].validTime)}</div>`;
        day.innerHTML += `<div class="description"><strong> Description: </strong> ${periods[i].weatherPrimary}</div>`;
        day.innerHTML += `<div class="feels"><strong> Feels like: </Strong> ${periods[i].feelslikeF}\u00B0F</div>`;
        day.innerHTML += `<div class="HL"><strong> High/Low: </strong> ${periods[i].maxTempF}\u00B0F/${periods[i].minTempF}\u00B0F</div>`;
        day.innerHTML += `<div class="precip"><strong> Precipitation: </strong> ${periods[i].pop}%</div>`;
        day.innerHTML += `<div class="humidity"><strong> Humidity: </strong> ${periods[i].humidity}%</div>`;
    };
};

function showPosition(pos){
    /** Prints current latitude and longitude */
    var cord = pos.coords;
    message("Fetching forecast for lat " + cord.latitude.toFixed(2) + ", lon "+ cord.longitude.toFixed(2));
    /** Calls the endpoint and give it lat and lon variables */
    var link = `http://localhost:8080/getweather?lat=${cord.latitude.toFixed(2)}&lon=${cord.longitude.toFixed(2)}`
    /** Request to the link for JSON file then parse the JSON and populate the website with weather data */
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(){
        let periods = this.response.periods;
        forecast(periods);
    });
    xhr.responseType = "json";        
    xhr.open("GET", link);
    xhr.send();
};

function error(err){
    console.log("Error: " + err);
};

function locate(){
    /** Shows location if found else print error */
    navigator.geolocation.getCurrentPosition(showPosition,error);
};

/** Waits for all the content to be load */
window.onload = function() {
    document.getElementById("location").addEventListener("click", locate);    
};