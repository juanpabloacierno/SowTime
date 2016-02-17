$(window).ready(function(){
	
	//calendar display
	$('#calendar').fadeOut();

	$('#sowondate').click(function(){
		$('#calendar').fadeIn();
	});

	$('#harvestsoonest').click(function(){
		$('#calendar').fadeOut();
	});


	$('#calculate').click(function(){

		var selectedDate = $('.day.active').attr('data-day');
		var selectedDate = moment(selectedDate,["MM-DD-YYYY", "DD-MM-YYYY"]);

		$('#propDate').html(selectedDate);

		//set with selected data
		var varietiesSet = {};

		//data categories
		var props = ['sp','genotype','desc','gc','hd','fd'];

		//selection
		var selectedVariants = $('#selectVariants').find('tr.species');
		
		//build obj with selected varieties
		for(var i=0;i<selectedVariants.length;i++){
			varietiesSet[i] = {};
			for (var j = 0 ; j < selectedVariants[i].children.length; j++) {
				varietiesSet[i][ props[j] ] = selectedVariants[i].children[j].innerHTML;
			}
		}
		//calculation set
		var calcSet = {};
		for(var v in varietiesSet){
			calcSet[ varietiesSet[v].genotype ] = varietiesSet[v].hd;
		}

		//get selected method
		var method = $('input[name="method"]:checked').val();
		var results = calcDates(calcSet,method,selectedDate);
		console.log(results);


	});



});

/*
	@varietiesSet object with selected vars
	@method type of calculation
		harvestsoonest
		sowondate
	@selectedDate if null today
*/
function calcDates(varietiesSet, method, selectedDate){

	method = method || 'harvestsoonest';
	selectedDate = selectedDate || moment().format('L');
	if(Object.keys(varietiesSet).length < 2){
		alert("Select at least two varieties, corneta");
		return;
	}

	var resultDates = {};
	var sortedVarieties = [];

	//convert object to array to be sorted
	for (var variety in varietiesSet){
		sortedVarieties.push([variety, varietiesSet[variety]])
	}
	//sort
    sortedVarieties.sort(function(a, b) {
    	return b[1] - a[1]
    });

    //custom selectedDate selected
    if(method !== 'harvestsoonest'){
    	//difference between selected date and now
    	// the + 1 includes the day of today
    	var increment = parseInt(selectedDate.diff(moment(),'days') + 1);
    	for (var i = sortedVarieties.length - 1; i >= 0; i--) {
			var delta = parseInt(sortedVarieties[i][1]) + increment ;
    		resultDates[ sortedVarieties[i][0] ] = moment().add(delta,'days');
    	}
    }else{ //harvest the soonest possible
    	for (var i = sortedVarieties.length - 1; i >= 0; i--) {
    		resultDates[ sortedVarieties[i][0] ] = moment().add(sortedVarieties[i][1],'days');
    	}
    }

	return resultDates;
}	


