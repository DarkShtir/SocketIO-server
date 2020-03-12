const Message = require('../models/message-model');

class MessageService {
	constructor() {}

	add = async function(body) {
		const message = new Message(body);
		try {
			await message.save();
			return message;
		} catch (error) {
			console.log('Error in Message service, method add');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			const message = await Message.findById(id);
			if (!message) {
				throw new Error(`Сообщения с данным ID ${id}, не найдено!!!`);
			}
			return message;
		} catch (error) {
			console.log('Error in Message service, method getById');
			throw error;
		}
	};
	getAllMessagesByDialogId = async function(id) {
		try {
			return await Message.find({ dialogId: id });
		} catch (error) {
			console.log('Error in Message service, method getAllMessagesByDialogId');
			throw error;
		}
	};
}

module.exports = MessageService;
