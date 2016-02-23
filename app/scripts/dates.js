$(window).ready(function() {

    $('#calculate').click(function() {

        var selectedDate = $('.day.active').attr('data-day');
        var selectedDate = moment(selectedDate, ['MM-DD-YYYY', 'DD-MM-YYYY']);

        $('#propDate').html(selectedDate);

        //selected data
        var varietiesSet = {};

        //data categories
        var props = ['sp', 'genotype', 'desc', 'gc', 'hd', 'fd'];

        //selection
        var selectedVariants = $('#selectVariants').find('tr.species');

        //build object with selected varieties
        for (var i = 0; i < selectedVariants.length; i++) {
            varietiesSet[i] = {};
            for (var j = 0; j < selectedVariants[i].children.length; j++) {
                varietiesSet[i][props[j]] = selectedVariants[i].children[j].innerHTML;
            }
        }
        //calculation set
        var calcSet = {};
        for (var v in varietiesSet) {
            calcSet[varietiesSet[v].genotype] = varietiesSet[v].hd;
        }

        //get selected method
        var method = $('input[name="method"]:checked').val();

        method === 'harvestsoonest' ? selectedDate = null : selectedDate;

        var results = calcSowDates(calcSet, method, selectedDate);

        //clean tbody on each click
        $('#resultDates').find('tbody').children().remove();

        if(results !== undefined){
	        $('#initD').text(results.initialDate.format('L'));
	        $('#endD').text(results.doneDate.format('L'));

	        delete(results.initialDate);
	        delete(results.doneDate);

	        //populate results
	        $.each(results, function(index, value) {
	        	$('#resultDates')
		            .find('tbody')
		            .append($('<tr>')
		            	.append($('<td>').text(index))
		            	.append($('<td>').text(value.format('L')))
	            	);
			});         	
        }

    });

});

/*
	@inputSet object with selected vars
	@method type of calculation
		harvestsoonest
		sowondate
	@selectedDate if null today
*/
function calcSowDates(inputSet, method, selectedDate) {

    method = method || 'harvestsoonest';
    selectedDate = selectedDate || moment();
    if (Object.keys(inputSet).length < 2) {
        alert('Select at least two options, corneta');
        return;
    }
    var resultDates = {};
    var sortedSet = [];
    sortedSet = convertObjToArr(inputSet);
    //get larger value from sortedSet
    var totalDays = parseInt(sortedSet[0][1]);

    //custom selectedDate selected
    if (method !== 'harvestsoonest') {
        //difference between selected date and now, the + 1 includes the day of today
        var increment = parseInt(selectedDate.diff(moment(), 'days')) + 1;
        for (var i = sortedSet.length - 1; i >= 0; i--) {
            var delta = totalDays - parseInt(sortedSet[i][1]) + increment;
            resultDates[sortedSet[i][0]] = moment().add(delta, 'days');
        }
        var doneDate = moment().add(totalDays + increment, 'days');
    } else {
        //Finish the soonest possible
        for (var i = sortedSet.length - 1; i >= 0; i--) {
            var delta = totalDays - parseInt(sortedSet[i][1]);
            resultDates[sortedSet[i][0]] = moment().add(delta, 'days');
        }
        var doneDate = moment().add(totalDays, 'days');
    }
    resultDates['initialDate'] = selectedDate;
    resultDates['doneDate'] = doneDate;

    return resultDates;
}

//convert object to array to be sorted
function convertObjToArr(inObj) {
    var outArr = [];
    for (var key in inObj) {
        outArr.push([key, inObj[key]])
    }
    //sort by values decreasing
    outArr.sort(function(a, b) {
        return b[1] - a[1]
    });
    return outArr;
}