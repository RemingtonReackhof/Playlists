var express = require('express');
var router = express.Router();

app.get('/', function(req, res) {
	spotifyApi.refreshAccessToken()
	  .then(function(data) {
	    console.log('The access token has been refreshed!');
	  }, function(err) {
	    console.log('Could not refresh access token', err);
	  });
});

module.exports = router;