/*
 * Project: Qsolver
 * Module: webserver
 * Desctiption: Simple webserver who works like a proxy
 * Copyright(c) 2020 Leandro Silva
 * License: MIT Licensed
 */


const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res)=>{
       
    const headers = {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods' : 'OPTIONS, POST, GET',
        'Access-Control-Max-Age' : 2592000,
        'Content-type' : 'text/html'
        
    }

res.writeHead(200, headers);    

 if(['GET','POST'].indexOf(req.method) > -1){
      
        switch(req.url){
        
           case '/':
                fs.readFile('static/index.html', 'utf8', (error, home)=>{
                res.writeHead(200, {"Content-Type" : "text/html"});
                res.write(home)
                res.end();

           });
          
           break;
            
           case '/process' : 
                 req.on('data', (chunk)=>{
                 console.log('[req.on] Recebi: ' + chunk);
                                  
                requestService(chunk)
                 .then((result)=>{
                        console.log("req.on.result: " + result);
                        res.write(result); // Aqui eh o retorno para o xhr
                        res.end();
                 })
                 .catch((error)=>{
                     console.log("[on.data] error: " + error) 
                     res.write("deu erro: " + error);
                     res.end();  
                 });
              }); 

            break;

            case '/scripts.js' :
                    fs.readFile('static/scripts.js', 'utf8', (error, home)=>{
                    res.writeHead(200, {"Content-Type" : "text/javascript"});
                    res.write(home); // redundante, mas best pratice por causa que no http.request eh obrigatorio o uso de end().
                    res.end();
                    });
            break

            case '/style.css' :
                    fs.readFile('static/style.css', 'utf8', (error, home)=>{
                    res.writeHead(200, {"Content-Type" : "text/css"});
                    res.write(home)
                    res.end();
                    });
            break

        }
    }

    req.on('error', (error)=>{
        console.log('Deu erro: ' + error);
    });

    res.on('close' , ()=>{
        console.log('on.close');
    })
    
});

async function requestService(data){
 
    requestObj = JSON.parse(data);  // refatorar isso, se nao usar stringfy da erro de parse no molecular por causa de \n \t \b etc...

    rota = `/api/${requestObj['op']}/solver`;
    expr = JSON.stringify({'expr': requestObj['expr']}); 
   
    // API GATEWAY connection details.
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: rota,
        method: 'POST',
        headers : {
           'Content-Type' : 'application/json' // obrigatorio
        }
    };
    

    return new Promise((resolve, reject)=>{
           req = http.request(options, (res)=>{
                 res.on('data', (chunk) => {
                    resolve(chunk)
                });
            });
        req.write(expr); // executa a request.
        req.end(); // obrigatorio.      
    });

}




server.listen(3015);
console.log('Server running on port 3015');

