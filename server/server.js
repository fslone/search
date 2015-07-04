(function() {
  var restify = require("restify"),
      fs = require("fs");

  function _init() {
  	_start();
  	_registerRestCalls();
  }

  function _start() {
    
    var port = process.env.PORT || 3000;
    
    //start server
    _server = restify.createServer({
      name: "Search Server",
      version: "0.0.0"
    });

    _server.use(restify.acceptParser(_server.acceptable));
    _server.use(restify.gzipResponse());
    _server.use(restify.jsonBodyParser());
    _server.use(restify.queryParser());
    _server.use(restify.fullResponse());

    _server.opts(/.*/, function (req, res, next) {
      res.send(200);
      next();
    });

    //start listening on specified port
    _server.listen(port);

    _server.get(/\/?.*/, restify.serveStatic({
      directory: "client",
      default: "index.html"
    }));

  }

  function _registerRestCalls() {

    _server.get("restapi/GetTweets", __getTweets);

    _server.get("restapi/GetWikis", __getWikis);

    function __getTweets(req, res, next) {

    	var query = req.params.query;

    	// https://api.twitter.com/1.1/search/tweets.json?q=football
   
    }

    function __getWikis(req, res, next) {

    	var query = req.params.query;

    	//
      
    }

  }
  return _init();
  //https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl
}());