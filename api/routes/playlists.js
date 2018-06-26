var express = require('express');
var router = express.Router();

var checkCreds = function(req, res, next) {
    console.log('check creds');
      spotifyApi.setCredentials(req.cookies['credentials']);
      next();
  }

/* GET users listing. */
router.get('/', checkCreds, function(req, res, next) {
    var url = 'https://api.spotify.com/v1/me/playlists';
    getPlaylists(req, res, url, 'playlists', next);
  },
  function(req, res) {
    res.send(req.items);
  }
);

var getPlaylists = function (req, res, url, bodyType, next) {
  var accessToken = spotifyApi.getAccessToken();
  var options = {
      url: url,
      headers: { 'Authorization': 'Bearer ' + accessToken },
      json: true
  };

  var cachedItems = cache.get(cacheKeys[bodyType]);

  if (!cachedItems) {
    getItems(options, accessToken, bodyType, function(body, err) {
      if (err) {
        console.log(err);
      }
      else {
        cache.set(cacheKeys[bodyType], body);
       	req.items = body;
      }
      next();
    });
  }
  else {
    req.items = cachedItems;
    next();
  }
}

var getItems = function(options, accessToken, bodyType, sendResponse) {
  var items = [],
    sequence = Promise.resolve(),
    hasNextPage = true;

  async.whilst(
    function() {
      return hasNextPage;
    },
    function(callback, body) {
      sequence = sequence.then(function(){
        return getList(options);
      }).then(function(body){
        switch(bodyType) {
          case 'playlists':
            options.url = body.next;
            items = items.concat(body.items)
            break;
        }
        // If on the last page of artists
        if (options.url === null) {
          hasNextPage = false;
        }
        callback();
      }).catch(function(err){
          console.log(err + ' failed to load!');
          callback(err);
      });
    },
    function callback(err) {
      // Calls callback function defined above
      sendResponse(items, err);
    });
}

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

module.exports = router;
