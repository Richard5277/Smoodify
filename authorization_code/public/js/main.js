/**
 * Created by lauradouglas on 2017-12-21.
 */
$( document ).ready(function () {

    $("#dance").on("input change", function() { $('#dance_value')[0].innerHTML = $('#dance')[0].value });
    $("#energy").on("input change", function() { $('#energy_value')[0].innerHTML = $('#energy')[0].value });
    $("#instrumental").on("input change", function() { $('#instrumental_value')[0].innerHTML = $('#instrumental')[0].value });
    $("#tempo").on("input change", function() { $('#tempo_value')[0].innerHTML = $('#tempo')[0].value });
    $("#valence").on("input change", function() { $('#valence_value')[0].innerHTML = $('#valence')[0].value });

    document.getElementById('getSongsByWord').addEventListener('click', function() {
        console.log(' << get songs by word >> ')
        $.ajax({
            url: '/getSongsByWord?word=' + word,
            data: {
            }
        }).done(function(data) {
            $.each(JSON.parse(data), function(i, obj) {
                console.log(i)
                console.log(obj)
                $('#allSongs').append('<p>' + obj.name + '</p>')
            })

        })
    }, false);

    // range sliders
    $( "#dancability" ).slider({
        range: true,
        min: 0.0,
        max: 1.0,
        step: 0.1,
        values: [ 0, 1.0 ],
        slide: function( event, ui ) {
            $( "#amt1" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt1" ).val(  $( "#dancability" ).slider( "values", 0 ) +
        " - " + $( "#dancability" ).slider( "values", 1 ) );

    $( "#energy" ).slider({
        range: true,
        min: 0.0,
        max: 1.0,
        step: 0.1,
        values: [ 0, 1.0 ],
        slide: function( event, ui ) {
            $( "#amt2" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt2" ).val(  $( "#energy" ).slider( "values", 0 ) +
        " - " + $( "#energy" ).slider( "values", 1 ) );

    $( "#instrumental" ).slider({
        range: true,
        min: 0.0,
        max: 1.0,
        step: 0.1,
        values: [ 0, 1.0 ],
        slide: function( event, ui ) {
            $( "#amt3" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt3" ).val(  $( "#instrumental" ).slider( "values", 0 ) +
        " - " + $( "#instrumental" ).slider( "values", 1 ) );

    $( "#tempo" ).slider({
        range: true,
        min: 80,
        max: 203,
        step: 1,
        values: [ 80, 203 ],
        slide: function( event, ui ) {
            $( "#amt4" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt4" ).val(  $( "#tempo" ).slider( "values", 0 ) +
        " - " + $( "#tempo" ).slider( "values", 1 ) );

    $( "#valance" ).slider({
        range: true,
        min: 0,
        max: 1.0,
        step: 0.1,
        values: [ 0, 1.0 ],
        slide: function( event, ui ) {
            $( "#amt5" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt5" ).val(  $( "#valance" ).slider( "values", 0 ) +
        " - " + $( "#valance" ).slider( "values", 1 ) );




});