const path = require('path');
require('dotenv').config({ path: './config/' + process.env.ENV + '.env' });
const io = require('socket.io')();
const port = process.env.PORT || 8000;

io.on('connection', client => {
	//events for client
	client.on('subscribeToTimer', interval => {
		console.log('client is subscribing to timer with interval ', interval);
		setInterval(() => {
			client.emit('timer', new Date());
		}, interval);
	});
});

io.listen(port);
console.log('listening on port ', port);
