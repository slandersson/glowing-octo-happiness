function weatherlookup(tableID, lonlat, place) {
  $.getJSON( "json?" + lonlat , function( data ) {
    var length = data.length;
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    for ( var i=0; i<data.length; i++){ //for entry in json

      var fromdate = data[i]["from"];
      var myDate = new Date()  //turn the date value to a js date format so we can check if there is a saturday coming up
      myDate.setFullYear(fromdate.substring(0,4));
      myDate.setMonth(parseInt(fromdate.substring(5,7))-1); //javascript months count from january = zero
      myDate.setDate(fromdate.substring(8,10));

      //remove unncecessary data
      delete data[i]["to"];
      delete data[i]["from"];
      delete data[i]["windDirection"];
      delete data[i]["windSpeed"];
      delete data[i]["humidity"];
      delete data[i]["lowClouds"];
      delete data[i]["dewpointTemperature"];
      delete data[i]["mediumClouds"];
      delete data[i]["highClouds"];
      delete data[i]["fog"];
      if (myDate.getDay() == 6) {  //check for saturday
        items = []
        var items = [];
        $.each( data[i], function( key, val ) {
          items.push( "<td>" + val + "</td>" );
        })
        //set colors depending on the rain amount
        rainvalue = parseFloat(data[i]["rain"].split(' mm')[0])
        if ( rainvalue < 0.5 ) {
          $(tableID).append( "<tr class = \"success\">" + "<td>" +place+ "</td>" + items + "</tr>");
        }
        else if ( rainvalue < 2 && rainvalue > 0.5 ) {
          $(tableID).append( "<tr class = \"warning\">" + "<td>" +place+ "</td>" + items + "</tr>");
        }
        else if ( rainvalue > 2) {
          $(tableID).append( "<tr class = \"danger\">" + "<td>" +place+ "</td>" + items + "</tr>");
        }
      }
    }
})
}
