$(window).ready(function() {
    //pull data	
    $.getJSON('data/types.json', function(data) {

        var showSpecies = ['<option value="" style="font-style: italic;">Please select species...</option>'];
        var species = [];
        var prettyNames = {
            'arabidopsis': 'A. thaliana',
            'corn': 'Zea maiz',
        };
        var library = data.library;

        /******************************************/
        //iterate along species
        $.each(library, function(key, specie) {
            //iterate along varieties
            $.each(specie, function(sp, variety) {

                //populate species options
                showSpecies.push('<option value="' + sp + '">' + prettyNames[sp] + '</option>');
                species.push(sp);

                //populate table with varieties
                $.each(variety, function(v, p) {
                    //console.log(v,p)
                    $('#variants')
                        .find('tbody')
                        .append($('<tr>')
                            //class to pull selected species
                            .addClass('species')
                            .addClass(sp)
                            .hide()
                            //checkbox to select varieties
                            .append($('<td>')
                                .append($('<input>')
                                    .attr('type', 'checkbox')))
                            //rest of the table
                            .append($('<td>').text(prettyNames[sp]))
                            .append($('<td>').text(variety[v].genotype))
                            .append($('<td>').text(variety[v].description))
                            .append($('<td>').text(variety[v].growingCond))
                            .append($('<td>').text(variety[v].schedule.harvestDays))
                            .append($('<td>').text(variety[v].schedule.florationDays))
                    );
                });
            });
        });
        /******************************************/
        $('<select />', {
            html: showSpecies
        }).appendTo('#selectSpecies')
            .addClass('form-control');

        //show varieties from selected species
        $('#selectSpecies').change(function() {
            //if nothing selected hide table
            if ($('#selectSpecies option:selected').val() === '') {
                $('.species').fadeOut('fast');
                $('#variants').addClass('hidden');
            } else {
                $('.species').hide();
                $('#variants').removeClass('hidden');
                var selectedSp = $('#selectSpecies option:selected').val();
                $('.species.' + selectedSp).fadeIn('fast');
            }
        });

        $('#choose').click(function() {
            $('#params').addClass('hidden');
        });


        //display selected 
        $('#pickDates').click(function() {

            var sv = $('#selectVariants').find('tbody');

            //clear previously selected
            sv.children().remove();

            //selected specie (dropdown)
            var selectedSpecies = $('#selectSpecies option:selected').val();

            //selected variants (available genotypes)
            var selectedVarieties = $('.species.' + selectedSpecies);

            //select checked variants and move them to calc table
            selectedVarieties
                .find('input:checked')
                .parents('tr')
                .clone()
                .appendTo(sv)
            //remove previous checkboxes
            .find('[type=checkbox]')
                .parent().remove();

            //display params div if something was selected
            if ($('#selectVariants').find('tr').length > 1) {
                $('#params').removeClass('hidden');
            }

        });
        /******************************************/

        //calendar display
        $('#calendar').fadeOut();

        $('#sowondate').click(function() {
            $('#calendar').fadeIn();
        });

        $('#harvestsoonest').click(function() {
            $('#calendar').fadeOut();
        });

        /******************************************/

        $('<pre/>', {
            html: JSON.stringify(data)
        }).appendTo('#dbpre');


    });

});