const mongoose = require('mongoose');

// Book Schema
const teamMemberSchema = mongoose.Schema({
	// 真名
	"userName":{
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
	'roleInTeam':{
		type: String,
	},
	// 这下面的不用放前端
	"teamId":{
		type: String,
	},
	"projectId":{
		type: String,
	},
});

const TeamMembers = module.exports = mongoose.model('teamMembers', teamMemberSchema);