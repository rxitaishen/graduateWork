const mongoose = require('mongoose');

// Book Schema
const stdSchema = mongoose.Schema({
	// 真名
	"userName":{
		type: String,
	},
	"passWord":{
		type: String,	
	},
	"stdNumber":{
		type: Number,
	},
	"class":{
		type: String,
	},
	"callNumber":{
		type: Number,
	},
	// 这下面的不用放前端
	'roleInTeam':{
		type: String,
	},
	"teamId":{
		type: String,
	},
	"projectId":{
		type: String,
	},
});

const Std = module.exports = mongoose.model('students', stdSchema);