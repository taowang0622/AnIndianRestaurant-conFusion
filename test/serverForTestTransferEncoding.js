/**
 * Created by taowang on 11/25/2016.
 */
/**
 * Created by taowang on 11/25/2016.
 */
require('net').createServer(function (sock) {
    sock.on('data', function (data) {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('transfer-encoding: chunked\r\n');
        sock.write('\r\n');

        sock.write('b\r\n');
        sock.write('01234567890\r\n');

        sock.write('5\r\n');
        sock.write('12345\r\n');

        sock.write('0\r\n');
        sock.write('\r\n');
    })
}).listen(9091, '127.0.0.1');