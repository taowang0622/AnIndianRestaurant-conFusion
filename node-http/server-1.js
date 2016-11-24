/**
 * Created by taowang on 11/20/2016.
 */
var http = require('http');

var hostName = '127.110.0.1';
var port = '3000';

var server = http.createServer(function (request, response) {
    console.log(request.headers);

    response.writeHead(200, {'Content-type': 'text/html'});
    response.end('<html><body><h1>Hello World</h1></body></html>')
});

server.listen(port, hostName, function () {
    //TODO get the knowledge of ${}, and for here it does not work somehow
    console.log('Server running at http://${hostname}:${port}/');
});