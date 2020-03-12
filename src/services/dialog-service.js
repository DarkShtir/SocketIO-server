const Dialog = require('../models/dialog-model');

class DialogService {
	constructor() {}

	create = async function(body) {
		const dialog = new Dialog(body);
		try {
			await dialog.save();
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method create');
			throw error;
		}
	};

	getById = async function(id) {
		try {
			const dialog = await Dialog.findById(id);
			// if (dialog === null) {
			// 	return null;
			// }
			// if (!dialog && dialog !== null) {
			// 	throw new Error(`Диалога с данным ID ${id}, не найдено!!!`);
			// }
			return dialog;
		} catch (error) {
			console.log('Error in Dialog service, method getById');
			throw error;
		}
	};
}

module.exports = DialogService;
