var express = require('express');
var path = require('path');
var yrno = require('yr.no-forecast');
// create router object
var router = express.Router();

module.exports = router;


router.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});


router.get('/tvl3a', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/tvl3a.html'))
});


// json file from URL lat + long. The available options are:
// // Current conditions
// location.getCurrentSummary(cb);
// // Weather anytime from now till future
// location.getForecastForTime(time, cb);

router.get('/json', function(req,res) {
  yrno.getWeather({
  lat: req.query.lat,
  lon: req.query.lon
  }, function(err, weather) {
  // Weather for next five days (Array with five object)
  weather.getSevenDaySummary(function(err, summary) {
    res.json(summary)
  })
});
});

router.get('/begin', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/begin.html'))
});
