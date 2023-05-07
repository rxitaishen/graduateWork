const mongoose = require('mongoose');

// Book Schema
const signPageSchema = mongoose.Schema({
	"projectName":{
		type: String,
	},
	"projectOverview":{
		type: String,
	},
    "projectClass":{
        type: Number,
    },
    "projectProcess":{
        type: Number,
    },
});

const SignPages = module.exports = mongoose.model('signPages', signPageSchema);