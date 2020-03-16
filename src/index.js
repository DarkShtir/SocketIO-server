const path = require('path');
require('dotenv').config({ path: './config/dev.env' });
const mongoose = require('mongoose');

const MessageService = require('./services/message-service');
const message_service = new MessageService();

const io = require('socket.io')();
const port = process.env.PORT || 8000;

const connection = [];

io.sockets.on('connection', socket => {
	console.log('Succesfull connection');
	connection.push(socket);

	socket.on('create', async room => {
		socket.join(room);
		console.log(`You are in room: ${room}`);
		// const messages = await message_service.getAllMessagesByDialogId(room);
		// socket.to(`${room}`).emit('add message', messages);
		// console.log('Enter');
		// console.log('Rooms', socket.adapter.rooms);
	});

	socket.on('send message in Room', data => {
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

	// socket.on('get messages from Room', async room => {
	// 	try {
	// 		socket.join(room);
	// 		const messages = await message_service.getAllMessagesByDialogId(room);
	// 		socket.to(`${room}`).emit('add message from room', messages);
	// 	} catch (error) {
	// 		console.log('Error in index.js', error);
	// 	}
	// });

	socket.on('leave', room => {
		socket.leave(room);
		console.log(`You are leaving room: ${room}`);
		// console.log('Rooms', socket.adapter.rooms);
		// console.log('Exit');
	});

	socket.on('disconnect', data => {
		connection.splice(connection.indexOf(socket), 1);
		console.log('Disconnect');
	});

	socket.on('send message', data => {
		io.sockets.emit('add message', {
			message: data.message,
			name: data.name,
			ownerId: data.ownerId,
			// dialogId: 'chat-room',
		});
		// message_service.add(data);
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

async function start() {
	try {
		await mongoose.connect(process.env.MONGO_DB, {
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
