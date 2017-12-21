/**
 * Created by lauradouglas on 2017-12-21.
 */
$( document ).ready(function () {

    /**
     * Obtains parameters from the hash of the URL
     * @return Object
     */
    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');

    var oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');

    var params = getHashParams();

    var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;

    if (error) {
        alert('There was an error during the authentication');
    } else {
        if (access_token) {
            // render oauth info
            oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
            });

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);

                    $('#login').hide();
                    $('#loggedin').show();
                }
            });
        } else {
            // render initial screen
            $('#login').show();
            $('#loggedin').hide();
        }

        /*
         document.getElementById('obtain-new-token').addEventListener('click', function() {
         $.ajax({
         url: '/refresh_token',
         data: {
         'refresh_token': refresh_token
         }
         }).done(function(data) {
         access_token = data.access_token;
         oauthPlaceholder.innerHTML = oauthTemplate({
         access_token: access_token,
         refresh_token: refresh_token
         });
         });
         }, false);
         */

    }

    $("#dance").on("input change", function() { $('#dance_value')[0].innerHTML = $('#dance')[0].value });
    $("#energy").on("input change", function() { $('#energy_value')[0].innerHTML = $('#energy')[0].value });
    $("#instrumental").on("input change", function() { $('#instrumental_value')[0].innerHTML = $('#instrumental')[0].value });
    $("#tempo").on("input change", function() { $('#tempo_value')[0].innerHTML = $('#tempo')[0].value });
    $("#valence").on("input change", function() { $('#valence_value')[0].innerHTML = $('#valence')[0].value });

    document.getElementById('getSongsByWord').addEventListener('click', function() {
        console.log('get songs by word >> ', $('#word')[0].value)
        var word = $('#word')[0].value
        $.ajax({
            url: '/getSongsByWord?word=' + word,
            data: {

            }
        }).done(function(data) {
            $.each(JSON.parse(data), function(i, obj) {
                $('#allSongs').append('<p>' + obj.album.name + '</p>')
            })

        })
    }, false)

});
