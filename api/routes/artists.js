var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

/* GET users listing. */
router.get('/', [checkCreds], function(req, res, next) {
  console.log('/artists')
  var cachedArtists = cache.get(cacheKeys.artists);
  if (!cachedArtists) {
  var items = [],
      sequence = Promise.resolve(),
      hasNextPage = true,
      after = null;

  /* Get followed artists */
  async.whilst(
    function() {return hasNextPage;},
    function(callback, data) {
      sequence = sequence.then(function() {
        if (after) {
          return spotifyApi.getFollowedArtists({limit: 50, after: after});
        }
        else {
          return spotifyApi.getFollowedArtists({limit: 50});
        }
      })
      .then(function(data) {
        items = items.concat(data.body.artists.items);
        after = items[items.length - 1].id;
        if (data.body.artists.next === null) {
          hasNextPage = false;
          items = _.sortBy(items, "popularity").reverse();
          cache.set(cacheKeys.artists, items);
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
    });
  }
    else {
    req.items = cachedArtists;
    next();
  }  
  },
  function(req, res, next) {
      res.send(req.items);
  }
);

module.exports = router;
