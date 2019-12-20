const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: false
	}
});

const Note = mongoose.model("Note", NoteSchema);
module.exports = Note;