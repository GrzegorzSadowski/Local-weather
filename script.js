var lat;
var lon;
var fahrenheit;
var img = new Image();
var output = document.getElementById("out");




function geoFindMe() {
  

   if (!navigator.geolocation){
   output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
   return;
   };

  function success(position) {
      var lat = position.coords.latitude.toFixed(3);
      var lon = position.coords.longitude.toFixed(3);
      output.innerHTML=""
      img.src = 'https://maps.googleapis.com/maps/api/staticmap?center='+lat+','+lon+%26+'zoom=13&size=250x250&key=AIzaSyBsU_T-MjanJ0gwUK04Lo1_2zyuzzE2aHQ';
    
      output.append(img);
      getWeather(lat,lon);
   };

  function error() {
     output.innerHTML = "Unable to retrieve your location";
   };
  
  output.innerHTML = "<p>Locating…</p>";
  navigator.geolocation.getCurrentPosition(success, error);
};







function getWeather(lat,lon) {
  $.ajax({ url: "https://fcc-weather-api.glitch.me/api/current?lat=" + lat +"&lon=" + lon,
      dataType:'json',
      success: function (data){ 
      $("#coord").html("You are on latitude="+data.coord.lat+"°<br/>and on longitude=" +data.coord.lon+"°");
      $("#weather").html( "Sky "+data.weather[0].main);
      $("#icon").html("<img src = '" + data.weather[0].icon + "'"+ "class='icon-png'/>");
      $("#temp").html("Temp "+data.main.temp);
      $("#pressure").html("Pressure  "+data.main.pressure+" hPa");
      $("#humidity").html("Humidity  "+data.main.humidity+" %");
      $("#bu").html("<input type='button' class='btn-secondary btn-sm cf 'value='°C'/>");    
      fahrenheit= ((data.main.temp * (9/5)) + 32).toFixed(1);
      $("#fahrenheit").text("Temp "+fahrenheit);
      $("#fahrenheit").hide();
        $(".cf").click(function(){
          $("#fahrenheit").toggle();
          $("#temp").toggle();
          $(this).val($(this).val() == '°C'?'°F' : '°C');
         });       
                              }
        });
                                };

$(document).ready(function() {
geoFindMe();  
});
