var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
  console.log('check creds');
	spotifyApi.setCredentials(req.cookies['credentials']);
	next();
}

/* GET users listing. */
router.get('/', [checkCreds], function(req, res, next) {
  console.log('/top-artists')
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
          return spotifyApi.getMyTopArtists({limit: 50, after: after});
        }
        else {
          return spotifyApi.getMyTopArtists({limit: 50});
        }
      })
      .then(function(data) {
        items = items.concat(data.body.items);
        after = items[items.length - 1].id;
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
    });
  },
  function(req, res, next) {
      res.send(req.items);
  }
);

module.exports = router;
