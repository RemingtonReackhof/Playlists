var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log('callback');
  // Get code for authorization
  var code = req.query.code || null;

  spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      res.cookie('accessToken', spotifyApi.getAccessToken());
      console.log(spotifyApi.getCredentials());
      res.cookie('credentials', spotifyApi.getCredentials());
      res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
        res.redirect('/login');
    })
  });

module.exports = router;
