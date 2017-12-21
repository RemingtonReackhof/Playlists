var express = require('express');
var router = express.Router();

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/', function(req, res, next) {
  // Set state
  var state = generateRandomString(16);

  // Set scopes that you need from user to authorize
  var scopes = ['user-read-private',
   							'user-read-email',
   							'user-follow-read',
   							'playlist-read-private',
   							'playlist-read-collaborative'
   							];

  // Set spotify authorization URL using API and redirect there
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

module.exports = router;