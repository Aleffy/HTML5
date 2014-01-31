
var io = require('socket.io').listen(4242);
io.set('log level', 1);

function Player(id, username) {
	this.id = id;
	this.username = username;
	this.score = 0;
}
var players = {};
var canvasPainted = false;

function get_random_color() {
    		var letters = '0123456789ABCDEF'.split('');
    		var color = '#';
   			for (var i = 0; i < 6; i++ ) {
        		color += letters[Math.round(Math.random() * 15)];
    		}
    		return color;
}

var currentColor;

function paintCanvas (color) {
	canvasPainted = true;
	currentColor = color;
	io.sockets.emit('pintar', color);
}

io.sockets.on('connection', function (socket) {

	//players = {id1: {}, id2: {}, id3: {}}

	socket.emit("pintar", currentColor);
	for (var id in players) {
		socket.emit('update', players[id])
	}
	socket.on('setusername', function (username) {
	
	// Crea el nuevo cubo y lo envía a todos
		var player = new Player (socket.id, username);
		players[socket.id] = player;
		console.log(player);
		io.sockets.emit('update', player);
	});
	
	socket.on('hit', function () {
		if (canvasPainted) {
			paintCanvas("white");
			canvasPainted = false;

			setTimeout(function () {
				paintCanvas(get_random_color());
			}, 10*1000*Math.random());

			players[socket.id].score += 30;
			io.sockets.emit('update', players[socket.id]);

		}
		else {
			players[socket.id].score -= 5;
			io.sockets.emit('update', players[socket.id]);
		}

	});

	socket.on('disconnect', function () {
		console.log(players[socket.id].username + " has disconnected from the server!");
		delete players[socket.id];
		io.sockets.emit('PlayersDisconnect', socket.id);
	});

});

paintCanvas(get_random_color());