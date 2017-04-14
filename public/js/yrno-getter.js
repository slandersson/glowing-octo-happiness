function weatherlookup(tableID, lonlat) {
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

      if (myDate.getDay() == 6) {  //check for saturday
        console.log(data[i])
        items = []
        var items = [];
        $.each( data[i], function( key, val ) {
          items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
          "class": "my-new-list",
          html: items.join( "" )
        }).appendTo( tableID );
      }
    }
})
}
