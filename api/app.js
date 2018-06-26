var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = express.Router();

// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var callback = require('./routes/callback');
var user = require('./routes/user');
var artists = require('./routes/artists');
var playlists = require('./routes/playlists');
var playlist_tracks = require('./routes/playlist-tracks');
var audio_features = require('./routes/audio-features');
var top = require('./routes/top');

var app = express();

// Requirements
var SpotifyWebApi = require('../spotify-web-api-node');
async = require('async');
_ = require('lodash');
var NodeCache = require('node-cache');
cache = new NodeCache();
cacheKeys = {
	artists: "followedArtists",
	user: "user",
  playlists: "playlists"
};
request = require('request'); // "Request" library

// Spotify Web API
spotifyApi = new SpotifyWebApi({
  clientId: '0d94ee65de4c4b8dbf5283aec28c5542', // Your client id
  clientSecret: '499d8375d88240dfaaa4d25dda970750', // Your secret
  redirectUri: 'http://localhost:8888/callback', // Your redirect uri
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// CORS
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
  // 'http://www.myproductionurl.com'
];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    console.log('Allowing');
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else{
    console.log('Denying');
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
var corsOptions = {
  origin: true,
  credentials: true
}

const options = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  // credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: true,
  preflightContinue: true
};

app.use(cors(options));
router.options("*", cors(options));

app.use('/', index);
app.use('/login', login);
app.use('/callback', callback);
app.use('/user', user);
app.use('/artists', artists);
app.use('/playlists', playlists);
app.use('/playlist-tracks', playlist_tracks);
app.use('/audio-features', audio_features);
app.use('/top', top);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(8888, () => console.log('Example app listening on port 8888!'))
