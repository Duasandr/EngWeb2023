var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

const JSON_SERVER_URL = "http://localhost:3000/"

// Aux functions
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Aux function to write response
function writeResponse(res, code, content){
    res.writeHead(code, {'Content-Type': 'text/html;charset=utf-8'})
    res.write(content)
    res.end()
}


/**
 * Server to handle requests
 */
var alunosServer = http.createServer(function (req, res) {
    // Log request
    var date = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + date)

    // Handling request
    if(static.staticResource(req)){
        // Serve static resource
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
            // Main page    
            if((req.url == "/")){
                    axios.get(JSON_SERVER_URL + "tasks")
                        .then(response => {
                            var tasks = response.data
                            // Add code to render main page 
                            writeResponse(res, 200, templates.mainPage(tasks, date))
                        })
                        .catch(function(erro){
                            writeResponse(res, 200, templates.errorPage("Unable to collect tasks", date))
                        })
                }
            break   
            case "POST":
                if(req.url == '/submit'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/alunos', result)
                                .then(resp => {
                                    console.log(resp.data);
                                    writeResponse(res, 201, "<p>Task submited<p>")
                                })
                                .catch(error => {
                                    console.log('Erro: ' + error);
                                    writeResponse(res, 500, templates.errorPage("Unable to insert record...", date))
                                });
                        }
                        else{
                            writeResponse(res, 201, "<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                else{
                    writeResponse(res, 201, "<p>Unsupported POST request...</p>")
                }
                break
            default: 
                writeResponse(res, 201, "<p>Unsupported request...</p>")
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



