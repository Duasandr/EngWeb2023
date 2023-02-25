var http = require('http');
var fs = require('fs');
var url = require('url');

// Creates HTTP server 
var myServer = http.createServer(function (req, res) {
    // Gets the request URL
    var request = url.parse(req.url, true).pathname

    // Gets date of request removing the time
    var d = new Date().toISOString().substring(0, 16);
    console.log(req.method + " " + req.url + " " + d);

    // If the request is for the root, returns the index.html
    if(request == '/') {
        request = 'index.html';
        console.log('Request for root', request);
    }
    else {
        // If the request is for a city, returns the city_id.html
        request ='cities/' +  request.substring(1) + '.html';
        console.log('Request for city', request);
    }

    // Reads the file and returns the content
    fs.readFile(request, function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        
        if(err) {
            console.log('Error reading file: ' + err);
            res.write('Error reading file: ' + err);
        }
        else {
            console.log('File read successfully');
            res.write(data);
        }

        // Ends the response
        res.end();
    });
});

// Starts the server
myServer.listen(7777);

// Prints the server launch message
console.log('Server launched at localhost:7777. Ctrl+C to terminate...');