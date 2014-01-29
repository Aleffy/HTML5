function player (props) {
	if(props.username !== undefined) this.username = props.username;
}
Player.prototype.sayHi = function () {
	console.log("Hi! I am " +this.username);
}
Player.prototype.username = "Anonynouse";
//var io = require('./Player');
module.exports = Player;

/*
//objecto nuevo:
exports = {
	num: 85
};
*/