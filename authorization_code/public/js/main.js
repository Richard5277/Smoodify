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
            url: '/getSongsByWord'
        }).done(function(data) {
            $.each(JSON.parse(data), function(i, obj) {
                console.log(i)
                console.log(obj)
                $('#allSongs').append('<p>' + obj.name + '</p>')
            })

        })
    }, false)

});