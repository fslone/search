var restify = require("restify"),
    fs = require("fs");

function init() {
	_start(80, 443, "localhost");
	_registerRestCalls();
}

function _start(port, sslPort, serverIpAddress) {
  
  if (serverIpAddress === undefined) serverIpAddress = "localhost";
  
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
  _server.use(passport.initialize());

  _server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
  });

  //handle unknown methods
  _server.on('MethodNotAllowed', __unknownMethodHandler);
    key: fs.readFileSync('./server-key.pem'),
    certificate: fs.readFileSync('./server-cert.pem'),
    name: "Titan - HTTPS",
    version: "1.0.0"
  });

  function __unknownMethodHandler(req, res) {
    if (req.method.toLowerCase() === 'head') {
      var allowHeaders = ['Accept', 'Accept-Version', 'Content-Type', 'Api-Version'];

      if (res.methods.indexOf('HEAD') === -1) res.methods.push('HEAD');

      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
      res.header('Access-Control-Allow-Methods', res.methods.join(', '));
      res.header('Access-Control-Allow-Origin', req.headers.origin);

      return res.send(204);
    }
    else
      return res.send(new restify.MethodNotAllowedError());
  }

  //start listening on specified port
  _server.listen(port, function () {

    _server.on("connection", function(client) {
      _allClients.push(client);
    });

    _server.on("close", function() {
      console.log("http closed");
    });
  });

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

//https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl
