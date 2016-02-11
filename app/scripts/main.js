$(window).ready(function(){
		/*console.log("ok");*/
	$.getJSON( "data/types.json", function( data ) {

		var showSpecies = ['<option value="" style="font-style: italic;">Please select species...</option>'];
		var species = [];
		var prettyNames = {
			"arabidopsis": 'Arabidopsis thaliana',
			"corn": 'Zea maiz',
		};
		var library = data.library;

		/******************************************/
		//iterate along species
		$.each( library, function( key , specie) {
			//iterate along varieties
			$.each( specie, function( sp , variety ) {

				//populate species options
				showSpecies.push( "<option value='" + sp + "'>" + prettyNames[sp] + "</option>" );
				species.push(sp);

				//populate table with varieties
				$.each(variety, function(v,p){
					//console.log(v,p)
					$("#variants").find('tbody')
						.append($('<tr>')
							//class to pull selected species
							.addClass('species')
							.addClass(sp)
							.hide()
							//checkbox to select varieties
							.append($('<td>')
								.append($('<input>')
									.attr('type','checkbox')))
							//rest of the table
							.append($('<td>').text(variety[v].name))
							.append($('<td>').text(variety[v].genotype))
							.append($('<td>').text(variety[v].description))
							.append($('<td>').text(variety[v].growingCond))
							.append($('<td>').text(variety[v].schedule.harvestDays))
							.append($('<td>').text(variety[v].schedule.florationDays))
						)
					;
				});
			});
		});
		/******************************************/
		$( "<select />", {
			html: showSpecies
			}).appendTo( "#selectSpecies" )
		  	.addClass('form-control');

	  	//show varieties from selected species
	  	$("#selectSpecies").change(function(){
	  		//
	  		if($("#selectSpecies option:selected").val() === ''){
	  			$('.species').hide();
	  		}else {
	  			$('.species').hide();
	  			var selectedSp = $("#selectSpecies option:selected").val();
	  			$('.species.' + selectedSp).fadeIn( "slow" );
	  		}
	  	});
	  	

	  	

		$( "<pre/>", {
			html: JSON.stringify(data)
			}).appendTo( "#dbpre" );



	});

});
