var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

/* GET users listing. */
router.get('/', [checkCreds], function(req, res, next) {
	console.log('Getting user');
  // Try to get user data from cache
	var cachedUser = cache.get(cacheKeys.user);

	// If user hasn't been cached, then fetch the data
  if (!cachedUser) {
    spotifyApi.getMe()
		  .then(function(data) {
				cache.set(cacheKeys.user, data.body);
		    res.send({
		    	'user': data.body
		    })
		  }, function(err) {
		    console.log('Something went wrong!', err);
		  });
  }
  else {
    res.send({
        'user': cachedUser
    });
	}
	// console.log(res);
});

module.exports = router;
