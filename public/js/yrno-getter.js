//can't believe js counts from zero
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

//function to get json of weather data, and then reduce it to the next saturday
function weatherlookup(tableID, lonlat, place, yr) {
  //fetch weather icon lokup array eg clouds =1, sun = 2 etc.
  $.getJSON('/js/icons.json', function(data) {
    var icons = data;
    //fetch yr.no json
    $.getJSON("/json?" + lonlat, function(data) {
      //for entry in json
      for (var i = 0; i < data.length; i++) {
        //Check if there is a saturday in the json
        var fromdate = data[i]["from"];
        var myDate = new Date()
        myDate.setFullYear(fromdate.substring(0, 4));
        myDate.setMonth(parseInt(fromdate.substring(5, 7)) - 1);
        myDate.setDate(fromdate.substring(8, 10));

        //if it's a saturday, append the data to the table
        if (myDate.getDay() == 6) {
          items = []
          var date = []
          date.push(myDate)
          $.each(data[i], function(key, val) {
            if (key == "icon") {
              items.push("<td>" + "<img class=\"icons\" alt=" + val + " src=" + "http://api.met.no/weatherapi/weathericon/1.1/?symbol=" + icons[val] + ";is_night=0;content_type=image/svg>" + "</td>"); //change this to the appropriate images
            } else if (key == "rain") {
              rainvalue = parseFloat(data[i]["rain"].split(' mm')[0])
              items.push("<td>" + rainvalue + "mm" + "</td>");
            } else if (key == "temperature") {
              items.push("<td>" + Math.round(val.split(' celsius')[0]) + "°C" + "</td>");
            } else if (key == "humidity") {
              items.push("<td>" + Math.round(val.split(' percent')[0]) + "%" + "</td>");
            } else if (key == "cloudiness") {
              items.push("<td>" + Math.round(val.split('%')[0]) + "%" + "</td>");
            }
          })
          //Set colors of rows depending on the rain amount
          id = place.split(' ')[0] //use the first word in the place name as row ID
          if (rainvalue < 0.5) {
            $(tableID).append("<tr class = \"success\" id=" + id + " href=https://www.yr.no/place/United_Kingdom/England/" + yr + ">" + "<td class = \"place\">" + place + "</td>" + "</td>" + items + "</tr>");
            $(document).ready(function() {
              $('#' + id).click(function() {
                window.location = $(this).attr('href');
                return false;
              });
            });
          } else if (rainvalue < 2 && rainvalue > 0.5) {
            $(tableID).append("<tr class = \"warning\" id=" + id + " href=https://www.yr.no/place/United_Kingdom/England/" + yr + ">" + "<td class = \"place\">" + place + "</td>" + "</td>" + items + "</tr>");
            $(document).ready(function() {
              $('#' + id).click(function() {
                window.location = $(this).attr('href');
                return false;
              });
            });
          } else if (rainvalue > 2) {
            $(tableID).append("<tr class = \"danger\" id=" + id + " href=https://www.yr.no/place/United_Kingdom/England/" + yr + ">" + "<td class = \"place\">" + place + "</td>" + "</td>" + items + "</tr>");
            $(document).ready(function() {
              $('#' + id).click(function() {
                window.location = $(this).attr('href');
                return false;
              });
            });
          }
        }
      }
      //add the date of the saturday to the heading
      if (counter <= 0) {
        $("#date").append("Saturday " + date[0].getDate() + month[date[0].getMonth()]);
        counter++;
      }
    })
  });
}
