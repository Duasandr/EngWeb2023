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
            console.log("chunk: " + chunk)
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
var tasksServer = http.createServer(function (req, res) {
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
                            writeResponse(res, 200, templates.mainPage(tasks, date))
                        })
                        .catch(error => {
                            console.log("Error: " + error)
                            writeResponse(res, 200, templates.errorPage(200, "Unable to collect tasks ", date))
                        })
                }
            break   
            case "POST":
                // POST /tasks -------------------------------------------------------------------
                if(req.url == '/submitTask'){
                    collectRequestBodyData(req, result => {
                        if(result){    
                            console.dir(result)

                            if(result.who == "" || result.what == "" || result.dueDate == ""){
                                console.log("Unable to collect data from body.")

                                writeResponse(res, 201, templates.errorPage(201, "Unable to collect data from body. Empty fields.", date))
                                return
                            }

                            if(result.dueDate < date){
                                console.log("Unable to collect data from body.")

                                writeResponse(res, 201, templates.errorPage(201, "Date must be in the future.", date))
                                return
                            }

                            // Check a user is in the database
                            axios.get(JSON_SERVER_URL + "users/?name=" + result.who)
                            .then(response => {
                                // If user is not in the database
                                if(response.data.length == 0){
                                    console.log("Unable to find user: " + result.who)

                                    writeResponse(res, 201, templates.errorPage(201, "Unable to find user: " + result.who, date))
                                    return
                                }
                                
                                console.log("User found: " + response.data)

                                // Insert task in the database
                                axios.post(JSON_SERVER_URL + "tasks", result)
                                    // If task is inserted in the database
                                    .then(response => {
                                        console.log("Task submited: " + response.data)

                                        writeResponse(res, 201, templates.taskPostConfirmPage(result, date))
                                    })
                                
                                    // If task is not inserted in the database
                                    .catch(error => {
                                        console.log("Unable to submit task. Error: " + error)
                                    
                                        writeResponse(res, 201, templates.errorPage(201, "Unable to add task.", date))
                                    
                                    })  
                                
                            })
                            // If user is not in the database
                            .catch(error => {
                                console.log("Unable to collect users data. Error: " + error)

                                writeResponse(res, 201, templates.errorPage(201, "Unable to find user: " + data.who, date))
                                
                            })

                            return
                        }
                        
                        // If no data is collected
                        writeResponse(res, 201,  templates.errorPage(201, "Unable to collect data", date))
                        
                    })

                    return
                }
                if(req.url == '/submitDone'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            // Delete old entry
                            axios.delete(JSON_SERVER_URL + "tasks/" + result.id)
                            .then(response => {
                                console.log("Task deleted")
                                
                                // Update task
                                axios.post(JSON_SERVER_URL + "tasks", result)
                                .then(response => {
                                    console.log("Task submited")

                                    writeResponse(res, 201, templates.taskPostConfirmPage(result, date))
                                })
                                .catch(error => {
                                    console.log("Unable to submit task. Error: " + error)

                                    writeResponse(res, 201, templates.errorPage(201, "Unable to update task.", date))
                                })
                            })
                            .catch(error => {
                                console.log("Unable to delete task. Error: " + error)

                                writeResponse(res, 201, templates.errorPage(201, "Unable to update task.", date))
                            })
                        }
                    })
                }
                else{
                    writeResponse(res, 201, templates.errorPage(201, "Unsupported request", date))
                }
                break
            default: 
                writeResponse(res, 201, templates.errorPage(201, "Unsupported request", date))
        }
    }
    
})

tasksServer.listen(7777, ()=>{
    console.log("Server listening on port 7777...")
})



