var socket = require('socket.io');
express = require('express');
http = require('http');


// Implementing ExpressJS
var app = express();

// Create virtual HTTP Server
var http_server = http.createServer(app).listen(3001);

// Funtion to emit newly uploaded image to socket
function emitNewImage(server){
    var io  = socket.listen(server);
    console.log('Socket Server > Initialized . ');
    io.sockets.on('connection', function(socket){

        socket.on("new_image",function(data){

            io.emit("new_image",data);
            //console.log(data);
            
        })

    })

}

emitNewImage(http_server);