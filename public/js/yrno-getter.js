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


function weatherlookup(tableID, lonlat, place, yr) {
  $.getJSON('/js/icons.json', function(data) {
      var icons = data;
  $.getJSON( "/json?" + lonlat , function( data ) {
    var length = data.length;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    for ( var i=0; i<data.length; i++){ //for entry in json

      var fromdate = data[i]["from"];
      var myDate = new Date()  //turn the date value to a js date format so we can check if there is a saturday coming up
      myDate.setFullYear(fromdate.substring(0,4));
      myDate.setMonth(parseInt(fromdate.substring(5,7))-1); //javascript months count from january = zero
      myDate.setDate(fromdate.substring(8,10));

      //fill an array to append to each row
      //replace the data with nicer formats
      if (myDate.getDay() == 6) {  //check for saturday
        items = []
        var date = []
        date.push(myDate)
        $.each( data[i], function( key, val ) {
          if (key == "icon"){
            items.push( "<td>" + "<img class=\"icons\" alt="+val + " src="+"http://api.met.no/weatherapi/weathericon/1.1/?symbol="+icons[val]+";is_night=0;content_type=image/svg>" + "</td>" ); //change this to the appropriate images
          }
          else if (key == "rain") {
            rainvalue = parseFloat(data[i]["rain"].split(' mm')[0])
            items.push( "<td>" + rainvalue + "mm" + "</td>" );
          }
          else if (key == "temperature" ) {
            items.push( "<td>" + Math.round(val.split(' celsius')[0]) + "°C" + "</td>" );
          }
          else if ( key == "humidity" ) {
            items.push( "<td>" + Math.round(val.split(' percent')[0]) + "%" + "</td>" );
          }
          else if (key == "cloudiness") {
            items.push( "<td>" + Math.round(val.split('%')[0]) + "%" + "</td>" );
          }
        })
        //set colors of rows depending on the rain amount and then append
        if ( rainvalue < 0.5 ) {
          $(tableID).append( "<tr class = \"success\">" + "<td class = \"place\">" +"<a href=https://www.yr.no/place/United_Kingdom/England/"+yr+"  target = \"_blank\">"+place+"</a></td>"+ "</td>" + items + "</tr>");
        }
        else if ( rainvalue < 2 && rainvalue > 0.5 ) {
          $(tableID).append( "<tr class = \"warning\">" + "<td class = \"place\">" +"<a href=https://www.yr.no/place/United_Kingdom/England/"+yr+" target = \"_blank\">"+place+"</a></td>" + items + "</tr>");
        }
        else if ( rainvalue > 2) {
          $(tableID).append( "<tr class = \"danger\">" + "<td class = \"place\">" +"<a href=https://www.yr.no/place/United_Kingdom/England/"+yr+" target = \"_blank\">"+place+"</a></td>"+ "</td>" + items + "</tr>");
        }
      }
    }
    if (counter<=0){
        $("#date").append("Saturday " + date[0].getDate() + month[date[0].getMonth()]);
        counter++;
      }
})
});
}
