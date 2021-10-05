console.log("hi");
var apiKey = "48ed4ee62e14e9b97e9784fb37a1c7db";
// var time = document.getElementsByClassName("time");
// time.innerHTML = moment().format("MMMM Do YYYY, h:mm:ss a");
var searchHistory = [];
function getAPI(lon, lat) {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,alerts&appid=" +
    apiKey +
    "&units=imperial";
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      $(".uvIndex").text("UV Index: " + data.current.uvi);
    });
  // .then(function(displayCards){

  // })
}

$(".btn").on("click", function (event) {
  event.preventDefault();
  if ($(".history").val() === $(".locationInput").val()) {
    alert("You can choose the city bellow");
    return;
  } else if ($(".locationInput").val() === "") {
    alert("You Must Enter a City Name");
    return;
  } else {
    localStorage.setItem("history", JSON.stringify($(".locationInput").val()));
    generateAPI();
  }
});

function generateAPI() {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    $(".locationInput").val() +
    "&appid=" +
    apiKey +
    "&units=imperial";
  fetch(apiURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      getAPI(data.coord.lon, data.coord.lat);
      // for (let x = 0; x < 5; x++) {
      //     var iconIDnumber = data.daily[x].weather[0].icon;
      // }
      iconIDnumber = data.weather[0].icon;
      $("cityIcon").append(
        "<img src='http://openweathermap.org/img/wn/" +
          iconIDnumber +
          "@2x.png>"
      );

      $(".cityName").text(data.name);
      $(".cityTemp").text("Temp: " + data.main.temp + " °F");
      $(".cityHumidity").text("Humidity: " + data.main.humidity + "%");
      $(".cityWind").text("Wind Speed: " + data.weather.wind_speed + "MPH");

    //   $(".cityName1").text(date1);
      $(".cityTemp1").text("Max Temp: " + data["daily"][1].temp.max + " °F");
      $(".cityHumidity1").text("Humidity: " + data["daily"][1].humidity + "%");
      $(".cityWind1").text(
        "Wind Speed: " + data["daily"][1].wind.speed + "MPH"
      );

      // $(".cityName2").text(date2);
      $(".cityTemp2").text("Max Temp: " + data["daily"][2].temp.max + " °F");
      $(".cityHumidity2").text("Humidity: " + data["daily"][2].humidity + "%");
      $(".cityWind2").text(
        "Wind Speed: " + data["daily"][2].wind_speed + "MPH"
      );

      // $(".cityName3").text(date3);
      $(".cityTemp3").text("Max Temp: " + data["daily"][3].temp.max + " °F");
      $(".cityHumidity3").text("Humidity: " + data["daily"][3].humidity + "%");
      $(".cityWind3").text(
        "Wind Speed: " + data["daily"][3].wind_speed + "MPH"
      );

      // $(".cityName4").text(date4);
      $(".cityTemp4").text("Max Temp: " + data["daily"][4].temp.max + " °F");
      $(".cityHumidity4").text("Humidity: " + data["daily"][4].humidity + "%");
      $(".cityWind4").text(
        "Wind Speed: " + data["daily"][4].wind_speed + "MPH"
      );

      // $(".cityName5").text(date5);
      $(".cityTemp5").text("Max Temp: " + data["daily"][5].temp.max + " °F");
      $(".cityHumidity5").text("Humidity: " + data["daily"][5].humidity + "%");
      $(".cityWind5").text(
        "Wind Speed: " + data["daily"][5].wind_speed + "MPH"
      );
    });
}


function getHistory() {
  var clear = document.getElementById("history");
  searchHistory = JSON.parse(localStorage.getItem("history"));
  if (searchHistory !== null) {
    for (i = 0; i < searchHistory.length; i++) {
      $("history").append(
        `<button type="button" class="cityBTN">${searchHistory[i]}</button>`
      );
    }
  } else {
    searchHistory = [];
  }
}
getHistory();