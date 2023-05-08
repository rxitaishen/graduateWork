const mongoose = require('mongoose');

// Book Schema
const signPageSchema = mongoose.Schema({
	"proName":{
		type: String,
	},
    "owner":{
		type: String,
	},
    "callNumber":{
		type: String,
	},
	"proOverview":{
		type: String,
	},
    "proType":{
        type: String,
    },
    "proProcess":{
        type: Number,
    },
    // 0代表还没审核, 1代表审核通过，2代表没过
    "passOrNot":{
        type: Number,
    }
});

const SignPages = module.exports = mongoose.model('signPages', signPageSchema);