const path = require('path');
require('dotenv').config({
	path: path.join(__dirname + '/config/' + 'dev.env'),
});
const mongoose = require('mongoose');

const MessageService = require('./services/message-service');
const message_service = new MessageService();

const io = require('socket.io')();
const port = process.env.SOCKET_PORT || 8000;

const connection = [];

io.sockets.on('connection', (socket) => {
	console.log('Succesfull connection');
	connection.push(socket);

	socket.on('create', async (room) => {
		socket.join(room);
		console.log(`You are in room: ${room}`);
	});

	socket.on('send message in Room', (data) => {
		try {
			socket.join(data.dialogId);
			io.sockets.to(data.dialogId).emit('add message in room', {
				message: data.message,
				name: data.name,
				ownerId: data.ownerId,
				dialogId: data.dialogId,
			});
			message_service.add(data);
		} catch (error) {
			console.log('Error in index.js', error);
		}
	});

	socket.on('leave', (room) => {
		socket.leave(room);
		console.log(`You are leaving room: ${room}`);
	});

	socket.on('disconnect', (data) => {
		connection.splice(connection.indexOf(socket), 1);
		console.log('Disconnect');
	});

	socket.on('send message', (data) => {
		io.sockets.emit('add message', {
			message: data.message,
			name: data.name,
			ownerId: data.ownerId,
		});
	});
});

// io.listen(port);
// console.log('listening on port ', port);

async function start() {
	try {
		await mongoose.connect(process.env.SOCKET_MONGO_DB, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});

		io.listen(port);
		console.log('listening on port ', port);
	} catch (error) {
		console.log(error);
	}
}

start();
