var express = require('express');
var path = require('path');
var yrno = require('yr.no-forecast');
// create router object
var router = express.Router();

module.exports = router;


router.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
});


router.get('/begin', function(req,res) {
  res.sendFile(path.join(__dirname, '../public/begin.html'))
});


// json file from URL lat + long. The available options are:
router.get('/json', function(req,res) {
  yrno.getWeather({
  lat: req.query.lat,
  lon: req.query.lon
  }, function(err, weather) {
  // Weather for next five days (Array with five object)
  weather.getFiveDaySummary(function(err, summary) {
    res.json(summary)
  })
});
});
