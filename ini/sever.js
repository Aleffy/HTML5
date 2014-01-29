var io = require('socket.io').listen(4242);

io.sockets.on('connection', function (socket) {
	console.log("A socket has connected!");
});