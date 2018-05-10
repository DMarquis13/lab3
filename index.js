const vision=require('vision');


//add
const https=require('https');

//import { request } from 'http';

'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

const url = "https://swapi.co/api/starships/?format=json";

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return'<h1>You have reached the homepage</h1>';
    }
});

// Add the content.html route
https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
        body += data;
    });

    var data = res.on("end", () => {
        body = JSON.parse(body);
        // body.forEach(x=>console.log(x.job_category));

        server.route({

            method:'GET',
            path:'/content.html',
            handler: function(req,h) {
                return h.view('content', {dataOutput : body.results});
            }
        })
    })
})

// Start the server
async function start() {
    await server.register(vision);
    server.views({
        engines:{
            html: require('handlebars')
        },
        relativeTo: __dirname

    });

    await server.register(vision);

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();