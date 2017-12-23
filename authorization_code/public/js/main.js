/**
 * Created by lauradouglas on 2017-12-21.
 */
$( document ).ready(function () {

    var loader = $("#loadContainer");





    loader.hide();




    $("#dance").on("input change", function() { $('#dance_value')[0].innerHTML = $('#dance')[0].value });
    $("#energy").on("input change", function() { $('#energy_value')[0].innerHTML = $('#energy')[0].value });
    $("#valence").on("input change", function() { $('#valence_value')[0].innerHTML = $('#valence')[0].value });


    // document.getElementById('createAPlaylist').addEventListener('click', function() {
    //     console.log(' creating playlist ')
    //     $.ajax({
    //         url: '/createAPlaylist'
    //     }).done(function(){
    //         console.log('created');
    //     })
    // }, false);

    document.getElementById('getSongsByWord').addEventListener('click', function() {
        console.log(' << get songs by word >> ')
        loader.fadeIn()
        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        $.ajax({
            url: '/getSongsByWord?word=' + word,
            data: {
            }
        }).done(function(data) {
            $.each(JSON.parse(data), function(i, obj) {
                console.log(i)
                console.log(obj)
                loader.fadeOut(400, function() {

                    $('#allSongs').append('<p>' + obj.name + '</p>').hide().fadeIn(600);

                });
                $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });






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

    $( "#valance" ).slider({
        range: true,
        min: 0,
        max: 1.0,
        step: 0.1,
        values: [ 0, 1.0 ],
        slide: function( event, ui ) {
            $( "#amt3" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#amt3" ).val(  $( "#valance" ).slider( "values", 0 ) +
        " - " + $( "#valance" ).slider( "values", 1 ) );




});