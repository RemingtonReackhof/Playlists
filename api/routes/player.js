var express = require('express');

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

/* GET users listing. */
router.get('/', [checkCreds], function(req, res, next) {
  // If user hasn't been cached, then fetch the data
  spotifyApi.getMyCurrentPlaybackState()
    .then(function(data) {
      res.send({
        'user': data.body
      })
    }, function(err) {
      console.log('Something went wrong!', err);
    });
});

module.exports = router;
