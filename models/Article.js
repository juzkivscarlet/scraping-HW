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

const ArticleSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	link: {
		type: String,
		required: true
	},
	subtitle: {
		type: String,
		required: false
	},
	image: {
		type: String,
		required: false
	},
	note: [NoteSchema]
});

const Article = mongoose.model("Article", ArticleSchema);
const Note = mongoose.model("Note", NoteSchema)
module.exports = {
	article: Article,
	note: Note
};