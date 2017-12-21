var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

// Returns Promise and list of specified objects
var getList = function(options) {
  return new Promise(function(resolve, reject) {
    request.get(options, function(err, response, body) {
      if (err) {
        reject("Bad request: " + err);
      }
      else {
        resolve(body);
      }
    });
  });
}

var getAudioFeatures = function(req, res, next) {
  var url = 'https://api.spotify.com/v1/audio-features/?ids=' + req.query.ids;
  var options = {
    url: url,
    headers: { 'Authorization': 'Bearer ' + spotifyApi.getAccessToken() },
    json: true
  };
  getList(options)
  	.then((body) => {
  		req.body = body;
  		next();
  	})
  	.catch((err) => {
  		console.log(err);
  	});
}

/* GET users listing. */
router.get('/', [checkCreds, getAudioFeatures],
	function(req, res) {
		res.send(req.body);
	}
);

module.exports = router;
