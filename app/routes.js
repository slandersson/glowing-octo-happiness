var express = require('express');
var path = require('path');
var yrno = require('yr.no-forecast'); //use my forked version with 7+ day forecast
// create router object
var router = express.Router();

module.exports = router;


router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});

router.get('/tvl/1', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/tvl/tvl1.html'))
});

router.get('/tvl/3a', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/tvl/tvl3a.html'))
});


// json file from URL lat + long. The other available options are:
// # Current conditions
// location.getCurrentSummary(cb);
// # Weather anytime from now till future
// location.getForecastForTime(time, cb);
// query usage is /json?lat=50&lon=0

router.get('/json', function(req, res) {
  yrno.getWeather({
    lat: req.query.lat,
    lon: req.query.lon
  }, function(err, weather) {
    // Weather for next seven days (Array with five object)
    weather.getSevenDaySummary(function(err, summary) {
      res.json(summary)
    })
  });
});
