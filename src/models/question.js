const mongoose = require('mongoose');

// These are predefined topics which a question can have.
const TopicsEnum = ['top-colleges', 'qualifying-criteria'];

// These are predefined tags which a question can have.
const TagsEnum = [
    'stanford-university', 
    'usa',
	'admission',
	'engineering',
	'top',
]


const questionSchema = new mongoose.Schema({
	query: {
		type: String,
		unique: true,
		required: true,
	},
	topic: {
		type: String,
		enum: TopicsEnum,
		required: true
	},
	tags: [{
		type: String,
		enum: TagsEnum
	}]

}, {
	timestamps: true
}, );

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;