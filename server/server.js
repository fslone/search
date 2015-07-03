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

  	//http://en.wikipedia.org/w/api.php?action=query&list=search&format=json&srsearch=Albert%20Einstein

    
  }

}

/** wikipedia rest return example
{
    "warnings": {
        "query": {
            "*": "Formatting of continuation data has changed. To receive raw query-continue data, use the 'rawcontinue' parameter. To silence this warning, pass an empty string for 'continue' in the initial query."
        }
    },
    "batchcomplete": "",
    "continue": {
        "sroffset": 10,
        "continue": "-||"
    },
    "query": {
        "searchinfo": {
            "totalhits": 4242
        },
        "search": [{
            "ns": 0,
            "title": "Albert Einstein",
            "snippet": "&quot;<span class=\"searchmatch\">Einstein</span>&quot; redirects here. For other uses, see <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (disambiguation) and <span class=\"searchmatch\">Einstein</span> (disambiguation). <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> (/\u02c8\u00e6lb\u0259rt \u02c8a\u026an\u0283ta\u026an/; German:",
            "size": 124744,
            "wordcount": 13389,
            "timestamp": "2015-07-03T09:46:19Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein Medal",
            "snippet": "The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Medal is an award presented by the <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Society in Bern. First given in 1979, the award is presented to people for &quot;scientific",
            "size": 2280,
            "wordcount": 207,
            "timestamp": "2015-04-15T03:03:46Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein Peace Prize",
            "snippet": "The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Peace Prize is given yearly by the Chicago-based <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Peace Prize Foundation. Winners of the prize receive $50,000. Past",
            "size": 1929,
            "wordcount": 160,
            "timestamp": "2014-04-16T07:07:05Z"
        }, {
            "ns": 0,
            "title": "List of things named after Albert Einstein",
            "snippet": "<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span>.   Bose\u2013<span class=\"searchmatch\">Einstein</span> condensate Bose\u2013<span class=\"searchmatch\">Einstein</span> statistics <span class=\"searchmatch\">Einstein</span>'s constant <span class=\"searchmatch\">Einstein</span>'s radius of the universe <span class=\"searchmatch\">Einstein</span> (unit) <span class=\"searchmatch\">Einstein</span> coefficients",
            "size": 6202,
            "wordcount": 648,
            "timestamp": "2015-07-03T12:16:40Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein Award",
            "snippet": "The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Award (sometimes mistakenly called the <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Medal because it was accompanied with a gold medal) was an award in theoretical",
            "size": 6073,
            "wordcount": 560,
            "timestamp": "2015-03-05T14:48:44Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein House",
            "snippet": "The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> House at 112 Mercer Street in Princeton, Mercer County, New Jersey, United States was the home of <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> from 1936 until",
            "size": 4612,
            "wordcount": 350,
            "timestamp": "2015-06-26T12:36:57Z"
        }, {
            "ns": 0,
            "title": "Max Planck Institute for Gravitational Physics",
            "snippet": "Gravitational Physics (<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Institute) is a Max Planck Institute whose research is aimed at investigating <span class=\"searchmatch\">Einstein</span>\u2019s theory of relativity and",
            "size": 2681,
            "wordcount": 282,
            "timestamp": "2015-06-06T20:29:07Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein College of Medicine",
            "snippet": "/ \ufeff40.850852\u00b0N 73.844949\u00b0W\ufeff / 40.850852; -73.844949 <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> College of Medicine (<span class=\"searchmatch\">Einstein</span>) is a graduate school of Yeshiva University. It is a",
            "size": 32825,
            "wordcount": 3836,
            "timestamp": "2015-05-19T17:55:13Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein School",
            "snippet": "<span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> School may refer to: <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> College of Medicine, the Bronx, New York, a graduate school of Yeshiva University <span class=\"searchmatch\">Albert</span>-Einstein-Schule",
            "size": 982,
            "wordcount": 130,
            "timestamp": "2013-12-20T19:10:12Z"
        }, {
            "ns": 0,
            "title": "Albert Einstein Memorial",
            "snippet": "The <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> Memorial is a monumental bronze statue depicting <span class=\"searchmatch\">Albert</span> <span class=\"searchmatch\">Einstein</span> seated with manuscript papers in hand by sculptor Robert Berks. It",
            "size": 6715,
            "wordcount": 766,
            "timestamp": "2014-11-13T18:44:10Z"
        }]
    }
}
*/

//https://api.twitter.com/1.1/search/tweets.json?q=%23superbowl
