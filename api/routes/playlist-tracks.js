var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

var getPlaylistTracks = function (req, res, next) {
	var playlistId = req.query.playlist;
	var owner = req.query.owner;
	var items = [],
		sequence = Promise.resolve(),
		hasNextPage = true,
		offset = 0;
  
	async.whilst(
	  function() {return hasNextPage;},
	  function(callback, data) {
		sequence = sequence.then(function() {
		  return spotifyApi.getPlaylistTracks(owner, playlistId, { 'limit' : 100, 'offset': offset});
		})
		.then(function(data) {
		  items = items.concat(data.body.items);
		  offset += 100;
		  if (data.body.next === null) {
			hasNextPage = false;
			req.items = items;
		  }
		  callback();
		})
		.catch(function(err){
		  console.log(err + ' failed to load!');
		  callback(err);
		});
	  },
	  function callback(err) {
		next();
		}
	);
}

/* GET users listing. */
router.get('/', checkCreds, 
	function(req, res, next) {
		getPlaylistTracks(req, res, next);
	},
	function(req, res) {
		res.send(req.items);
	}
);

module.exports = router;
