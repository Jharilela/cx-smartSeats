// var http = require("http");
// http.createServer(function (request, response) {
// 	response.writeHead(200, {'Content-Type' : 'text/plain'});

// 	response.end('hello world\n');
// }).listen(8080, '0.0.0.0')
// console.log("server running at http:/127.0.0.1:8081/");

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var fs = require("fs");

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

app.get('/getSeatBookings', function (req, res) {
	console.log('params')
   	console.log(req.query)
   fs.readFile( __dirname + "/" + "seatBookings.json", 'utf8', function (err, data) {
      res.writeHead(200, {'Content-Type' : 'text/plain'});
      res.end( data );
   });
})

app.post('/addPassenger', function(req,res){
	var dataReceived = req.query;
	dataReceived.row = eval(dataReceived.row)
	dataReceived.col = eval(dataReceived.col)
	dataReceived.talking = eval(dataReceived.talking)
	console.log(dataReceived)

	fs.readFile(__dirname + "/" + "seatBookings.json", 'utf8', function (err, data) {
	   if (err) {
	      return console.error(err);
	   }
	   data = JSON.parse(data)
	   console.log("Asynchronous read: " + typeof data + " -> ");
	   console.log(data.passengerSeats[0])

	   console.log("Data read successfully!, adding data");

	   data.passengerSeats.push(dataReceived);
	   console.log('new data')
	   console.log(data)
	   console.log("Let's write newly written data");
	   fs.writeFile(__dirname + "/" + "seatBookings.json", data,  function(err) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("write successful")
	   });
	});

	res.end("data received")
})

var server = app.listen(8080, '0.0.0.0', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})