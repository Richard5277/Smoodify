/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var unirest = require('unirest');

// personal credentials
var config = require('../config.json');
var client_id = config.CLIENT_ID; 
var client_secret = config.CLIENT_SECRET; 
var redirect_uri = config.REDIRECT_URI;
var SpotifyWebApi = require('spotify-web-api-node');
// credentials are optional
var spotifyApi = new SpotifyWebApi({
	clientId : config.CLIENT_ID,
	clientSecret : config.CLIENT_SECRET,
	redirectUri : config.REDIRECT_URI
});
spotifyApi.setAccessToken('BQDVXi5hdkjQwzUgoJGaYobfvoWVfwOyyzuyHZeEUDIQGq0yi4RGmn_X4yG80dA_LRHI7JR6bMqbWD4ggzwhUiF_r1a4PysBt4e1LNXI8aeV8avpETHKRYPOqnlyFlINFvbeOIUsdzduMvTMdNickIbNoS-HDGFEEg')
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
 var generateRandomString = function(length) {
 	var text = '';
 	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

 	for (var i = 0; i < length; i++) {
 		text += possible.charAt(Math.floor(Math.random() * possible.length));
 	}
 	return text;
 };

 var stateKey = 'spotify_auth_state';

 var app = express();

 app.use(express.static(__dirname + '/public'))
 .use(cookieParser());

 app.get('/login', function(req, res) {

 	var state = generateRandomString(16);
 	res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
  	querystring.stringify({
  		response_type: 'code',
  		client_id: client_id,
  		scope: scope,
  		redirect_uri: redirect_uri,
  		state: state
  	}));
});

 app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
  	res.redirect('/#' +
  		querystring.stringify({
  			error: 'state_mismatch'
  		}));
  } else {
  	res.clearCookie(stateKey);
  	var authOptions = {
  		url: 'https://accounts.spotify.com/api/token',
  		form: {
  			code: code,
  			redirect_uri: redirect_uri,
  			grant_type: 'authorization_code'
  		},
  		headers: {
  			'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  		},
  		json: true
  	};

  	request.post(authOptions, function(error, response, body) {
  		if (!error && response.statusCode === 200) {

  			var access_token = body.access_token,
  			refresh_token = body.refresh_token;

  			var options = {
  				url: 'https://api.spotify.com/v1/me',
  				headers: { 'Authorization': 'Bearer ' + access_token },
  				json: true
  			};

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
        	console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
        	querystring.stringify({
        		access_token: access_token,
        		refresh_token: refresh_token
        	}));
    } else {
    	res.redirect('/#' +
    		querystring.stringify({
    			error: 'invalid_token'
    		}));
    }
});
  }
});

//  app.get('/refresh_token', function(req, res) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//   	url: 'https://accounts.spotify.com/api/token',
//   	headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//   	form: {
//   		grant_type: 'refresh_token',
//   		refresh_token: refresh_token
//   	},
//   	json: true
//   };

//   request.post(authOptions, function(error, response, body) {
//   	if (!error && response.statusCode === 200) {
//   		var access_token = body.access_token;
//   		res.send({
//   			'access_token': access_token
//   		});
//   	}
//   });
// });



// function getRandomWord() {
//     unirest.get("https://apifort-random-word-v1.p.mashape.com/v1/generate/randomword?count=1")
//         .header("X-Mashape-Key", "pI2PxJlneKmshN7Tg7w2aw47U59Fp14qvfDjsnN2eh6RtPO42R")
//         .header("Accept", "application/json")
//         .end(function (result) {
//             //console.log(result.status, result.headers, result.body);
//              return result.body.result;
//         });
//
// }


app.get('/getSongsByWord', function(req,res) {
	console.log("working");

	unirest.get("https://apifort-random-word-v1.p.mashape.com/v1/generate/randomword?count=1")
        .header("X-Mashape-Key", "pI2PxJlneKmshN7Tg7w2aw47U59Fp14qvfDjsnN2eh6RtPO42R")
        .header("Accept", "application/json")
        .end(function (result) {
            //console.log(result.status, result.headers, result.body);
            var randomWord = (result.body.result).toString();
            var randomWordTrimmed = randomWord.slice(0,4);

            spotifyApi.searchTracks(randomWord)
                .then(function(data) {
                    console.log(randomWord);
                    console.log(randomWordTrimmed);

                    res.send(JSON.stringify(data.body.tracks.items))
                }, function(err) {
                    console.error(err);
                })
        });



})


console.log('Listening on 8888');
app.listen(8888);

// git branch testing >> Richard
