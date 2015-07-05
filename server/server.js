(function() {
  var restify = require("restify"),
      fs = require("fs"),
      Twitter = require("twitter-node-client").Twitter,
      request = require("request");

  var _server;
      
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

    //start listening on specified port
    _server.listen(port);

    _registerRestCalls();

    _server.get(/\/?.*/, restify.serveStatic({
      directory: "../client",
      default: "index.html"
    }));


  }

  function _registerRestCalls() {

    _server.get("/restapi/GetTweets", __getTweets);

    _server.get("/restapi/GetWikis", __getWikis);

    function __getTweets(req, res, next) {

      var config, twitter, success, error, results;

      var error = function (err, response, body) {
        console.log("ERROR [%s]", err);
      };
      success = function (data) {
        res.setHeader("Content-Type", "application/json");
        res.send(data);
      };
 
      config = {
        "consumerKey": "teATP6CzUAiHY5YkgTSgmMShy",
        "consumerSecret": "IwzdFOVGibCqPoFPOVnHQQ9c50BnoPJFUCbFl6fVrHvnJiB0j0",
        "accessToken": "3187974576-OunyzrPMhm3fw7yESmK6wNvQ4jQHHX7Gnp6gU7w",
        "accessTokenSecret": "bdG98MerHAKwNywr4aXHO4er4hQcD1601J0UgNO9aGZWS",
        "callBackUrl": ""
      };
   
      twitter = new Twitter(config);

      twitter.getSearch({"q":req.params.query, "count": 10, "result\_type":"popular"}, error, success);
      
    }

    function __getWikis(req, res, next) {

    	var query, url;

      query = req.params.query;
      url = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=" + query
      request.get(url, function(error,response,body){
        
        if(error) console.log(error);
        else res.send(response);

      });

    }

  }

  return _init();

}());