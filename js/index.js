var lat;
var lon;
var key = "883521d7383bc7d2f789b6539149fb45";
var cTemp = " °C";
var fTemp = " °F";
var tmp;
var currTemp;

$(document).ready(function(){
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat ="lat="+ position.coords.latitude;
    lon ="lon="+ position.coords.longitude
    getWeather(lat, lon);
  });
}});

$("#unitBtn").on("click", function(){
   if(currTemp == 'c')
   {
      tmp = (tmp * 1.8) + 32;
      $("#temp-data").html(Math.round(tmp) + fTemp);
     $("#unitBtn").html(cTemp);
     currTemp = 'f';
   }
   else
   {
      tmp = (tmp -32) / 1.8;
      $("#temp-data").html(Math.round(tmp) +cTemp);
      $("#unitBtn").html(fTemp);
     currTemp = 'c';
     
    }
 });


function getWeather(lat, lon)
{
  var url = "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?" + lat + "&" + lon + "&" +"units=metric&APPID=" + key;
 $.getJSON(url, function(data){
  $("#location-data").html(data.name);
   tmp = data.main.temp;
   
  $("#temp-data").html(Math.round(tmp) + cTemp);
   currTemp = 'c';
   $("#unitBtn").html(fTemp);
  //$("#cBtn").hide();
   $("#weather-desc").html(data.weather[0].description);
   var wIcon = data.weather[0].icon;
   var iconUrl="http://openweathermap.org/img/w/" + wIcon + ".png"
   $("#weather-icon").attr("src", iconUrl);
   console.log(data);
  });
    
};