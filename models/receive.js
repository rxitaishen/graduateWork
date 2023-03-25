const mongoose = require('mongoose');

// Book Schema
const receiveSchema = mongoose.Schema({
	"user":{
		type: String,
	},
	"name":{
		type: String,
	},
	"city":{
		type: String,
	},
    "address":{
        type: String,
    },
	"code":{
        type: String,
    },
	"callNumber":{
        type: String,
    },
	"email":{
        type: String,
    },
});

const BuyRecords = module.exports = mongoose.model('receives', receiveSchema);