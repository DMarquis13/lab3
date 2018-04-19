import { request } from 'http';

'use strict';

const Hapi=require('hapi');

// Create a server with a host and port
const server=Hapi.server({
    host:'localhost',
    port:8000
});

// Add the route
server.route({
    method:'GET',
    path:'/',
    handler:function(request,h) {

        return'<h1>You have reached the homepage</h1>';
    }
});

// Add the content.html route
server.route({
    method: 'GET',
    path: '/content.html',
    handler:function (request,h) {
        return'<h1> You have reached the content page </h1>';
    }
});

// Start the server
async function start() {

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