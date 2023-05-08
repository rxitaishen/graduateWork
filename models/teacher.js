const mongoose = require('mongoose');

// Book Schema
const teacherSchema = mongoose.Schema({
	"userName":{
		type: String,
	},
	"passWord":{
		type: String,	
	},
    "sex":{
		type: String,	
	},
    // 职称
    "workPosition":{
		type: String,	
	},
    // 工号
	"workId":{
		type: Number,
	},
	"callNumber":{
		type: Number,
	},
	// 这里不用放前端,不知道这个属性还要不要
	"projectToAudit":{
		type: Array,
	},
});

const Teachers = module.exports = mongoose.model('teachers', teacherSchema);