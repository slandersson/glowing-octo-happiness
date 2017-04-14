var yrno = require('yr.no-forecast');

function foo(fn){
yrno.getWeather({
lat: 51.4543,
lon: 0.9781
}, function(err, weather) {
// Weather for next five days (Array with five object)
weather.getFiveDaySummary(function(err, summary) {
  fn(summary);
})
});

}

foo(function(summary){
  console.log(summary); // this is where you get the return value
});
