/**
 * Created by taowang on 11/20/2016.
 */
var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (request, response) {
    //a reminder
    console.log('Request for ' + request.url + ' by method ' + request.method);

    if (request.method === 'GET') {
        var fileUrl;

        if (request.url === '/') fileUrl = '/index.html';
        else fileUrl = request.url;   //Note that request.url is an absolute path!!!!!!!!!!!!!!!!!!!
        console.log(fileUrl); //for debugging

        //var filePath = path.resolve('public' +  fileUrl);  works perfectly too!!!!!!!!!!!!!!!!
        var filePath = path.resolve('./public' +  fileUrl); //('./public', fileUrl) is wrong, because fileUrl is an absolute path!!!!!!!!!!!
        console.log(filePath); //for debugging
        var fileExt = path.extname(filePath);
        if (fileExt === '.html') {
            fs.exists(filePath, function (exist) {   //exists() rather than exist()
                if (!exist) {
                    response.writeHead(404, {'Content-type': 'text/html'});
                    response.end("<html><body><h1>Error:404 :" + fileUrl + " not found</h1></body></html>");
                }
                else {
                    response.writeHead(200, {'Content-type': 'text/html'});
                    fs.createReadStream(filePath).pipe(response);
                }
            })
        }
        else {
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    }
    else{
        response.writeHead(404, {'Content-Type': 'text/html'});
        response.end('<html><body><h1>Error 404: ' + request.method +
            ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`); //string template only supported by ECMAscript6 specification
});