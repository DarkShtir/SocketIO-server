const path = require('path');
require('dotenv').config({ path: './config/dev.env' });
const io = require('socket.io')();
const port = process.env.PORT || 8000;

const connection = [];

io.sockets.on('connection', socket => {
	console.log('Succesfull connection');
	connection.push(socket);

	socket.on('disconnect', data => {
		connection.splice(connection.indexOf(socket), 1);
		console.log('Disconnect');
	});

	socket.on('send message', data => {
		io.sockets.emit('add message', {
			message: data.message,
			name: data.name,
			ownerId: data.ownerId,
			// className: data.className,
		});
	});
});

// const chat = io
// .of('/chat')
// .on('connection', socket => {
// 	socket.emit('a message', {
// 		that: 'only'
// 		'/chat':'will get'
// 	});

//events for client
// client.on('subscribeToTimer', interval => {
// 	console.log('client is subscribing to timer with interval ', interval);
// 	setInterval(() => {
// 		client.emit('timer', new Date());
// 	}, interval);
// });
// });

io.listen(port);
console.log('listening on port ', port);
