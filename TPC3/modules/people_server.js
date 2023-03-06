const http = require('http')
const axios = require('axios')
const mypages = require('./my_pages')
const fs = require('fs')

const SERVER_PORT = 8888
const JSON_SERVER_URL = 'http://localhost:3000/pessoas/'
const CONTENT_TYPE_HTML = 'text/html; charset=utf-8'

// Function to generate an error response
errorResponse = function (res, err) {
    console.log("Error: " + err)
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    
    res.end('<p>Error: ' + err + '</p>')
}


const server = http.createServer((req, res) => {
    var date = new Date().toISOString().substring(0, 10)
    console.log(req.method + ' ' + req.url + ' ' + date)


    if(req.url == '/') {
        res.writeHead(200, { 'Content-Type': CONTENT_TYPE_HTML })   
        
        // Generates the index page
        res.end(mypages.genIndexPage(date, SERVER_PORT))
    }
    // Serves the HTML page with the list of people
    if(req.url == '/pessoas') {
        axios.get(JSON_SERVER_URL)
        .then(resp => {
            var people_list = resp.data
            console.log("People: " + people_list.length + " records.")
            
            // Sorts the list of people by name in descending order. Accents appear last.
            let people_list_sorted = people_list.sort((p1, p2) => (p1.nome < p2.nome) ? -1 : 1)
            
            res.writeHead(200, { 'Content-Type': CONTENT_TYPE_HTML })
            
            // Generates the people list page
            res.end(mypages.genPeoplePage(people_list_sorted, date, SERVER_PORT))
        })
        .catch(err => errorResponse(res, err))
    }
    // Serves the HTML page for a specific person
    else if(req.url.match(/p\d+/)) {
        axios.get(JSON_SERVER_URL + req.url.substring(9))
        .then(resp => {
            var person = resp.data
            console.log("Person retrieved: " + person.nome)

            res.writeHead(200, { 'Content-Type': CONTENT_TYPE_HTML })
            res.end(mypages.genPersonPage(person, date, SERVER_PORT, SERVER_PORT))
        })
        .catch(err => errorResponse(res, err))
    }
    // Not working. Don't know how async works in JS
    else if(req.url.match("/genderDist")) {
        var distribution = {
            f: 0,
            m: 0,
            o: 0
        }
    
        
        axios.get(JSON_SERVER_URL + "?sexo=feminino")
        .then(resp => {
            distribution.f = resp.data.length 
            console.log("Female: " + resp.data.length)
        })
        .catch(err => errorResponse(res, err))

        axios.get(JSON_SERVER_URL + "?sexo=masculino")
        .then(resp => {
            distribution.m = resp.data.length 
            console.log("Male: " + resp.data.length)
        })
        .catch(err => errorResponse(res, err))

        axios.get(JSON_SERVER_URL + "?sexo=outro")
        .then(resp => {
            distribution.o = resp.data.length 
            console.log("Other: " + resp.data.length)
        })
        .catch(err => errorResponse(res, err))

        console.log("Distribution: " + JSON.stringify(distribution))
        res.writeHead(200, { 'Content-Type': CONTENT_TYPE_HTML })
        res.end(mypages.genGenderDistPage(distribution, date, SERVER_PORT))
    }
    // Serves the CSS file
    else if(req.url == '/w3.css') {
        fs.readFile('w3.css', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/css' })
            
            if (err) {
                errorResponse(res, err)
            }
            else {
                res.write(data);
            }

            res.end()
        })
        
    }
    else {
        res.writeHead(404, { 'Content-Type': CONTENT_TYPE_HTML })
        res.end('<p>operation not supported...</p>')
    }
})

server.listen(SERVER_PORT)

console.log('Server listening on port ' + SERVER_PORT + '.')
