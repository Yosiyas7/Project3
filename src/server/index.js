var app = require('http').createServer();   // Creating an HTTP server
var io = module.exports.io = require('socket.io')(app);   // Creating a Socket.IO server instance and exporting it

const PORT = process.env.PORT || 3231;   // Setting the port number

const SocketManager = require('./SocketManager');   // Importing the SocketManager module

io.on('connection', SocketManager);   // Handling socket connection events using SocketManager

app.listen(PORT, () => {
    console.log("Connected to port: " + PORT);   // Starting the server and logging the connection to the specified port
});
