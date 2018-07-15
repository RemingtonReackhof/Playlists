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
  var scopes = ['user-library-read',
    'playlist-read-private',
    'user-library-modify',
    'playlist-modify-public',
    'user-read-recently-played',
    'user-read-private',
    'user-read-email',
    'playlist-modify-private',
    'streaming',
    'user-top-read',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'user-follow-modify',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-follow-read'
  ];

  // Set spotify authorization URL using API and redirect there
  var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);
  res.redirect(authorizeURL);
});

module.exports = router;