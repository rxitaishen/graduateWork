const mongoose = require('mongoose');

// Book Schema
const buyRecordsSchema = mongoose.Schema({
	"address":{
        type: String,
    },
    "proName":{
		type: String,
	},
	"userName":{
		type: String,
	},
    "buyTime":{
        type: String,
    },
    "paperState":{
        type: Number,
    },
});

const BuyRecords = module.exports = mongoose.model('buyrecords', buyRecordsSchema);