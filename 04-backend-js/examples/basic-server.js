'use strict';
// var http = require('http'); // Esto es con ComonJS
import http from 'http'; // Esto es con ESModules

var server = http.createServer(function(request, response) {
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.end('Servidor HTTP básico funcionando!!!');
});

server.listen(3000, function() {
    console.log("Server ready on http://localhost:3000");
});