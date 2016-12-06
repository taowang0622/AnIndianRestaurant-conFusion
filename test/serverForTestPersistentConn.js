/**
 * Created by taowang on 11/25/2016.
 */
require('net').createServer(function (sock) {
    sock.on('data', function (data) {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('content-length: 12\r\n');  //content-length is stated in bytes!!!!!
        //below is the response body!!!
        sock.write('\r\n');
        sock.write('hello world!'); //12 characters===> 12 bytes!!!!
        // sock.destroy(); //Comment out this line for turning to persistent connection
    })
}).listen(9090, '127.0.0.1');