$(window).ready(function(){
	$('#calculate').click(function(){

		var selectedDay = $('.day.active').attr('data-day');
		$('#propDate').html(selectedDay);
		//http://momentjs.com/
		console.log(selectedDay,moment().format());

	});
});