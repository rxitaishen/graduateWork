const mongoose = require('mongoose');

// Book Schema
const adminUserSchema = mongoose.Schema({
	"name":{
		type: String,
	},
	"pass":{
		type: String,	
	},
	"callNumber":{
		type: Number,
	},
});

const AdminUsers = module.exports = mongoose.model('adminUsers', adminUserSchema);