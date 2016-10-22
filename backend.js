// var http = require("http");
// http.createServer(function (request, response) {
// 	response.writeHead(200, {'Content-Type' : 'text/plain'});

// 	response.end('hello world\n');
// }).listen(8080, '0.0.0.0')
// console.log("server running at http:/127.0.0.1:8081/");

var express = require('express');
var app = express();
var fs = require("fs");

app.get('/getSeatBookings', function (req, res) {
   fs.readFile( __dirname + "/" + "seatBookings.json", 'utf8', function (err, data) {
   	  //var dats = JSON.parse( data )
   	  console.log('dats[1]')
      console.log( data );
      res.end( data );
   });
})

var server = app.listen(8080 '0.0.0.0', function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})