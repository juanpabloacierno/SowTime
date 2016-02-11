$('#edit').click(function(){
		/*console.log("ok");*/
	$.getJSON( "data/types.json", function( data ) {

	var items = [];
	$.each( data, function( key, val ) {
		items.push( "<li id='" + key + "'>" + val + "</li>" );
	});

//	console.log(data);
	$( "<pre/>", {
		html: JSON.stringify(data)
	}).appendTo( "#dbpre" );
	});


/*	var jqxhr = $.getJSON( "data/types.json", function() {
  console.log( "success" );
})
  .done(function() {
    console.log( "second success" );
  })
  .fail(function() {
    console.log( "error" );
  })
  .always(function() {
    console.log( "complete" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
jqxhr.complete(function() {
  console.log( "second complete" );
});*/
	
});
